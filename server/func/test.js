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



            /*
            if (data.includes("-----end-----")){
                console.log('ended')
                data=data.replace("-----end-----\n","")
                resolve(outputs)
                return
            }
            
            switch (phase) {
                case 0:
                    docker.stdin.write(Buffer.from(inputs[0]));
                    phase++;
                    break;
                case 1:
                    output.data=data;
                    phase++;
                    break;
                case 2:
                    if(!data.includes('-----time-----')){ //출력이 버퍼에 넘칠때
                        output.error="출력 오류"
                        outputs.push(output)
                        killDocker()
                        resolve(outputs)
                        return
                    }
                    let token=data.split('-----time-----')
                    if(token[0]!=cnt){ //입력이 더 많이 됐을때
                        output.error="입력 오류"
                        output.data=""
                        outputs.push(output)
                        killDocker()
                        resolve(outputs)
                        return
                    }
                    output.time=token[1]
                    outputs.push(output)
                    output={}
                    cnt++
                    if(cnt==problemNum){
                        killDocker()
                        resolve(outputs)
                        return
                    }
                    phase=1
                    docker.stdin.write(Buffer.from(inputs[cnt]));
                default:
                    break;
            }*/
        })

        docker.on('close',()=>{
            console.log('closed!!!')
            resolve(outputs)
        })
    })
}
module.exports={test}
