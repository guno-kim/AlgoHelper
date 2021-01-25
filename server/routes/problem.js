const express=require('express')
const router=express.Router();
const {Problem}=require('../models/Problem')
const compiler=require('../func/compile')
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

router.get('/test',(req,res)=>{
    const params=new URLSearchParams(req.query)
    const problem=JSON.parse(params.get('problem'))
    const docker=compiler.getDocker(problem.testCodes.code)

    startDelem=".............START_OF_PROBLEM............."
    endDelem=".............END_OF_PROBLEM............."
    isStarted=false
    docker.stderr.on("data", (data) => {
        console.log('error!!! :',data.toString('utf-8'));
    })
    docker.stdout.on('data',(data)=>{
        const line=data.toString('utf-8');
        if (line.includes(startDelem)) {
            console.log('started!!')
            isStarted = true;
            docker.stdin.write(Buffer.from("hello" + "\n"));
        } else if (line.includes(endDelem)) {
            isStarted = false;
        }
    })

    docker.stdout.on("data", (data) => {
        if (!isStarted) return;
        const line = data.toString('utf-8');
        console.log(line)
    })
})

module.exports=router
