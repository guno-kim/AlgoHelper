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

    const docker=getDocker(problem.testCodes.code,problem.myCode.code)
    const result=await getExample(problem)


    let testInputDelem="testCode:input",testEndDelem="testCode:end"
    let myInputDelem="myCode:input", myEndDelem="myCode:end"

    let isStarted1=false,isStarted2=false
    docker.stderr.on("data", (data) => {
        console.log('error!!! :',data.toString('utf-8'));
    })

    let tempInput=["asda\n",'sdf\n','23wdsa\n']
    let i=0;

    docker.stdout.on('data',(data)=>{
        const line=data.toString('utf-8');
        if (line.includes(testInputDelem)) {
            isStarted1 = true;
            docker.stdin.write(Buffer.from(tempInput[i]));
        } else if (line.includes(testEndDelem)) {
            isStarted1 = false;
        }

        if (line.includes(myInputDelem)) {
            isStarted2 = true;
            docker.stdin.write(Buffer.from(tempInput[i]));
        } else if (line.includes(myEndDelem)) {
            isStarted2 = false;
        }

    })


    const testOuput=[]
    const myOutput=[]

    docker.stdout.on("data", (data) => {
        const line = data.toString('utf-8');
        console.log('out  : <<',line,'   ',isStarted1,isStarted2,' >>')
        if (!isStarted1 && !isStarted2){
            return
        } 
        if(isStarted1&&!line.includes(testInputDelem)){
            testOuput.push(line)
        }
        else if(isStarted2&&!line.includes(myInputDelem)){
            myOutput.push(line)
            i+=1
        }
    })

    docker.on('close',()=>{
        console.log('closed!!!')
        console.log(testOuput)
        console.log(myOutput)
    })
})

module.exports=router
