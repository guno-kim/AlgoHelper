class Variable{
    constructor(type,name,min,max,fix){
        this.type=type,
        this.name=name,
        this.min=min,
        this.max=max,
        this.fix=fix
    }
}

class VariableTable{
    constructor(){
        this.table=[]
    }
    
    push(v){
        if(this.table.find(e=>e.name==v.name))
            throw new Error('변수 중복')
        this.table.push(v)
    }
    getVariable(name){
        return this.table.find((e)=>e.name==name)
    }

    compute(line){// min, max 등 값이 변수계산 문자열일때 계산
        if (!isNaN(parseInt(line)))
            return eval(line)
        console.log('line to compute',line)
        for(let v of this.table){
            let re=new RegExp(v.name,'g')
            if(!line.includes(v.name))
                continue
            if(!v.value)
                throw new Error(`변수 선언 오류`)
            line=line.replace(re,v.value)
        }
        console.log('line after compute ',line)

        try {
            return eval(line)
        } catch (error) {
            throw new Error(`변수 선언 오류`)
        }
    }
    getValue(name){
        if(!isNaN(parseFloat(name)))
            return eval(name)
        let v=this.getVariable(name)

        if(!v) throw new Error(`변수 선언 오류`)
        
        if(v.fix&&v.value!=undefined)
            return v.value
        let min=this.compute(v.min)
        let max=this.compute(v.max)
        if(isNaN(min)||isNaN(max)||min>max)
            throw new Error('최대 최소 오류')
        let value=Math.floor(Math.random() * (max - min + 1)) + min;
        v.value=value
        return value
    }

    init(){
        this.table.forEach((v)=>{
            v.value=undefined
            v.value=this.getValue(v.name)
        })
    }
}

module.exports={VariableTable,Variable}