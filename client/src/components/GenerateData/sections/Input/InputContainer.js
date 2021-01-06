import React,{useState} from 'react'
import InputBox from './InputBox'
import {Button} from 'antd'

function InputContainer() {
    const makeEmptyArray=()=>{
        let result=[]
        for(let j=0;j<10;j++){
            let temp=[]
            for(let i=0;i<10;i++){
                temp.push("")
            }   
            result.push(temp)
        }
        return result
    }

    const [InputBoxs, setInputBoxs] = useState([{index:0,inputs:makeEmptyArray(),width:2,height:1,rowRep:1,colRep:1}])
    const [Index, setIndex] = useState(1)
    const [ReRender, setReRender] = useState(0)
    const reRender=()=>{
        setReRender(ReRender+1)
    }

    const changeInputBoxs=(box)=>{
        let temp=InputBoxs
        temp[box.index]=box
        setInputBoxs(temp)
    }
    const deleteInputBox=(index)=>{
        console.log("delete",index);
        let temp=InputBoxs
        temp[index]={}
        setInputBoxs(temp)
        reRender()
    }
    const renderBoxs=InputBoxs.map((item,index)=>{
        if(!item.inputs){
            return
        }
        return(
            <div style={{display:'flex',alignItems:'center',marginTop:'10px'}}>
                <InputBox data={item} key={index} sendState={changeInputBoxs}/>
                <Button onClick={()=>deleteInputBox(index)}>삭제</Button>
            </div>
        )
    })

    const addInputBox=()=>{
        let temp=[...InputBoxs,{index:Index,inputs:makeEmptyArray(),width:2,height:1,rowRep:1,colRep:1}]
        setInputBoxs(temp)
        setIndex(Index+1)
    }

    const printInput=()=>{
        console.log(InputBoxs);
    }
    return (
        <div>
            {renderBoxs}
            <Button onClick={addInputBox}>추가</Button>
            <button onClick={printInput}>Print inputs</button>
        </div>
    )
}

export default InputContainer
