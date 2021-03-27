const path = require('path');
const {getDocker}= require('./compile')
const {spawn}=require('child_process')

function test(code,hash,inputs,problemNum){ // 채점 함수
    let outputs=[],output={},cnt=0,phase=0
    const tempPath = path.resolve("DEBUG_TEMP_PATH", hash);

    return new Promise(async (resolve)=>{
        const docker=getDocker(code,tempPath,hash)
        function killDocker(){
            spawn('docker',['kill',hash])//리눅스에서 자식 프로세스는 따로 종료해야한다.
            docker.kill('SIGINT')
        }
        setTimeout(() => {
            console.log('Timeout')
            output.result=''
            output.error='시간초과'
            outputs.push(output)
            killDocker()
            resolve(outputs)
        }, 15*1000);
        docker.stderr.on("data", (data) => {
            console.log('error!!! :',data.toString('utf-8'));
            err=data.toString('utf-8')
            output={
                myTime:0,
                testTime:0,
                result:'런타임 오류',
                error:err
            }
            outputs.push(output)
            killDocker()
            resolve(outputs)
        })


        docker.stdout.on('data', (data)=>{
            let line = data.toString('utf-8').trim();
            
            console.log('===============',phase)
            console.log('out  : ',line)
            console.log('===============')
            if (line.includes("-----end-----")){
                console.log('ended')
                line=line.replace("-----end-----\n","")
                resolve(outputs)
                return
            }
            switch (phase) {
                case 0:
                    docker.stdin.write(Buffer.from(inputs[0]));
                    phase++;
                    break;
                case 1:
                    output.data=line;
                    phase++;
                    break;
                case 2:
                    if(!line.includes('-----time-----')){ //출력이 버퍼에 넘칠때
                        output.error="출력 오류"
                        outputs.push(output)
                        killDocker()
                        resolve(outputs)
                        return
                    }
                    let token=line.split('-----time-----')
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
            }
        })

        docker.on('close',()=>{
            console.log('closed!!!')
            resolve(outputs)
        })
    })
}
module.exports={test}
