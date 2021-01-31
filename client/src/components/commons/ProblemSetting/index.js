import React,{useState,useEffect,useRef} from 'react'
import {Button} from 'antd'
import axios from 'axios'
import styled from 'styled-components'


import _Int from './sections/Variable/_Int'
import _Float from './sections/Variable/_Float'
import _String  from './sections/Variable/_String'
import VariableContainer from './sections/Variable/VariableContainer';
import InputContainer from './sections/InputBlockContainer/InputBlocks'
import InputFormat from './sections/InputFormat/InputFormat'
import CodeBox from '../CodeBox/CodeBox'

function GenerateData(props) {
    const [Format, setFormat] = useState([])
    const [Input, setInput] = useState([])
    
    const [Setting, setSetting] = useState(props.setting)
    
    useEffect(() => {
        props.sendState(Setting)
    }, [Setting])

    const textAreaRef = useRef(null);
    

    //State Handle Function
    const handleVariables=(variables)=>{setSetting({...Setting,variables:variables})}
    const handleInput=(inputBlocks)=>{ setSetting({...Setting,inputBlocks:inputBlocks})}
    const handleTestCodes=(code)=>{setSetting({...Setting,testCodes:code})}

    const getExample=()=>{
        let body={
            variables:Setting.variables,
            inputBlocks:Setting.inputBlocks
        }
        axios.post('/data/generate',body)
            .then((res)=>{
                if(res.status==201){
                    alert(res.data.error)
                }else if(res.status==200){
                    setFormat(res.data.format)
                    setInput(res.data.input)
                }
            })
    }
    function copyToClipboard(e) {
        textAreaRef.current.select();//텍스트 선택
        document.execCommand('copy');//복사
        e.target.focus();//선택 해제
    };
  
   
    return (
        <Wrapper>
            <div  id='main-container'>

                <div className='content-container'>
                    <div className='header'>
                        <h1 className='title'>변수 선언</h1>
                        <h3 className='description'>사용할 변수를 선언하세요</h3>
                    </div>
                    <VariableContainer sendState={handleVariables} default={Setting.variables}/>
                </div>
                
                <div className='content-container'>
                    <div className='header'>
                        <h1 className='title'>데이터 만들기</h1>
                        <h3 className='description'>변수와 숫자를 이용해 데이터를 만드세요</h3>
                    </div>
                    <InputContainer sendState={handleInput} default={Setting.inputBlocks}/>
                </div>

                <div className='content-container'>
                    <div style={{display:'flex'}}>
                        <div style={{margin:'20px'}}>
                            <div style={{fontSize:'2rem'}}>입력 형식</div>
                            <InputFormat format={Format}/>
                        </div>

                        <div style={{margin:'20px'}}>
                            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <div style={{fontSize:'2rem'}}>입력값</div>
                                <button onClick={copyToClipboard} style={{justifySelf:'right'}}>Copy</button> 
                            </div>
                            
                            <textarea 
                                ref={textAreaRef}
                                value={Input}
                                id='output'
                            />
                        </div>
                    </div>
                    <Button onClick={getExample} size='medium' >생성</Button>
                   
                </div>
                <div className="content-container">
                    <div className='header'>
                        <h1 className='title'>정답 코드 입력</h1>
                        <h3 className='description'>채점에 사용될 정답 코드를 입력하세요</h3>
                    </div>
                    <CodeBox value={Setting.testCodes} sendState={handleTestCodes} style={{height:'400px'}}/>
                </div>
            </div>

        </Wrapper>
    )
}

const Wrapper=styled.div`
    display:flex ;
    justify-content: center;
    align-items: center;
    width: 100%;

    #main-container{
        display:flex ;
        flex-direction: column;
        align-items: center;
        width: 60%;
        min-width:1000px;
        background-color: RGB(250, 250, 250);
        
        #output{
            border: 1px solid black;
            width: 400px;
            height: 400px;
            font-size: 20px;
            overflow-y: scroll auto;
            overflow-x: scroll auto;
            border-radius: 10px;
        }
        .content-container{
            display:flex ;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 90%;
            border-radius: 10px;
            background-color: white;
            border: 1px solid lightgray;
            margin: 50px;
            padding: 20px;
            .header{
                width: 100%;
                display:flex ;
                flex-direction: column;
                align-items: center;
                margin-bottom:20px;
                .title{
                    font-size:2rem;
                }
            }
        }
    }
`



export default GenerateData
