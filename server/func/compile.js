const {spawn}=require('child_process')
const path = require('path');
const rs = require('randomstring');
const fs = require('fs-extra');

const getDocker=(testCode,tempPath,hash)=>{
    fs.mkdirSync(tempPath, {recursive: true});

    const testFilePath = path.resolve(tempPath, 'testCode.py');
    fs.createFileSync(testFilePath);
    fs.writeFileSync(testFilePath, Buffer.from(testCode));

    let docker=spawn('docker',['run','-i','--rm',"-v", `${tempPath}:/src`,'-m','512m','--cpus','0.1','--name',hash, 'python-compiler-test:1.0']);
    //,'--rm'  옵션 없을시 추가필요 ,'-m','2G'
    return docker
}

module.exports={getDocker}