const express=require('express')
const router=express.Router();
const {Problem}=require('../models/Problem')

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


module.exports=router
