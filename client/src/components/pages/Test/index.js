import React,{useState} from 'react'
import CodeBox from '../../commons/CodeBox/CodeBox'
import {useLocation} from 'react-router-dom'
import styled from 'styled-components'
import {Button} from 'antd'
import axios from 'axios'

function Test() {
    const location=useLocation()
    const setting=location.state.setting

    const [MyCode, setMyCode] = useState({language:'python',code:''})
    const handleMyCode=(code)=>{
        setMyCode(code)
    }

    return (
        <div style={{display:'flex',justifyContent:'center'}}>
            <Wrapper>
                <CodeBox value={MyCode} sendState={handleMyCode} style={{height:'400px'}}/>
                <button onClick={()=>{console.log(setting)}}>asd</button>
                <Button onClick={()=>{
                    axios.get('/problem/test',{
                        params:{
                            problem:{...setting,myCode:MyCode}
                        }
                    }).then((res)=>{
                        console.log('11')
                        console.log(res.data)
                    })
                    console.log('22')
                }}>test</Button> 
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
`
export default Test
