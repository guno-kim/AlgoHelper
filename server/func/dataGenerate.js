function getRandomVariable(variable){
    switch (variable.type) {
        case 'int':
            return Math.floor(Math.random() * (variable.max - variable.min + 1)) + variable.min; 
    
        default:
            break;
    }
}

function makeVariableTable(variableList){
    return new Promise((resolve,reject)=>{

        let variables={}
        for(v of variableList){

            if(variables[v.name]){
                reject({error:'duplicate variable'})
                variables={error:"중복된 변수 이름"}
                break
            }else
                variables[v.name]=v
            


            if(v.fix)
                variables[v.name].value=getRandomVariable(v)
        
        }
        resolve(variables)
    })
}
function makeFormat(inputBoxs,variableTable){
    return new Promise((resolve,reject)=>{
        let format=[]
        for(inputBox of inputBoxs){
            let input=[]
            if(!inputBox.height)
                continue
            for(let i=0;i<inputBox.height;i++){
                let temp=[]
                for(let j=0;j<inputBox.width;j++){
                    if(inputBox.inputs[i][j])
                        temp.push(inputBox.inputs[i][j])
                }
                input.push(temp)
            }
            let vRep=0,hRep=0
            if(!isNaN(parseInt(inputBox.verticalRep))){
                vRep=inputBox.verticalRep
            }else{
                v=variableTable[inputBox.verticalRep]
                if(v&&v.type=='int'&&v.fix)
                    vRep=v.value
                else
                    reject({error:'잘못된 반복 횟수입니다.'})
            }
            if(!isNaN(parseInt(inputBox.horizonRep))){
                hRep=inputBox.horizonRep
            }else{
                v=variableTable[inputBox.horizonRep]
                if(v&&v.fix)
                hRep=v.value
                else
                    reject({error:'잘못된 반복 횟수입니다.'})
            }

            for(let i=0;i<vRep;i++){
                let formatRow=[]
                for(row of input)
                    for(let j=0;j<hRep;j++)
                        for(ele of row)
                            formatRow.push(ele)
                    
                format.push(formatRow)
            }
        }
        resolve({format,variableTable})
    })
}
function makeOutput(format,variableTable){
    return new Promise((resolve,reject)=>{
        let output=[]

        format.forEach((row)=>{
            let outputRow=[]
            row.forEach((item)=>{
                if(!isNaN(parseFloat(item))){//숫자일때
                    outputRow.push(item)
                }
                else if(!variableTable[item])
                    reject({error:'선언하지 않은 변수가 있습니다.'})
                else{
                    let nowVariable=variableTable[item]
                    if(nowVariable.fix)
                        outputRow.push(nowVariable.value)
                    else
                        outputRow.push(getRandomVariable(nowVariable))
                }
            })
            output.push(outputRow)
        })
        resolve({format,variableTable,output})
    })
}
function generateData(body){
    return new Promise((resolve,reject)=>{
    makeVariableTable(body.variables)
        .then((variableTable)=>{
            return makeFormat(body.inputs,variableTable)
        })
        .then(({format,variableTable})=>{
            return makeOutput(format,variableTable)
        })
        .then((result)=>{
            resolve(result)
        })
        .catch((err)=>{
            console.log(err)
            reject(err)
        })

    })
}


module.exports={generateData}