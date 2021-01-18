import React,{useState} from 'react'
import {Button,Input,Modal,Checkbox,Form} from 'antd'
import axios from 'axios'
import ProblemSetting from '../../commons/ProblemSetting/index';

function ProblemCreate(props) {
    const [Setting, setSetting] = useState({
        id:'',
        title:'',
        description:'',
        variables:[{type:'int',name:'a',min:0,max:5,fix:true}],
        testCodes:{language:'python',code:'asdsa\nasd'},
        inputBlocks:[{inputs:new Array(10).fill("").map(()=>new Array(10).fill("")),width:1,height:1,horizonRep:1,verticalRep:1}],
        public:true
    })
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleId=(e)=>{setSetting({...Setting,id:e.target.value})}
    const handleTitle=(e)=>{setSetting({...Setting,title:e.target.value})}
    const handleDesc=(e)=>{setSetting({...Setting,description:e.target.value})}
    const handlePublic=(e)=>{setSetting({...Setting,public:e.target.checked})}
    const handleSave=()=>{
        axios.post('/problem/create',Setting)
            .then(()=>{
                    alert("저장 성공")
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
        <div style={{textAlign:'center'}}>
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
                        <p>공개 <Checkbox checked={Setting.public} onChange={handlePublic}/></p>
                        <br/>
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

        </div>
    )
}

export default ProblemCreate
