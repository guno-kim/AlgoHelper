import React from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import {logout} from '../../actions/user_action'

import axios from 'axios'
function Header(props) {
    const auth = useSelector(state => state.user.auth)
    const dispatch = useDispatch();

    return (
        <Wrapper>
            <nav className='container'>
                <h2 className='logo'>AlgoHelper</h2>
                <ul >
                    <li>
                        <NavLink to='/' exact activeClassName='active_class'>메인</NavLink>
                    </li>
                    <li>
                        <NavLink to='/problem/create' exact activeClassName='active_class'>만들기</NavLink>
                    </li>
                    <li>
                        <NavLink to='/problem' exact activeClassName='active_class'>문제리스트</NavLink>
                    </li>
                    <li>
                        <NavLink to='/user/profile' exact activeClassName='active_class'>마이페이지</NavLink>
                    </li>
                </ul>
                {
                    auth? <button 
                        className='sign-button'    
                        onClick={()=>{
                        dispatch(logout())
                        document.location.reload()
                    }}>로그아웃</button>
                    :(<button className='sign-button'>
                        <NavLink to='/user/login' exact style={{color:'black'}}>로그인</NavLink>
                        </button>)
                    
                }
            </nav>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    min-height: 50px;
    max-height: 10vh;
    min-width: 900px;
    height: 8vh;
    position: relative;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 10;
    background: rgb(39, 52, 68);
    .container{
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 1920px;
        height: 100%;
        margin: auto;
        border-bottom: 1px solid #ddd;
            .logo{
                position:absolute;
                left:50px;
                color: rgba(250, 250, 250); 
                margin:0;
            }
            ul{
                display: flex;
                flex-direction:row;
                justify-content: flex-end;
                align-items:center;
                list-style:none;
                font-size: 1rem;
                font-weight: bolder;
                margin:0;
                li{
                    margin-left: 5rem;
                    a{
                        color: rgba(175, 179, 185); 
                        &:hover{
                            color: white;
                        }
                    }
                }
            }
        
        .sign-button{
            position:absolute;
            right:50px;

        }
        .active_class {
            color: white;
            padding-bottom:10px;
        }
    }
`
export default Header