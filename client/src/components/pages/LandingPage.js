import React,{useEffect} from 'react'
import axios from 'axios'
import{ Button,Form,Input,Checkbox} from 'antd'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import {auth} from '../../actions/user_action'
function LandingPage(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state)
    useEffect(() => {
        dispatch(auth())
    }, [])
    return (
        <div>
            <div>
                <form action={"/register"} method={'post'}>
                    <input name='id'></input>
                    <input name='password'></input>
                    <button type='submit'>submit</button>
                </form>
            </div>
            <br/>
            <br/>
            <div>
                <form action={"/login"} method={'post'}>
                    <input name='id'></input>
                    <input name='pw'></input>
                    <button type='submit'>submit</button>
                </form>
            </div>
            <a href="http://localhost:5000/login">
                <button >login</button>
            </a>
            <button onClick={()=>{
                axios.get('/login').then((res)=>{console.log(res.data)})
            }}>login</button>
            <button onClick={()=>{
                dispatch(auth())
                    .then((res)=>{
                        console.log(res)
                    })
            }}>auth</button>
            <button onClick={()=>{
                console.log(user)
            }}>user</button>
        </div>
    )
}

export default LandingPage
