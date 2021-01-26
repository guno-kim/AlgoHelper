const {spawn}=require('child_process')
const path = require('path');
const rs = require('randomstring');
const fs = require('fs-extra');

const getDocker=(testCode,myCode)=>{
    const hash = rs.generate(10);
    const tempPath = path.resolve("DEBUG_TEMP_PATH", hash);
    fs.mkdirSync(tempPath, {recursive: true});

    const testFilePath = path.resolve(tempPath, 'testCode.py');
    fs.createFileSync(testFilePath);
    fs.writeFileSync(testFilePath, Buffer.from(testCode));

    const myFilePath = path.resolve(tempPath, 'myCode.py');
    fs.createFileSync(myFilePath);
    fs.writeFileSync(myFilePath, Buffer.from(testCode));

    let docker=spawn('docker',['run','--rm','-i',"-v", `${tempPath}:/src`,'python-compiler-test:1.0']);
    return docker
}

module.exports={getDocker}