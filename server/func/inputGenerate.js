const {Variable,VariableTable}=require('./vairables')

function getVariableTable(variableList){
    return new Promise((resolve,reject)=>{
        let table=new VariableTable()
        for(let v of variableList){
            table.push(new Variable(v.type,v.name,v.min,v.max,v.fix))
        }
        table.init()
        resolve(table)
    })
}

function getFormat(inputBlocks,variableTable){
    return new Promise((resolve,reject)=>{
        let format=[]
        for(inputBlock of inputBlocks){
            let segment=[]
            if(!inputBlock.height)
                continue
            for(let i=0;i<inputBlock.height;i++){
                let temp=[]
                for(let j=0;j<inputBlock.width;j++){
                    if(inputBlock.inputs[i][j])
                        temp.push(inputBlock.inputs[i][j])
                }
                segment.push(temp)
            }
            let vRep=0,hRep=0
            if(!isNaN(parseInt(inputBlock.verticalRep))){
                vRep=inputBlock.verticalRep
            }else{
                let v=variableTable.getVariable(inputBlock.verticalRep)
                if(v&&v.type=='int'&&v.fix&&v.value)
                    vRep=v.value
                else
                    reject({error:'잘못된 반복 횟수입니다.'})
            }
            if(!isNaN(parseInt(inputBlock.horizonRep))){
                hRep=inputBlock.horizonRep
            }else{
                let v=variableTable.getVariable(inputBlock.horizonRep)
                if(v&&v.type=='int'&&v.fix&&v.value)
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
        resolve(format)
    })
}
function getInput(format,variableTable){
    return new Promise((resolve,reject)=>{
        let input=""

        format.forEach((row)=>{
            row.forEach((name)=>{
                input+=variableTable.getValue(name)+' '
            })
            input=input.trim()
            input+='\n'
        })
        input=input.trim()
        input+='\n'

        resolve(input)
    })
}
function getExample(setting){
    return new Promise(async(resolve,reject)=>{  
        try{
            let variableTable=await getVariableTable(setting.variables)
            let format=await getFormat(setting.inputBlocks,variableTable)
            let input=await getInput(format,variableTable)
            resolve({format,input})
        }catch(error){
            console.log(error)
            reject(error)
        }
    })
}
function getInputs(setting,cnt){
    console.log(setting)

    return new Promise(async(resolve,reject)=>{  
        try{
            let inputs=[]
            let variableTable=await getVariableTable(setting.variables)

            for(let i=0;i<cnt;i++){
                variableTable.init()
                let format=await getFormat(setting.inputBlocks,variableTable)
                let input=await getInput(format,variableTable)
                inputs.push(input)
            }
            resolve(inputs)
        }catch(error){
            console.log(error)
            reject(error)
        }
    })
}

module.exports={getExample,getInputs}