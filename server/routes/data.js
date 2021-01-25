const express=require('express')
const router=express.Router();

const {generateData}=require('../func/dataGenerate')

router.post('/generate',(req,res)=>{
    console.log('request',req.body);
    generateData(req.body)
        .then((result)=>{res.status(200).send(result);console.log(result)})
        .catch((err)=>{
            console.log(err)
            res.status(201).send(err)
        })
}
)


module.exports=router