const express=require('express')
const router=express.Router();

const {getExample}=require('../func/inputGenerate')
router.get('/',(req,res)=>{
    const params=new URLSearchParams(req.query)
    const setting=JSON.parse(params.get('setting'))
    getExample(setting)
        .then((result)=>{
            res.status(200).send(result);console.log(result)
        })
        .catch((err)=>{
            console.log(err)
            res.status(201).send({error:err.message})
        })
}
)


module.exports=router