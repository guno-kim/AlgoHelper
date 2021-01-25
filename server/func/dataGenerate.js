function getRandomVariable(variable){
    switch (variable.type) {
        case 'int':
            return Math.floor(Math.random() * (variable.max - variable.min + 1)) + variable.min; 
    
        default:
            break;
    }
}

function getVariableTable(variableList){
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
function getFormat(inputBoxs,variableTable){
    return new Promise((resolve,reject)=>{
        let format=[]
        for(inputBox of inputBoxs){
            let segment=[]
            if(!inputBox.height)
                continue
            for(let i=0;i<inputBox.height;i++){
                let temp=[]
                for(let j=0;j<inputBox.width;j++){
                    if(inputBox.inputs[i][j])
                        temp.push(inputBox.inputs[i][j])
                }
                segment.push(temp)
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
                for(row of segment){
                    for(let j=0;j<hRep;j++){
                        for(ele of row)
                            formatRow.push(ele)
                    }
                    format.push(formatRow)
                    formatRow=[]
                }
            }
        }
        resolve({format,variableTable})
    })
}
function getInput(format,variableTable){
    return new Promise((resolve,reject)=>{
        let input=""

        format.forEach((row)=>{
            row.forEach((item)=>{
                if(!isNaN(parseFloat(item))){//숫자일때
                    input+=item+' '
                }
                else if(!variableTable[item])
                    reject({error:'선언하지 않은 변수가 있습니다.'})
                else{
                    let nowVariable=variableTable[item]
                    if(nowVariable.fix)
                        input+=nowVariable.value+' '
                    else
                        input+=getRandomVariable(nowVariable)+' '
                }
            })
            input+='\n'
        })
        resolve({format,variableTable,input})
    })
}
function generateData(body){
    return new Promise((resolve,reject)=>{
    getVariableTable(body.variables)
        .then((variableTable)=>{
            return getFormat(body.inputs,variableTable)
        })
        .then(({format,variableTable})=>{
            return getInput(format,variableTable)
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