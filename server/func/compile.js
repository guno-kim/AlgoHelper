const {spawn}=require('child_process')
const path = require('path');
const rs = require('randomstring');
const fs = require('fs-extra');

const getDocker=(source)=>{
    const hash = rs.generate(10);
    const tempPath = path.resolve("DEBUG_TEMP_PATH", hash);
    fs.mkdirSync(tempPath, {recursive: true});
    filename='main.py'
    const mainFilePath = path.resolve(tempPath, filename);
    fs.createFileSync(mainFilePath);
    fs.writeFileSync(mainFilePath, Buffer.from(source));

    let docker=spawn('docker',['run','--rm','-i',"-v", `${tempPath}:/src`,'python-compiler-test:1.0']);
    return docker
}

module.exports={getDocker}