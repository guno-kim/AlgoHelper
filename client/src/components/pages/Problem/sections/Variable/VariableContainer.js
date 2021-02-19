import React,{useState,useEffect} from 'react'
import _Int from './_Int'
import _Float from './_Float'
import _String from './_String'
import {Button} from 'antd'

function VariableContainer(props) {
    const [Variables, setVariables] = useState([])
    useEffect(() => {
        setVariables(props.variables)
    }, [props.variables])
    const renderVariables=Variables&&Variables.map((variable,index)=>{
        switch (variable.type) {
            case 'int':
                return(
                    <div key={index} style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'10px',width:'1000px'}}>
                        <_Int data={variable} style={{width:'1200px'}} />
                    </div>
                )
            case 'float':
                return(
                    <div key={index} style={{display:'flex',alignItems:'center',marginTop:'10px'}}>
                        <_Float data={variable} />
                    </div>
                )   
            case 'string':
                return(
                    <div key={index} style={{display:'flex',alignItems:'center'}}>
                        <_String data={variable} />
                    </div>
                ) 
            default:
                return;
        }
    })
    return (
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>
            <div style={{ marginBottom: 16,display:'flex',flexDirection:'column',alignItems:'center'}}>
                {renderVariables}
            </div>
        </div>
    )
}

export default VariableContainer
