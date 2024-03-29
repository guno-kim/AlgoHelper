const express=require('express')
const router=express.Router();
const fs = require('fs-extra');
const rs = require('randomstring');
const path = require('path');
const {test}=require('../func/test')
const {Problem}=require('../models/Problem')
const {getInputs}=require('../func/inputGenerate');
const {auth}=require('../middleware/auth');

router.get('/',async (req,res)=>{
    const problem=await Problem.findOne({_id:req.query._id})
    res.send(problem)
})

router.get('/list',async (req,res)=>{

    const problemList=await Problem.find({$or:[ {id:{$regex:req.query.search,$options:'i'}},{title:{$regex:req.query.search,$options:'i'}} ]},{'id':1,'title':1,'date':1,'like':1,'dislike':1})
    res.send(problemList)
})
router.get('/my',auth,async (req,res)=>{
    const problemList=await Problem.find({writer:req.user._id})
    res.send(problemList)
})
router.post('/delete',auth,(req,res)=>{
    Problem.findOneAndDelete({_id:req.body._id,writer:req.user._id})
        .then(()=>{res.status(200).json({success:true})})
        .catch(()=>{res.status(400).json({success:false})})
})

router.post('/create',auth,(req,res)=>{

    const problem=new Problem({...req.body,writer:req.user._id})
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
    const problemNum=11;
    let outputs=[];
    const hash1 = rs.generate(10);
    const hash2 = rs.generate(10);
    try {
        const inputs=await getInputs(problem,problemNum)
        let answerResult= await test(problem.testCode.code,problem.testCode.language,hash1,inputs,problemNum)
        let myResult= await test(problem.myCode.code,problem.myCode.language,hash2,inputs,problemNum)


        for(let i=0;i<Math.min(answerResult.length,myResult.length);i++){
            let temp={
                input:inputs[i],

                myOutput:myResult[i].data,
                myTime:myResult[i].time,
                myError:myResult[i].error||"",

                answerOutput:answerResult[i].data,
                answerTime:answerResult[i].time,
                answerError:answerResult[i].error||"",

                correct:myResult[i].data==answerResult[i].data? 'correct':'fail',
            }
            outputs.push(temp)
        }
        if(outputs.length==problemNum){ //맨 처음 데이터 제거 ( 컨테이너 생성? 떄문에 오래걸림 )
            outputs.shift()
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
