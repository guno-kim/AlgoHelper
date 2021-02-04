import React from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'

function Header() {
    return (
        <Wrapper>
            <nav className='container'>
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
                    <li>
                        <a href="http://localhost:5000/user/login">로그인</a>
                    </li>
                </ul>
            </nav>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    min-height: 100px;
    max-height: 10vh;
    height: 10vh;
    position: relative;
    position: sticky;
    top: 0;
    width: 100vw;
    z-index: 10;
    background: white;
    .container{
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 1920px;
        height: 100%;
        margin: auto;
        padding-right: 20px;
        border-bottom: 1px solid #ddd;
            ul{
                display: flex;
                flex-direction:row;
                justify-content: flex-end;
                list-style:none;

                li{
                    margin-left: 5rem;
                    a{
                        color: rgba(0,0,0,0.5); 
                        &:hover{
                            color: black;
                        }
                    }
            }
        }

        .active_class {
            color: black;
            padding-bottom:10px;
            border-bottom: 5px solid #ddd;
        }
    }
`
export default Header