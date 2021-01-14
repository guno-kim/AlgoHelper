const express=require('express')
const router=express.Router();
const {Problem}=require('../models/Problem')
router.get('/getList',async (req,res)=>{
    console.log(req.query.search)

    const problemList=await Problem.find({id:{$regex:req.query.search,$options:'i'}},{_id:0,'id':1,'title':1})
    //const problemList=await Problem.find({id:1234},{_id:0,'id':1,'title':1})
    console.log(problemList)
    res.send(problemList)
})

module.exports=router
