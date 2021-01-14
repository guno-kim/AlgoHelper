const express=require('express')
const app=express()
const port=5000
const mongoose=require('mongoose')
const {mongoURI}=require('./config/key')
const {Problem}=require('./models/Problem')

app.use(express.json())
mongoose.connect(mongoURI,{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:false})
    // .then(()=>{
    //     Problem.findOne({id:'백준1001'})
    //         .then((problem)=>{
    //             console.log(problem)
    //         })
    // })

app.post('/',(req,res)=>{
    console.log(req.body);
    res.json({messsage:"hellow"})
})

app.use('/data',require('./routes/data'))
app.use('/problem',require('./routes/problem'))
app.listen(port,()=>{
    console.log('listening..');
})