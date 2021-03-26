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
const {auth}=require('../middleware/auth');
const { anySeries } = require('async');

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
    let problemNum=11;
    const hash1 = rs.generate(10);
    const hash2 = rs.generate(10);
    try {
        const inputs=await getInputs(problem,problemNum)

        function test(code,hash){ // 채점 함수
            let outputs=[],output={},cnt=0,phase=0
            const tempPath = path.resolve("DEBUG_TEMP_PATH", hash);

            return new Promise(async (resolve)=>{
                const docker=getDocker(code,tempPath,hash)
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
                    resolve(outputs)
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
                        resolve(outputs)
                        return
                    }
                    switch (phase) {
                        case 0:
                            docker.stdin.write(Buffer.from(inputs[0]));
                            phase++;
                            break;
                        case 1:
                            output.data=line;
                            phase++;
                            break;
                        case 2:
                            if(!line.includes('-----time-----')){ //출력이 버퍼에 넘칠때
                                output.error="정답 코드 출력초과"
                                line='error'
                                killDocker()
                                resolve(outputs)
                                return
                            }
                            let token=line.split('-----time-----')
                            if(token[0]!=cnt){ //입력이 더 많이 됐을때
                                output.error="입력 초과"
                                line='error'
                                killDocker()
                                resolve(outputs)
                                return
                            }
                            output.time=token[1]
                            outputs.push(output)
                            output={}
                            cnt++
                            if(cnt==problemNum){
                                killDocker()
                                resolve(outputs)
                                return
                            }
                            phase=1
                            docker.stdin.write(Buffer.from(inputs[cnt]));
                        default:
                            break;
                    }
                })

                docker.on('close',()=>{
                    console.log('closed!!!')
                    resolve(outputs)
                })
            })
        }

        let answerResult= await test(problem.testCodes.code,hash1)
        let myResult= await test(problem.myCode.code,hash2)
        let outputs=[]
        for(let i=0;i<Math.min(answerResult.length,myResult.length);i++){
            let output={}
            output.myOutput=myResult[i].data;
            output.myTime=myResult[i].time;
            output.answerOutput=answerResult[i].data;
            output.answerTime=answerResult[i].time;
            output.correct= myResult[i].data==answerResult[i].data? 'correct':'fail'
            output.input=inputs[i]
            outputs.push(output)
        }
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
        fs.rmdirSync(path.resolve("DEBUG_TEMP_PATH", hash1),{recursive: true})
        fs.rmdirSync(path.resolve("DEBUG_TEMP_PATH", hash2),{recursive: true})
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
