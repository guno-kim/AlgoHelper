import React,{useState,useEffect} from 'react'
import _Int from './_Int'
import _Float from './_Float'
import _String from './_String'
import {Button} from 'antd'

function VariableContainer(props) {
    const [VariableIndex, setVariableIndex] = useState(1)
    const [Variables, setVariables] = useState([{index:0, type:'int',name:'a',min:0,max:5,fix:true}])
    const [ReRender, setReRender] = useState(0)
    const reRender=()=>{
        setReRender(ReRender+1)
    }
    useEffect(() => {
        props.sendState(Variables)
    }, [])
    const addInt=()=>{
        let temp=[...Variables,{index:VariableIndex, type:'int',name:String.fromCharCode(97+VariableIndex),min:0,max:5,fix:true}]
        setVariables(temp)
        props.sendState(temp)
        setVariableIndex(VariableIndex+1)
    }
    const addFloat=()=>{
        let temp=[...Variables,{index:VariableIndex, type:'float', name:String.fromCharCode(97+VariableIndex),min:0,max:5,fix:true}]
        setVariables(temp)
        props.sendState(temp)
        setVariableIndex(VariableIndex+1)
    }
    const addString=()=>{
        let temp=[...Variables,{index:VariableIndex, type:'string',name:String.fromCharCode(97+VariableIndex),min:1,max:5,fix:true}]
        setVariables(temp)
        props.sendState(temp)
        setVariableIndex(VariableIndex+1)
    }

    const changeVariable=(changedState)=>{
        let temp=Variables
        temp[changedState.index]=changedState
        setVariables(temp)
        props.sendState(temp)
    }
    const deleteVariable=(index)=>{
        let temp=Variables
        temp[index]={}
        setVariables(temp)
        props.sendState(temp)
        reRender()
    }
    const printVariables=()=>{
        console.log(Variables);
    }

    const renderVariables=Variables.map((variable)=>{
        switch (variable.type) {
            case 'int':
                return(
                    <div key={variable.index} style={{display:'flex',alignItems:'center',marginTop:'10px'}}>
                        <_Int data={variable} changeVariable={changeVariable}/>
                        <Button onClick={()=>deleteVariable(variable.index)} style={{marginLeft:'20px'}} type="primary" danger>삭제</Button>
                    </div>
                )
            case 'float':
                return(
                    <div key={variable.index} style={{display:'flex',alignItems:'center',marginTop:'10px'}}>
                        <_Float data={variable} changeVariable={changeVariable}/>
                        <Button onClick={()=>deleteVariable(variable.index)} style={{marginLeft:'20px'}} type="primary" danger>삭제</Button>
                    </div>
                )   
            case 'string':
                return(
                    <div key={variable.index} style={{display:'flex',alignItems:'center'}}>
                        <_String data={variable} changeVariable={changeVariable}/>
                        <Button onClick={()=>deleteVariable(variable.index)} style={{marginLeft:'20px'}} type="primary" danger>삭제</Button>
                    </div>
                ) 
            default:
                return;
        }
    })
    return (
        <div style={{width:'50%'}}>
                    <div style={{ marginBottom: 16 }}>
                        {renderVariables}
                    </div>
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <h3>변수 추가</h3>
                        <Button style={{margin:'20px'}} type="primary" onClick={addInt}>Int</Button>
                        <Button style={{margin:'20px'}} type="primary" onClick={addFloat}>Float</Button>
                        <Button style={{margin:'20px'}} type="primary" onClick={addString}>String</Button>
                        <Button style={{margin:'20px'}} type="primary" onClick={printVariables}>Print</Button>
                    </div>
                </div>
    )
}

export default VariableContainer
