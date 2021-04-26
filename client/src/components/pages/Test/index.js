import React,{useState,useRef,useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import styled from 'styled-components'
import {Button,Table,Modal, Result} from 'antd'
import problemAPI from '../../../apis/problem'

function Test() {
    const location=useLocation()
    const setting=location.state.setting
    const textAreaRef = useRef(null);

    const [Loading, setLoading] = useState(false)
    const [Outputs, setOutputs] = useState([])
    const [ModalVisible, setModalVisible] = useState(false)
    const [ModalIndex, setModalIndex] = useState(0)
    const getOutputs=()=>{
        setLoading(true)

        problemAPI.test({
            params:{
                problem:setting
            }
        }).then((res)=>{
            setLoading(false)
            setOutputs(res.data.outputs)
        })
    }
    useEffect(() => {
        getOutputs()
    }, []);
    const getData=(outputs)=>{
        return outputs.map((output,idx)=>({
            idx:idx,
            myTime:output.myTime+' ms',
            answerTime:output.answerTime+' ms',
            correct:output.correct
        }))
    }
    const showModal=(idx)=>{ 
        setModalIndex(idx)   
        setModalVisible(true)
    }
    const columns=[
        {title:"번호",dataIndex:'idx',align:'center'},
        {title:'정답 시간',dataIndex:'answerTime',align:'center'},
        {title:'내 시간',dataIndex:'myTime',align:'center'},
        {title:'결과',dataIndex:'correct',align:'center'},
        {
            title:'데이터 확인',dataIndex:'idx',
            render:(idx)=><Button onClick={()=>{showModal(idx)}}>확인</Button>
        }
    ]
    const textAreaStyle={
        width:'300px',
        height:'300px',
        overflowX:'scroll auto',
        overflowY:'scroll auto',
        whiteSpace:'nowrap'
    }
    function copyToClipboard(e) {
        textAreaRef.current.select();//텍스트 선택
        document.execCommand('copy');//복사
        e.target.focus();//선택 해제
    };
    return (
        <div style={{display:'flex',justifyContent:'center'}}>
            <Wrapper>
                <div className="content-container">
                    <h1 className='title'>테스트 결과</h1>
                    <h3 className='description'>테스트할 코드를 작성하세요</h3>
                    <Table
                        columns={columns}
                        dataSource={getData(Outputs)}
                        pagination={false}
                        bordered={true}
                        loading={Loading}
                    />
                    <h3 style={{color:'red'}}>시간은 아직 불안정해서 참고용으로만 봐주세요</h3>

                </div>
                <Modal title={ModalIndex+'번 데이터'} visible={ModalVisible}  onCancel={()=>setModalVisible(false)} width={800}>
                    <div style={{display:'flex',flexDirection:'column',width:'300px'}}>
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <h3>입력값</h3>
                            <button onClick={copyToClipboard} style={{justifySelf:'flex-end'}}>복사</button>
                        </div>
                        <textarea 
                            ref={textAreaRef}
                            value={Outputs[ModalIndex]&&Outputs[ModalIndex].input}
                            style={textAreaStyle}
                        />
                    </div>
                   
                    <div style={{display:'flex'}}>
                        <div style={{display:'flex',flexDirection:'column',width:'300px'}}>
                            <h3 style={{textAlign:'center'}}>정답</h3>
                            <textarea 
                                value={Outputs[ModalIndex]&&Outputs[ModalIndex].answerOutput}
                                style={textAreaStyle}
                            />
                            <div style={{color:'red',textAlign:'center'}}>{Outputs[ModalIndex]&&Outputs[ModalIndex].answerError}</div>
                        </div>

                        <div style={{display:'flex',flexDirection:'column',width:'300px'}}>
                            <h3 style={{textAlign:'center'}}>내 결과</h3>
                            <textarea 
                                value={Outputs[ModalIndex]&&Outputs[ModalIndex].myOutput}
                                style={textAreaStyle}
                            />
                            <div style={{color:'red',textAlign:'center'}}>{Outputs[ModalIndex]&&Outputs[ModalIndex].myError}</div>
                        </div>
                    </div>
                </Modal>
            </Wrapper>
          
        </div>
    )
}
const Wrapper=styled.div`
display:flex ;
flex-direction: column;
align-items: center;
text-align: center;
width: 60%;
min-width:1000px;
background-color: RGB(250, 250, 250);

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
`
export default Test
