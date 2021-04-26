import React,{useState,useEffect,useRef} from 'react'
import {Button,Input,Form,Modal} from 'antd'
import axios from '../../../axios'
import styled from 'styled-components'
import Layout from '../../Layout/Layout'
import { withRouter } from 'react-router-dom';


import _Int from './sections/Variable/_Int'
import _Float from './sections/Variable/_Float'
import _String  from './sections/Variable/_String'
import VariableContainer from './sections/Variable/VariableContainer';
import InputContainer from './sections/InputBlockContainer/InputBlocks'
import InputFormat from './sections/InputFormat/InputFormat'
import CodeBox from '../../commons/CodeBox/CodeBox'


function GenerateData(props) {
    const [Format, setFormat] = useState([])
    const [Data, setData] = useState([])
    const [Setting, setSetting] = useState({
        id:'',
        title:'',
        description:'',
        variables:[{type:'int',name:'a',min:0,max:5,fix:true}],
        testCode:{language:'python',code:''},
        inputBlocks:[{inputs:new Array(10).fill("").map(()=>new Array(10).fill("")),width:1,height:1,horizonRep:1,verticalRep:1}],
    })
    const [isModalVisible, setIsModalVisible] = useState(false);
    

    const textAreaRef = useRef(null);
    

    //State Handle Function
    const handleVariables=(variables)=>{setSetting({...Setting,variables:variables})}
    const handleInput=(inputBlocks)=>{ setSetting({...Setting,inputBlocks:inputBlocks})}
    const handleTestCode=(code)=>{setSetting({...Setting,testCode:code})}
    const handleId=(e)=>{setSetting({...Setting,id:e.target.value})}
    const handleTitle=(e)=>{setSetting({...Setting,title:e.target.value})}
    const handleDesc=(e)=>{setSetting({...Setting,description:e.target.value})}
    const handleSave=()=>{
        axios.post('/problem/create',Setting)
            .then((res)=>{
                    alert("저장 성공")
                    console.log(props)
                    props.history.push('/problem')
            })
            .catch((err)=>{
                console.log(err)
                alert("저장 실패")
            })
    }

    const showModal = () => {setIsModalVisible(true)};
    const handleCancel = () => {setIsModalVisible(false);};
    const getExample=()=>{
        let body={
            variables:Setting.variables,
            inputBlocks:Setting.inputBlocks
        }
        axios.post('/data/generate',body)
            .then((res)=>{
                if(res.status==201){
                    alert(res.data.error)
                    console.log(res.data)
                }else if(res.status==200){
                    setFormat(res.data.format)
                    setData(res.data.input)
                }
            })
    }
    function copyToClipboard(e) {
        textAreaRef.current.select();//텍스트 선택
        document.execCommand('copy');//복사
        e.target.focus();//선택 해제
    };
  
   
    return (
        <Layout>
        <Wrapper>
                <div className='content-container'>
                    <div className='header'>
                        <h1 className='title'>변수 선언</h1>
                        <h3 className='description'>사용할 변수를 선언하세요</h3>
                    </div>
                    <VariableContainer sendState={handleVariables} default={Setting.variables}/>
                </div>
                
                <div className='content-container'>
                    <div className='header'>
                        <h1 className='title'>입력 데이터 만들기</h1>
                        <h3 className='description'>변수와 숫자를 이용해 입력 데이터를 만드세요</h3>
                    </div>
                    <InputContainer sendState={handleInput} default={Setting.inputBlocks}/>
                </div>

                <div className='content-container'>
                    <div style={{display:'flex'}}>
                        <div style={{margin:'20px'}}>
                            <div style={{fontSize:'2rem', textAlign:'center'}}>입력 형식</div>
                            <InputFormat format={Format}/>
                        </div>

                        <div style={{margin:'20px'}}>
                            <div style={{display:'flex',alignItems:'center',justifyContent:'center', position:'relative'}}>
                                <div style={{fontSize:'2rem', margin:'0 20px'}}>입력값</div>
                                <button onClick={copyToClipboard} id='copy-button' >복사</button> 
                            </div>
                            
                            <textarea 
                                ref={textAreaRef}
                                value={Data}
                                id='example'
                            />
                        </div>
                    </div>
                    <Button onClick={getExample} size='medium' >생성</Button>
                   
                </div>
                <div className="content-container">
                    <div className='header'>
                        <h1 className='title'>정답 코드 입력</h1>
                        <h3 className='description'>비교에 사용될 정답 코드를 입력하세요</h3>
                    </div>
                    <CodeBox value={Setting.testCode} sendState={handleTestCode} style={{height:'400px'}}/>
                </div>
                
                <Button type="primary"  size='large' onClick={showModal} style={{marginBottom:'50px'}}>저장</Button>

                
                <Modal title="Basic Modal" visible={isModalVisible} 
                    onCancel={handleCancel}
                    footer={[
                      ]}
                >
                    <Form
                        labelCol={{ span: 4}}
                        wrapperCol={ {span: 12}}
                        size='middle'
                        layout="vertical"
                        onFinish={handleSave}
                    >
                        <Form.Item
                            label="문제 ID"
                            name="Id"
                            rules={[{
                                required: true,
                                message: '문제 ID를 입력해주세요'
                            }]}
                        >
                            <Input placeholder="ex) 백준 1000" onChange={handleId} value={Setting.id}/>
                        </Form.Item>

                        <Form.Item
                            label="제목"
                            name="Title"
                            rules={[{
                                required: true,
                                message: '문제 제목을 입력해주세요'
                            }]}
                        >
                            <Input onChange={handleTitle} value={Setting.title}/>
                        </Form.Item>
                        <Form.Item
                            label="설명"
                            wrapperCol={
                                {span:20}
                            }
                        >
                            <Input.TextArea onChange={handleDesc} value={Setting.description} />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={
                                {offset:10}
                            }
                        >
                        <Button key="submit" htmlType="submit"  >
                          저장
                        </Button>
                        </Form.Item>

                    </Form>
                </Modal>
        </Wrapper>
        </Layout>
    )
}

const Wrapper=styled.div`
    display:flex ;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    width: 90%;
    min-width:1000px;

        
    #example{
        border: 1px solid black;
        width: 400px;
        height: 400px;
        font-size: 20px;
        overflow-y: scroll auto;
        overflow-x: scroll auto;
        border-radius: 10px;
        white-space:nowrap;
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
    #copy-button{
        background:white;
        outline:none;
        border:1px solid gray;
    }
    #copy-button:hover{
        cursor: pointer;
    }
`



export default withRouter(GenerateData)
