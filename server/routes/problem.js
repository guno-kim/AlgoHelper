const express=require('express')
const router=express.Router();
const {Problem}=require('../models/Problem')
const {getDocker}=require('../func/compile')
const {getExample,getInputs}=require('../func/dataGenerate');
const { resolve } = require('path');
const {auth}=require('../middleware/auth')

router.get('/',async (req,res)=>{
    const problem=await Problem.findOne({_id:req.query._id})
    res.send(problem)
})

router.get('/getList',async (req,res)=>{
    console.log(req.query.search)

    const problemList=await Problem.find({id:{$regex:req.query.search,$options:'i'}},{'id':1,'title':1})
    res.send(problemList)
})
router.get('/my',auth,async (req,res)=>{
    const problemList=await Problem.find({writer:req.user._id})
    console.log(problemList)
    res.send(problemList)
})
router.post('/delete',auth,(req,res)=>{
    Problem.findOneAndDelete({_id:req.body._id,writer:req.user._id})
        .then(()=>{res.status(200).json({success:true})})
        .catch(()=>{res.status(400).json({success:false})})
})

router.post('/create',auth,(req,res)=>{

    const problem=new Problem({...req.body,writer:req.user._id})
    console.log(problem)
    problem.save()
        .then(()=>{
            res.status(200).send({success:true})
        })
        .catch((err)=>{
            console.log(err)
            res.status(400).send({err:err})})
})

router.get('/test',async (req,res)=>{
    const params=new URLSearchParams(req.query)
    const problem=JSON.parse(params.get('problem'))
    let outputs=[]
    let output={}
    let cnt=0,phase=0;

    try {
        await new Promise(async (resolve)=>{
                const docker=getDocker(problem.testCodes.code,problem.myCode.code)
                const inputs=await getInputs(problem,3)
                docker.stderr.on("data", (data) => {
                    console.log('error!!! :',data.toString('utf-8'));
                })

                docker.stdout.on('data', (data)=>{
                    let line = data.toString('utf-8');
                    
                    console.log('===============',phase)
                    console.log('out  : ',line)
                    console.log('===============')
                    if (line.includes("-----end-----")){
                        console.log('ended')
                        line=line.replace("-----end-----\n","")
                        resolve()
                    }
                    switch (phase) {
                        case 0:
                            docker.stdin.write(Buffer.from(inputs[0]));
                            phase++;
                            break;
                        case 1:
                            output.testOutput=line;
                            phase++;
                            break;
                        case 2:
                            output.testTime=line;
                            docker.stdin.write(Buffer.from(inputs[cnt]));
                            phase++;
                            break;
                        case 3:
                            output.myOutput=line;
                            phase++;
                            break;
                        case 4:
                            output.myTime=line
                            output.input=inputs[cnt]
                            if(output.myOutput==output.testOutput){//정답인지 체크
                                output.result='correct'
                            }else{
                                output.result='wrong'
                            }
                            
                            outputs.push(output)
                            console.log(output)
                            output={}
                            cnt++;
                            if (cnt==3)
                                break;
                            docker.stdin.write(Buffer.from(inputs[cnt]));
                            phase=1;
                            break;
                        default:
                            break;
                    }
                 
                })

                docker.on('close',()=>{
                    console.log('closed!!!')
                    console.log(outputs)
                })

        })
        res.status(200).send({
            success:true,
            outputs
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            result: outputs,
            message: error
        })
    }

    
})

module.exports=router
