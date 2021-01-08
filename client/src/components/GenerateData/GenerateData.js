import React,{useState,useEffect,useRef} from 'react'
import {Button} from 'antd'
import axios from 'axios'

import  './GenerateData.css'

import _Int from './sections/Variable/_Int'
import _Float from './sections/Variable/_Float'
import _String  from './sections/Variable/_String'
import VariableContainer from './sections/Variable/VariableContainer';
import InputContainer from './sections/Input/InputContainer'

function GenerateData() {
    const [Variables, setVariables] = useState([])
    const [Inputs, setInputs] = useState([])
    const [OutVariable, setOutVariable] = useState([])
    const [Format, setFormat] = useState([])
    const [Output, setOutput] = useState([])
    const textAreaRef = useRef(null);

    const changeVariables=(variables)=>{
        setVariables(variables)
    }
    const changeInput=(inputs)=>{   
        setInputs(inputs)
    }
    const updateOutput=(response)=>{    
        setOutVariable(response.variables)
        setFormat(response.format)
        setOutput(response.output)
    }
    const sendInputs=()=>{
        let body={
            variables:Variables,
            inputs:Inputs
        }
        axios.post('/data/generate',body)
            .then((res)=>{
                if(res.status==201){
                    alert(res.data.error)
                }else if(res.status==200){
                    updateOutput(res.data)
                }
            })
    }
    const makeFormatBox=(format)=>{
        console.log(format)
        let box=[]
        format.forEach((row)=>{
            let boxRow=""
            row.forEach((ele)=>{    
                boxRow+=ele+" "
            })
            boxRow+='\n'
            box.push(boxRow)
        })
        console.log('box',box)
        return box
    }
    const makeOutputBox=(output)=>{
        let boxRow=""
        output.forEach((row)=>{
            row.forEach((ele)=>{    
                boxRow+=ele+" "
            })
            boxRow+='\n'
        })
        return boxRow
    }
    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
      };
    return (
        <div id='main-container'>
            <div  id='left-container'>

                <div id='variable-container'>
                    <div className='header'>
                        <h1 style={{fontSize:'2rem'}}>변수 선언</h1>
                        <h3>사용할 변수를 선언하세요</h3>
                    </div>
                    <VariableContainer sendState={changeVariables}/>
                </div>
                
                <div id='inputbox-container'>
                    <div className='header'>
                        <h1 style={{fontSize:'2rem'}}>데이터 만들기</h1>
                        <h3>변수와 숫자를 이용해 데이터를 만드세요</h3>
                    </div>
                    <InputContainer sendState={changeInput}/>
                </div>
                <Button onClick={sendInputs} type="primary" >생성</Button>
            </div>
            <div id='right-container'>
                <pre>
                    {makeFormatBox(Format)}
                </pre>
                <Button onClick={()=>{console.log(Format)}}>Format</Button>
                <pre>
                    {makeOutputBox(Output)}
                </pre>
                <button onClick={copyToClipboard}>Copy</button> 
                <form>
                    <textarea
                    ref={textAreaRef}
                    value={makeOutputBox(Output)}
                    />
                </form>
            </div>
        </div>
    )
}

export default GenerateData
