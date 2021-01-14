import React,{useState,useEffect,useRef} from 'react'
import {Button} from 'antd'
import axios from 'axios'
import styled from 'styled-components'


import _Int from '../../commons/Variable/_Int'
import _Float from '../../commons/Variable/_Float'
import _String  from '../../commons/Variable/_String'
import VariableContainer from '../../commons/Variable/VariableContainer';
import InputContainer from '../../commons/InputContainer/InputContainer'

import FormatBox from '../../commons/FormatBox/FormatBox'

function GenerateData() {
    const [Variables, setVariables] = useState([{type:'int',name:'a',min:0,max:5,fix:true}])
    const [Inputs, setInputs] = useState([{inputs:new Array(10).fill("").map(()=>new Array(10).fill("")),width:2,height:1,horizonRep:1,verticalRep:1}])
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
        <Wrapper>
            <div  id='left-container'>

                <div id='variable-container'>
                    <div className='header'>
                        <h1 style={{fontSize:'2rem'}}>변수 선언</h1>
                        <h3>사용할 변수를 선언하세요</h3>
                    </div>
                    <VariableContainer sendState={changeVariables} default={Variables}/>
                </div>
                
                <div id='inputbox-container'>
                    <div className='header'>
                        <h1 style={{fontSize:'2rem'}}>데이터 만들기</h1>
                        <h3>변수와 숫자를 이용해 데이터를 만드세요</h3>
                    </div>
                    <InputContainer sendState={changeInput} default={Inputs}/>
                </div>
                <Button onClick={sendInputs} type="primary" size='large' >생성</Button>
            </div>
            <div id='right-container'>
                <div>
                    <div style={{fontSize:'2rem', textAlign:'center'}}>데이터 형식</div>
                    <FormatBox format={Format}/>
                </div>

                <div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <div style={{fontSize:'2rem'}}>데이터 결과</div>
                        <button onClick={copyToClipboard} style={{marginRight:0}}>Copy</button> 
                    </div>
                    <form>
                        <textarea 
                        ref={textAreaRef}
                        value={makeOutputBox(Output)}
                        id='output'
                        />
                    </form>
                </div>

            </div>
        </Wrapper>
    )
}

const Wrapper=styled.div`
    display:flex ;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;

    #left-container{
        display:flex ;
        flex-direction: column;
        align-items: center;
        width: 60%;
        height: 100vh;
        background-color: RGB(250, 250, 250);
        
        #variable-container{
            display:flex ;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 90%;
            border-radius: 10px;
            background-color: white;
            border: 1px solid lightgray;
            margin: 50px;
        }

        #inputbox-container{
            display:flex ;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 90%;
            border-radius: 10px;
            background-color: white;
            border: 1px solid lightgray;
            margin: 50px;
        }
        .header{
            width: 100%;
            display:flex ;
            flex-direction: column;
            align-items: center;
            border-radius: 10px;
        }
    }
    #right-container{
        display:flex ;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 30%;
        height: 100vh;
    }
    #output{
        border: 1px solid black;
        width: 400px;
        height: 400px;
        font-size: 20px;
        overflow-y: scroll auto;
        overflow-x: scroll auto;
        border-radius: 10px;
    }
`



export default GenerateData
