import React,{useEffect,useState,useRef} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Layout from '../../Layout/Layout2'
import {Button,Collapse,Divider } from 'antd'
import { useHistory } from 'react-router-dom'
import VariableContainer from './sections/Variable/VariableContainer'
import InputBlockContainer from './sections/InputBlockContainer/InputBlocks'
import InputFormat from './sections/InputFormat/InputFormat'
import CodeBox from  './sections/CodeBox/CodeBox'
import CodeBox2 from  '../../commons/CodeBox/CodeBox'
const { Panel } = Collapse;
function Problem(props) {
    const problem_Id=props.match.params.problem_Id
    const [Setting, setSetting] = useState({})
    const [Format, setFormat] = useState([])
    const [Data, setData] = useState([])
    const [MyCode, setMyCode] = useState({language:'python',code:''})

    const textAreaRef = useRef(null);
    const handleMyCode=(code)=>{
        setMyCode(code)
    }
    useEffect(async () => {
        const request=await axios.get('/problem',{
            params:{
                _id:problem_Id
            }
        })
        setSetting(request.data)
    }, [])

   const history=useHistory()

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
                <h2 style={{margin:'50px 0', fontSize:'30px'}}>[{Setting.id}] {Setting.title}</h2>
                
                <Collapse defaultActiveKey={[]} style={{width:'900px'}}>
                    <Panel header="데이터 설정" key="1" style={{fontSize:'18px'}}>
                        <Divider style={{margin:'50px 0' ,fontSize:'20px'}}>변수</Divider>
                        <VariableContainer variables={Setting.variables}/>
                        <Divider style={{margin:'50px 0',fontSize:'20px'}}>데이터 블록</Divider>
                        <InputBlockContainer default={Setting.inputBlocks}/>
                    </Panel>
                    <Panel header="데이터 예시" key="2" style={{fontSize:'18px'}}>
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
                                id='output'
                            />
                        </div>
                    </div>
                    <Button onClick={getExample} size='medium' >생성</Button>
                    </div>
                    </Panel>
                    <Panel header="정답 코드" key="3" style={{fontSize:'18px'}} forceRender={true}>
                        <CodeBox value={Setting.testCodes}/>
                    </Panel>
                </Collapse>
                <div className="content-container">
                    <div className='header'>
                        <h1 className='title'>테스트 코드 작성</h1>
                        <h3 className='description'>테스트할 코드를 작성하세요</h3>
                    </div>
                    <CodeBox2 value={MyCode} sendState={handleMyCode} />
                </div>

                <button onClick={()=>{
                    console.log(Setting)
                    }}>Setting</button>
                <Button onClick={()=>{
                    history.push({
                        pathname:`/problem/${problem_Id}/test`,
                        state:{setting:{...Setting,myCode:MyCode}}
                })
                }}>테스트</Button>
            </Wrapper>
        </Layout>
    )
}

const Wrapper=styled.div`
display:flex ;
flex-direction: column;
align-items: center;
text-align: center;
width: 60%;
height:100%;
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
`

export default Problem
