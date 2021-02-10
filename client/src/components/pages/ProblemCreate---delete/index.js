import React,{useState} from 'react'
import {Button,Input,Modal,Checkbox,Form} from 'antd'
import axios from 'axios'
import ProblemSetting from '../../commons/ProblemSetting/index';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components'
import './style.scss'
import Layout from '../../Layout/Layout'
function ProblemCreate(props) {
    const [Setting, setSetting] = useState({
        id:'',
        title:'',
        description:'',
        variables:[{type:'int',name:'a',min:0,max:5,fix:true}],
        testCodes:{language:'python',code:'asdsa\nasd'},
        inputBlocks:[{inputs:new Array(10).fill("").map(()=>new Array(10).fill("")),width:1,height:1,horizonRep:1,verticalRep:1}],
    })
    const [isModalVisible, setIsModalVisible] = useState(false);

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

    const getChildState=(state)=>{
        setSetting(state)
    }

    const showModal = () => {setIsModalVisible(true)};
    const handleCancel = () => {setIsModalVisible(false);};
    return (
        <Layout>
            <ProblemSetting setting={Setting} sendState={getChildState}/>
            
            <Button type="primary"  size='large' onClick={showModal}>저장</Button>
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
                        <Button key="submit" htmlType="submit" >
                          저장
                        </Button>
                        </Form.Item>

                    </Form>
                </Modal>
                <Button onClick={()=>{
                    props.history.push('/problem')
                }}>test</Button>            
        </Layout>
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
    }
`


export default withRouter(ProblemCreate)
