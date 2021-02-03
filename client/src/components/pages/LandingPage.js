import React,{useEffect} from 'react'
import axios from 'axios'
import{ Button,Form,Input,Checkbox} from 'antd'
function LandingPage(props) {

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
                console.log(document.cookie)
            }}>cookie</button>
            <button onClick={()=>{
                axios.get('/temp').then((res)=>{console.log(res.data)})
            }}>temp</button>
        </div>
    )
}

export default LandingPage
