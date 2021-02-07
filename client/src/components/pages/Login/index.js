import React from 'react'
import styled from 'styled-components'
import {GoogleOutlined} from '@ant-design/icons'
function Login(props) {
    return (
        <Wrapper>
            <div
                className='login-button google'
                onClick={()=>{document.location.href="http://localhost:5000/user/login"}}
            ><GoogleOutlined/></div>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    .google{
      
        background-color:rgb(226, 73, 57);
    }
    .login-button{
        width:200px;
        height:100px;
    }
    .login-button:hover{
        cursor: pointer;
    }
`
export default Login
