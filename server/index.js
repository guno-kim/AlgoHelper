const express=require('express')
const app=express()
const port=5000

app.use(express.json())

app.post('/',(req,res)=>{
    console.log(req.body);
    res.json({messsage:"hellow"})
})

app.use('/data',require('./routes/data'))

app.listen(port,()=>{
    console.log('listening..');
})