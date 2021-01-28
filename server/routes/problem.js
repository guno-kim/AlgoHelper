const express=require('express')
const router=express.Router();
const {Problem}=require('../models/Problem')
const {getDocker}=require('../func/compile')
const {getExample,getInputs}=require('../func/dataGenerate');
const { resolve } = require('path');

router.get('/',async (req,res)=>{
    const problem=await Problem.findOne({_id:req.query._id})
    res.send(problem)
})

router.get('/getList',async (req,res)=>{
    console.log(req.query.search)

    const problemList=await Problem.find({id:{$regex:req.query.search,$options:'i'}},{'id':1,'title':1})
    res.send(problemList)
})

router.post('/create',(req,res)=>{
    const problem=new Problem(req.body)
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
        const promise= await new Promise(async (resolve)=>{
                const docker=getDocker(problem.testCodes.code,problem.myCode.code)
                const inputs=await getInputs(problem,3)
                docker.stderr.on("data", (data) => {
                    console.log('error!!! :',data.toString('utf-8'));
                })

                docker.stdout.on('data',(data)=>{
                    const line = data.toString('utf-8');
                    if (line.includes("-----end-----")){
                        console.log('ended')
                        resolve()
                    }
                    console.log('===============',phase)
                    console.log('out  : ',line)
                    console.log('===============')
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
                            output.myTime=line;
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
        
        //await Promise(promise)
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
