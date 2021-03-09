import React from 'react'
import styled from 'styled-components'
import {GoogleOutlined} from '@ant-design/icons'
function Login(props) {
    return (
        <Wrapper>
            <div id="main-container">
                <div className="button-box">
                    <div
                        className='login-button google'
                        onClick={()=>{document.location.href="http://3.35.209.162/user/login"}}
                    >
                        <GoogleOutlined className='logo'/>
                        <div className='desc'>Google 로그인</div>
                    </div>

                </div>
            </div>
            
        </Wrapper>
    )
}
const Wrapper = styled.div`
    display:flex ;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 92vh;

    #main-container{
        display:flex ;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 60%;
        height: 100%;
        min-width:1000px;
        background-color: RGB(250, 250, 250);

        .button-box{
            border-radius: 10px;
            background-color: white;
            border: 1px solid lightgray;
            width:500px;
            height:300px;
            display:flex ;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .google{
            background-color:rgb(226, 73, 57);
        }
        .login-button{
            width:280px;
            height:40px;
            display:flex;
            align-items: center;
            justify-content: center;
            border-radius: 3px;
            position:relative;
            .logo{
                color:white;
                position:absolute;
                left:10px;
                font-size:20px;
            }
            .desc{
                color:white;
                font-size:15px;

            }

        }
        .login-button:hover{
            cursor: pointer;
        }

    }
   
`
export default Login
