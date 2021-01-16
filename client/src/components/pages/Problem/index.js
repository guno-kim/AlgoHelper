import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import ProblemSetting from '../../commons/ProblemSetting/index';

function Problem(props) {

    
    const problem_Id=props.match.params.problem_Id
    const [Setting, setSetting] = useState({})
    const [ReRender, setReRender] = useState(0)

    useEffect(async () => {
        const request=await axios.get('/problem',{
            params:{
                _id:problem_Id
            }
        })
        setSetting(request.data)
    }, [])
    const reRender=()=>{
        setReRender(ReRender+1)
    }

   
    

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
                    }}>print</button>
            </Wrapper>
        </div>
    )
}

const Wrapper=styled.div`
display:flex ;
flex-direction: column;
align-items: center;
width: 60%;
min-width:1000px;
background-color: RGB(250, 250, 250);
`

export default Problem
