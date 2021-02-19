import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import ProblemSetting from '../../commons/ProblemSetting/index';
import {Button} from 'antd'
import { useHistory } from 'react-router-dom'
function Problem(props) {

    
    const problem_Id=props.match.params.problem_Id
    const [Setting, setSetting] = useState({})
    useEffect(async () => {
        const request=await axios.get('/problem',{
            params:{
                _id:problem_Id
            }
        })
        setSetting(request.data)
    }, [])

   const history=useHistory()
    

    const getChildState=(state)=>{
        setSetting(state)
    }
    return (
        <div style={{display:'flex',justifyContent:'center'}}>
            <Wrapper>
                <h2>[{Setting.id}] {Setting.title}</h2>
                {Setting.variables&&
                    <ProblemSetting setting={Setting} sendState={getChildState}/>
                }

                <button onClick={()=>{
                    console.log(Setting)
                    }}>Setting</button>
                <Button onClick={()=>{
                    history.push({
                        pathname:`/problem/${problem_Id}/test`,
                        state:{setting:Setting}
                })
                }}>테스트</Button>
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

export default Problem
