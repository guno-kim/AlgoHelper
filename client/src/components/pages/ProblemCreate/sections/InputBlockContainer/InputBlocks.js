import React,{useState,useEffect} from 'react'
import InputBlock from './InputBlock'
import {Button} from 'antd'

function InputBlockContainer(props) {
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

    const [InputBlocks, setInputBlocks] = useState(props.default)

    useEffect(() => {
        props.sendState(InputBlocks)
    }, [])

    useEffect(() => {
        props.sendState(InputBlocks)
    }, [InputBlocks])

    const changeInputBoxs=(index)=>{
        return(
            (box)=>{
                let temp=InputBlocks
                temp[index]=box
                setInputBlocks(temp)
            }
        )
    }
    const deleteInputBox=(index)=>{
        let temp=[...InputBlocks]
        temp.splice(index,1)
        setInputBlocks(temp)
    }


    const renderBoxs=InputBlocks.map((item,index)=>{
        if(!item.inputs){
            return
        }
        return(
            <div key={index}  style={{display:'flex',alignItems:'center',marginTop:'10px'}}>
                <InputBlock data={item} sendState={changeInputBoxs(index)}/>
                <Button onClick={()=>deleteInputBox(index)} type="primary" style={{marginLeft:'20px'}} danger>삭제</Button>
            </div>
        )
    })

    const addInputBlocks=()=>{
        let temp=[...InputBlocks,{inputs:makeEmptyArray(),width:1,height:1,horizonRep:1,verticalRep:1}]
        setInputBlocks(temp)
    }

    
    return (
        <div style={{textAlign:'center'}}>
            {renderBoxs}
            <Button onClick={addInputBlocks} style={{margin:'5px'}}>추가</Button>
        </div>
    )
}

export default InputBlockContainer
