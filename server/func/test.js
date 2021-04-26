const path = require('path');
const {getDocker}= require('./getDocker')
const {spawn}=require('child_process')

function test(code,language,hash,inputs,problemNum){ // 채점 함수
    let outputs=[],cnt=0,phase=0

    return new Promise(async (resolve)=>{
        const docker=getDocker(code,language,hash)
        const timeDele='-----time-----'
        const endDele='-----end-----'
        function killDocker(){
            spawn('docker',['kill',hash])//리눅스에서 자식 프로세스는 따로 종료해야한다.
            docker.kill('SIGINT')
        }
        docker.stdout.setEncoding('utf8')
        docker.stderr.setEncoding('utf8')
        setTimeout(() => {
            console.log('Timeout')
            let output={
                error:'시간초과',
                data:'',
                time:'error'
            }
            outputs.push(output)
            killDocker()
            resolve(outputs)
        }, 15*1000);
        docker.stderr.on("data", (data) => {
            console.log(data)
            let output={
                myTime:0,
                testTime:0,
                result:'런타임 오류',
                error:data
            }
            outputs.push(output)
            killDocker()
            resolve(outputs)
        })

        let startflag=true
        let tempData=""
        docker.stdout.on('data', (data)=>{
            data=data.trim();
            console.log('\n===============phase:',phase)
            console.log('out  : ',data)
            console.log('===============\n')
            if(startflag){
                docker.stdin.write(Buffer.from(inputs[0]));
                startflag=false
            }
            else if(data.includes(endDele)){
                let token1=data.split(endDele)
                let token2=token1[0].split(timeDele)
                output={
                    data:tempData+token2[0],
                    time:token2[1]
                }
                outputs.push(output)
                cnt+=1
                tempData=token1[1]

                if(cnt==problemNum){
                    console.log('all solved!!')
                    killDocker()
                    resolve(outputs)
                    return
                }
                docker.stdin.write(Buffer.from(inputs[cnt]));
            }
            else{
                tempData+=data
            }
        })

        docker.on('close',()=>{
            console.log('closed!!!')
            resolve(outputs)
        })
    })
}
module.exports={test}
