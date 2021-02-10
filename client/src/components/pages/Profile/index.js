import React,{useState,useEffect,useRef} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import {update} from '../../../actions/user_action'
import { withRouter } from 'react-router-dom';
import {List} from 'antd'
import styled from 'styled-components'
import Layout from '../../Layout/Layout'
function MyPage() {
    const data=useSelector(state => state.user.data)
    const [Name, setName] = useState("")
    const [Problems, setProblems] = useState([])
    const dispatch = useDispatch();

    const onNameChange=(e)=>{
        dispatch(update({name:Name}))
    }
    useEffect(() => {
        if(data){
            setName(data.name)
        }
    }, [data])
    useEffect(() => {
        axios.get('/problem/my')
            .then((res)=>{setProblems(res.data)})
    }, [])

    const handleDelete=(_id)=>{
        axios.post('/problem/delete',{_id:_id})
            .then(()=>{
                axios.get('/problem/my')
                    .then((res)=>{setProblems(res.data)})
            })
            .catch(()=>{
                alert('잠시후 시도해주세요')
            })
    }
    const renderProblems=Problems[0]&&Problems.map((ele)=>{
        return (<div>
                    <a href={`/problem/${ele._id}`}>[ {ele.id} ]  {ele.title}</a>
                    <button onClick={()=>handleDelete(ele._id)}>삭제</button>
                </div>)
    })

    return (
        <Layout>
            <div style={{
                width:'500px',
                height:'700px',
                borderRadius: '10px',
                backgroundColor: 'white'
            }}>
                 <input value={Name} onChange={(e)=>{setName(e.target.value)}}></input><button onClick={onNameChange}>변경</button>

                <List
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={renderProblems}
                    renderItem={item => (
                        <List.Item>
                        {item}
                        </List.Item>
                    )}
                />

            </div>
           
        </Layout>
    )
}

export default withRouter(MyPage)
