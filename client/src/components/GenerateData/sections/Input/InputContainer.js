import React,{useState,useEffect} from 'react'
import InputBox from './InputBox'
import {Button} from 'antd'

function InputContainer(props) {
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

    const [InputBoxs, setInputBoxs] = useState([{inputs:makeEmptyArray(),width:2,height:1,horizonRep:1,verticalRep:1}])
    const [ReRender, setReRender] = useState(0)
    const reRender=()=>{
        setReRender(ReRender+1)
    }

    useEffect(() => {
        props.sendState(InputBoxs)
    }, [])

    useEffect(() => {
        props.sendState(InputBoxs)
    }, [InputBoxs])

    const changeInputBoxs=(index)=>{
        return(
            (box)=>{
                let temp=InputBoxs
                temp[index]=box
                setInputBoxs(temp)
            }
        )
    }
    const deleteInputBox=(index)=>{
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
            <div key={index}  style={{display:'flex',alignItems:'center',marginTop:'10px'}}>
                <InputBox data={item} sendState={changeInputBoxs(index)}/>
                <Button onClick={()=>deleteInputBox(index)} type="primary" danger>삭제</Button>
            </div>
        )
    })

    const addInputBox=()=>{
        let temp=[...InputBoxs,{inputs:makeEmptyArray(),width:2,height:1,horizonRep:1,verticalRep:1}]
        setInputBoxs(temp)
    }

    
    return (
        <div>
            {renderBoxs}
            <Button onClick={addInputBox}>추가</Button>
        </div>
    )
}

export default InputContainer
