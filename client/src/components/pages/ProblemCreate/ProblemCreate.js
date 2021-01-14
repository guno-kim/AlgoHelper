import React ,{useState} from 'react'
import { Form, Input, Button  } from 'antd'
import styled from 'styled-components'
import VariableContainer from '../../commons/Variable/VariableContainer'
import InputContainer from '../../commons/InputContainer/InputContainer'
import FormatBox from '../../commons/FormatBox/FormatBox'
import axios from 'axios'


function ProblemCreate() {
    const [Id, setId] = useState("")
    const [Title, setTitle] = useState('')
    const [Description, setDescription] = useState("")
    const [Variables, setVariables] = useState([{type:'int',name:'a',min:0,max:5,fix:true}])
    const [Inputs, setInputs] = useState([{inputs:new Array(10).fill("").map(()=>new Array(10).fill("")),width:2,height:1,horizonRep:1,verticalRep:1}])

    //자식 state 받는 함수들
    const changeVariables=(variables)=>{
        setVariables(variables)
    }
    const changeInput=(inputs)=>{   
        setInputs(inputs)
    }

    const handleId=(e)=>{setId(e.target.value)}
    const handleTitle=(e)=>{setTitle(e.target.value)}
    const handleDesc=(e)=>{setDescription(e.target.value)}

    const handleSave=(e)=>{
        e.preventDefault()
        const body={
            id:Id,
            title:Title,
            description:Description,
            variables:Variables,
            inputs:Inputs
        }
        axios.post('/problem/create',body)
            .then(()=>{
                    alert("저장 성공")
            })
            .catch((err)=>{
                console.log(err)
                alert("저장 실패")
            })
    }
    return (
        <Wrapper>
            <div className="container">
            <Form
                labelCol={ {
                    span: 2,
                }}
                wrapperCol={ {
                  span: 4,
                }}
                size='middle'
                layout="vertical"
            >
                <Form.Item
                    label="문제 ID"
                    rules={[
                    {
                        required: true,
                        message: '문제 ID를 입력해주세요',
                    },
                    ]}
                >
                    <Input placeholder="ex) 백준 1000" onChange={handleId} value={Id}/>
                </Form.Item>

                <Form.Item
                    label="제목"
                >
                    <Input onChange={handleTitle} value={Title}/>
                </Form.Item>
                <Form.Item
                    label="설명"
                    wrapperCol={
                        {span:18}
                    }
                >
                    <br/>
                    <Input.TextArea onChange={handleDesc} value={Description} />
                </Form.Item>
                <Form.Item
                    label="변수"
                    name="variables"
                    wrapperCol={
                        {span:18}
                    }
                >   
                    <br/>
                    <br/>
                    <br/>
                    <VariableContainer default={Variables} sendState={changeVariables}/>
                </Form.Item>
                
                <Form.Item
                    label="배치"
                    name="inputs"
                    wrapperCol={
                        {span:20, offset:1}
                    }
                    style={{display:'flex',justifyContent:'center'}}
                >
                    <br/>
                    <br/>
                    <br/>
                    <InputContainer default={Inputs} sendState={changeInput}/>

                </Form.Item>

                <Form.Item wrapperCol= {{
                    offset: 10,
                    span: 1,
                }}>
                    <Button type="primary" htmlType="submit" size='large' onClick={handleSave}>
                        저장
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </Wrapper>
    )
}

const Wrapper=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    .container{
        width: 60%;
        display: flex;
        align-items: center;

        .form{
            width: 100%;
        }
    }
`

export default ProblemCreate
