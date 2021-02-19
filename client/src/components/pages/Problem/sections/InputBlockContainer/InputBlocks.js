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
        setInputBlocks(props.default)
    }, [props.default])

    const renderBoxs=InputBlocks&&InputBlocks.map((item,index)=>{
        if(!item.inputs){
            return
        }
        return(
            <div key={index}  style={{display:'flex',alignItems:'center',marginTop:'10px', width:'100%'}}>
                <InputBlock data={item} />
            </div>
        )
    })


    
    return (
        <div style={{textAlign:'center', width:'100%'}}>
            {renderBoxs}
        </div>
    )
}

export default InputBlockContainer
