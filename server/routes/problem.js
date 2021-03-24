const express=require('express')
const router=express.Router();
const fs = require('fs-extra');
const rs = require('randomstring');
const path = require('path');
const {exec, spawn}=require('child_process')

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

    const problemList=await Problem.find({id:{$regex:req.query.search,$options:'i'}},{'id':1,'title':1,'date':1,'like':1,'dislike':1})
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
    let outputs=[],output={}
    let cnt=0,phase=0,problemNum=10;
    const hash = rs.generate(10);
    const tempPath = path.resolve("DEBUG_TEMP_PATH", hash);
    try {
        await new Promise(async (resolve)=>{
                const docker=getDocker(problem.testCodes.code,problem.myCode.code,tempPath,hash)
                const inputs=await getInputs(problem,problemNum)
                console.log(inputs)
                function killDocker(){
                    spawn('docker',['kill',hash])//리눅스에서 자식 프로세스는 따로 종료해야한다.
                    docker.kill('SIGINT')
                }

                setTimeout(() => {
                    console.log('Timeout')
                    output.result='런타임오류'
                    output.error='런타임오류'
                    outputs.push(output)
                    killDocker()
                    resolve()
                }, 10*1000);
                docker.stderr.on("data", (data) => {
                    console.log('error!!! :',data.toString('utf-8'));
                    err=data.toString('utf-8')
                    output={
                        myTime:0,
                        testTime:0,
                        result:'런타임 오류',
                        error:err
                    }
                    outputs.push(output)
                    killDocker()
                    outputs.shift()
                    resolve()

                })

                docker.stdout.on('data', (data)=>{
                    let line = data.toString('utf-8').trim();
                    
                    console.log('===============',phase)
                    console.log('out  : ',line)
                    console.log('===============')
                    if (line.includes("-----end-----")){
                        console.log('ended')
                        line=line.replace("-----end-----\n","")
                        outputs.shift()
                        resolve()
                        return
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
                            if(!line.includes('-----testTime-----')){
                                output.error="정답 코드 출력초과"
                                line='error'
                                killDocker()
                                resolve()
                                return
                            }
                            line=line.replace('-----testTime-----','')

                            output.testTime=line;
                            docker.stdin.write(Buffer.from(inputs[cnt]));

                            phase++;
                            break;
                        case 3:
                            output.myOutput=line;
                            phase++;
                            break;
                        case 4:
                            if(!line.includes('-----myTime-----')){
                                output.error="내 코드 출력초과"
                                line='error'

                                killDocker()
                                resolve()
                                return

                            }
                            line=line.replace('-----myTime-----','')

                            output.myTime=line
                            output.input=inputs[cnt]
                            if(output.myOutput==output.testOutput){//정답인지 체크
                                output.result='correct'
                            }else{
                                output.result='wrong'
                            }
                            
                            outputs.push(output)
                            output={}
                            cnt++;
                            if (cnt==problemNum || !inputs[cnt])
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
                    resolve()
                })
        })
        if (outputs[outputs.length-1]&&outputs[outputs.length-1].myTime)
            outputs[outputs.length-1].myTime=outputs[outputs.length-1].myTime.replace("\n-----end-----","")
        res.status(200).send({
            success:true,
            outputs
        })
        
    } catch (error) {
        console.log('---- error whlie test----\n',error)

        res.status(200).send({
            outputs,
            success:false,
            err:error
        })
    }
    finally{
        fs.rmdirSync(tempPath,{recursive: true})
        console.log('final')
        
    }
})

router.post('/:problemId/like',auth,async(req,res)=>{
    const problemId=req.params.problemId
    const userId=req.user._id
    const problem=await Problem.findOne({_id:problemId})

    if(problem.like.includes(userId)){
        Problem.findOneAndUpdate({_id:problemId},
                {
                    $pull:{"dislike":userId,"like":userId}
                },
                {new:true}
            ).then(()=>{ res.send(200)})
            .catch(()=>{res.send(400)})

    }else{
        Problem.findOneAndUpdate({_id:problemId},
            {
                $addToSet:{"like":[userId]},
                $pull:{'dislike':userId}
            },
            {new:true}
        ).then(()=>{ res.send(200) })
        .catch(()=>{res.send(400)})
    }
})

router.post('/:problemId/dislike',auth,async (req,res)=>{
    const problemId=req.params.problemId
    const userId=req.user._id
    const problem=await Problem.findOne({_id:problemId})
    
    if(problem.dislike.includes(userId)){
        Problem.findOneAndUpdate({_id:problemId},
                {
                    $pull:{"dislike":userId,"like":userId}
                },
                {new:true}
            ).then(()=>{ res.send(200)})
            .catch(()=>{res.send(400)})

    }else{
        Problem.findOneAndUpdate({_id:problemId},
            {
                $addToSet:{"dislike":[userId]},
                $pull:{'like':userId}
            },
            {new:true}
        ).then(()=>{ res.send(200) })
        .catch(()=>{res.send(400)})
    }

})

module.exports=router
