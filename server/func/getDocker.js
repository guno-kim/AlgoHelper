const {spawn}=require('child_process')
const path = require('path');
const rs = require('randomstring');
const fs = require('fs-extra');

const getDocker=(testCode,language,hash)=>{
    const tempPath = path.resolve("DEBUG_TEMP_PATH", hash);
    fs.mkdirSync(tempPath, {recursive: true});
    let fileName,imageName;
    switch (language) {
        case "python":
            fileName='testCode.py';imageName='python-compiler-test:1.0';
            break;
        case "cpp":
            fileName='testCode.cpp';imageName='cpp-compiler-test:1.0';
            break;
        case "java":
            fileName='Main.java';imageName='java-compiler-test:1.0';
            break;
        default:
            break;
    }
    const testFilePath = path.resolve(tempPath, fileName);
    fs.createFileSync(testFilePath);
    fs.writeFileSync(testFilePath, Buffer.from(testCode));

    let docker=spawn('docker',['run','-i','--rm',"-v", `${tempPath}:/src`,'-m','512m','--cpus','0.5','--name',hash, imageName]);
    //,'--rm'  옵션 없을시 추가필요 ,'-m','2G'
    return docker
}

module.exports={getDocker}