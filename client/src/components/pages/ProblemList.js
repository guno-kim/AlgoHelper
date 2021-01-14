import React,{useState,useEffect} from 'react'
import { List, Typography, Divider } from 'antd';
import styled from 'styled-components'
import axios from 'axios'

function ProblemList() {

    const [Problems, setProblems] = useState([])
    const [Search, setSearch] = useState("")
    useEffect(() => {
        //console.log(Search)
    }, [Search])
    // useEffect(() => {
    //     getProblemList()
    // }, [])

    const handleSearch=(e)=>{
        setSearch(e.target.value)
    }
    const getProblemList= async (e)=>{
        e.preventDefault()
        const request=await axios.get('/problem/getList',{
            params:{
                search:Search
            }
        })
        setProblems(request.data)
        console.log(Problems)
    }
    const problemName=Problems[0]&&Problems.map((ele)=>{
        return `[${ele.id}]  ${ele.title}`
    })

    return (
        <div>
             <List
                header={<form><input value={Search} onChange={handleSearch}/><button onClick={getProblemList}>검색</button></form>}
                footer={<div>Footer</div>}
                bordered
                dataSource={problemName}
                renderItem={item => (
                    <List.Item>
                     {item}
                    </List.Item>
                )}
            />
        </div>
    )
}


export default ProblemList
