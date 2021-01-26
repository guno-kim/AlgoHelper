const express=require('express')
const router=express.Router();
const {Problem}=require('../models/Problem')
const {getDocker}=require('../func/compile')
const {getExample}=require('../func/dataGenerate')

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

router.get('/test',async (req,res)=>{
    const params=new URLSearchParams(req.query)
    const problem=JSON.parse(params.get('problem'))
    const docker=getDocker(problem.testCodes.code)
    const result=await getExample(problem)
    

    startDelem=".............START_OF_PROBLEM............."
    endDelem=".............END_OF_PROBLEM............."
    inputDelem="input"
    ee=".....end....."
    isStarted=false
    docker.stderr.on("data", (data) => {
        console.log('error!!! :',data.toString('utf-8'));
    })

    let tempInput=["asda\n",'sdf\n','23wdsa\n']
    let i=0;

    docker.stdout.on('data',(data)=>{
        const line=data.toString('utf-8');
        //console.log('stdout :  ',line)
        if (line.includes(inputDelem)) {
            console.log('input',i)
            isStarted = true;
            docker.stdin.write(Buffer.from(tempInput[i]));
            i+=1
        } else if (line.includes(ee)) {
            isStarted = false;
        }
    })





    // docker.stdout.on('data',(data)=>{
    //     const line=data.toString('utf-8');
    //     if (line.includes(startDelem)) {
    //         console.log('started!!')
    //         isStarted = true;
    //         docker.stdin.write(Buffer.from(result.input));
    //     } else if (line.includes(endDelem)) {
    //         isStarted = false;
    //     }
    // })

    docker.stdout.on("data", (data) => {
        if (!isStarted) return;
        const line = data.toString('utf-8');
        console.log('output  ',line)
    })

    docker.on('close',()=>{
        console.log('closed!!!')
    })
})

module.exports=router
