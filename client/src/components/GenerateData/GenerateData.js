import React,{useState,useEffect} from 'react'
import {Button} from 'antd'

import _Int from './sections/Variable/_Int'
import _Float from './sections/Variable/_Float'
import _String  from './sections/Variable/_String'
import VariableContainer from './sections/Variable/VariableContainer';
import InputContainer from './sections/Input/InputContainer'

function GenerateData() {
    const [Variables, setVariables] = useState([])
    const [InputBoxs, setInputBoxs] = useState([])
    const [InputIndex, setInputIndex] = useState(1)

    const changeVariables=(variables)=>{
        setVariables(variables)
    }

    const sendInputs=()=>{
        
    }
    return (
        <div style={{
            display:'flex' ,
            flexDirection:'row', 
            justifyContent:'center',
            alignItems:'center',
            width:'100%',
            height:'100vh'
            }}>
            <div style={{
                display:'flex' ,
                flexDirection:'column', 
                justifyContent:'center',
                alignItems:'center',
                width:'60%',

                height:'100vh'
                }}>
                <h2>변수 선언</h2>
                
                <VariableContainer sendState={changeVariables}/>
                <button onClick={()=>{console.log(Variables);}}>print variables</button>
                
                <InputContainer/>
                <Button onClick={sendInputs}>생성</Button>
            </div>
            <div style={{
                display:'flex' ,
                flexDirection:'column', 
                justifyContent:'center',
                alignItems:'center',
                width:'40%',

                height:'100vh'
                }}>

            </div>

        </div>
    )
}

export default GenerateData
