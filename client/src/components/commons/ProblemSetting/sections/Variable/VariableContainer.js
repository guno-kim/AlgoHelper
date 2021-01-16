import React,{useState,useEffect} from 'react'
import _Int from './_Int'
import _Float from './_Float'
import _String from './_String'
import {Button} from 'antd'

function VariableContainer(props) {
    const [Variables, setVariables] = useState(props.default)
    const [VariableIndex, setVariableIndex] = useState(1)
    const [ReRender, setReRender] = useState(0)
    const reRender=()=>{
        setReRender(ReRender+1)
    }
    useEffect(() => {
        props.sendState(Variables)
    }, [])

    useEffect(() => {
        props.sendState(Variables)
    }, [Variables])


    const addInt=()=>{
        let temp=[...Variables,{ type:'int',name:String.fromCharCode(97+VariableIndex),min:0,max:5,fix:true}]
        setVariables(temp)
        setVariables(temp)
        setVariableIndex(VariableIndex+1)
    }
    const addFloat=()=>{
        let temp=[...Variables,{ type:'float', name:String.fromCharCode(97+VariableIndex),min:0,max:5,fix:true}]
        setVariables(temp)
        setVariableIndex(VariableIndex+1)
    }
    const addString=()=>{
        let temp=[...Variables,{ type:'string',name:String.fromCharCode(97+VariableIndex),min:1,max:5,fix:true}]
        setVariables(temp)
        setVariableIndex(VariableIndex+1)
    }

    const changeVariable=(index)=>{
        return(
            (changedState)=>{
            let temp=Variables
            temp[index]=changedState
            setVariables(temp)
            }
        )
    }
    const deleteVariable=(index)=>{
        let temp=Variables
        temp[index]={}
        setVariables(temp)
        reRender()
    }

    const printVariables=()=>{
        console.log(Variables);
    }










    const renderVariables=Variables.map((variable,index)=>{
        switch (variable.type) {
            case 'int':
                return(
                    <div key={index} style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'10px',width:'1000px'}}>
                        <_Int data={variable} style={{width:'1200px'}} changeVariable={changeVariable(index)}/>
                        <Button onClick={()=>deleteVariable(index)} style={{marginLeft:'20px'}} type="primary" danger>삭제</Button>
                    </div>
                )
            case 'float':
                return(
                    <div key={index} style={{display:'flex',alignItems:'center',marginTop:'10px'}}>
                        <_Float data={variable} changeVariable={changeVariable}/>
                        <Button onClick={()=>deleteVariable(index)} style={{marginLeft:'20px'}} type="primary" danger>삭제</Button>
                    </div>
                )   
            case 'string':
                return(
                    <div key={index} style={{display:'flex',alignItems:'center'}}>
                        <_String data={variable} changeVariable={changeVariable}/>
                        <Button onClick={()=>deleteVariable(index)} style={{marginLeft:'20px'}} type="primary" danger>삭제</Button>
                    </div>
                ) 
            default:
                return;
        }
    })
    return (
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Button style={{margin:'20px'}}  onClick={addInt}>Int</Button>
                <Button style={{margin:'20px'}} disabled={true} onClick={addFloat}>Float</Button>
                <Button style={{margin:'20px'}} disabled={true} onClick={addString}>String</Button>
            </div>
            <div style={{ marginBottom: 16,display:'flex',flexDirection:'column',alignItems:'center',width:'100%' }}>
                {renderVariables}
            </div>
        </div>
    )
}

export default VariableContainer
