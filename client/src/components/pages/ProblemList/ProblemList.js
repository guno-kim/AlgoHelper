import React,{useState,useEffect} from 'react'
import { List,Table,Button,Input,Form } from 'antd';
import styled from 'styled-components'
import axios from 'axios'
import Layout from '../../Layout/Layout2'

function ProblemList(props) {

    const [Problems, setProblems] = useState([])
    const [Search, setSearch] = useState("")
    useEffect(() => {
        axios.get('/problem/getList',{
            params:{
                search:""
            }
        }).then(res=>setProblems(res.data))
        
    }, [])

    const handleSearch=(e)=>{
        setSearch(e.target.value)
    }
    const getProblemList= async ()=>{
        const request=await axios.get('/problem/getList',{
            params:{
                search:Search
            }
        })
        setProblems(request.data)
    }
    const columns = [
        { title: '제목', dataIndex: 'title', key: 'title',
            render:(text)=><a href={`/problem/${text[1]}`}>{text[0]}</a>,
            align:'center',

        },
        { title: '작성일', dataIndex: 'date', key: 'date',
            render:text=>{
                return text&&text.substring(0,10)
            },
            align:'center',
            width:'100px',

        },
        
        { title: '추천', dataIndex: 'like', key: 'like',align:'center',width:'50px',    },
      ];
    const renderProblems=Problems[0]&&Problems.map((ele,index)=>{
        return ({
            key:index,
            title:[`[ ${ele.id} ] ${ele.title}`,ele._id],
            date:ele.date,
            like:ele.like.length-ele.dislike.length
        })
    })
    return (
        <Layout>
        <div style={{display:'flex', flexDirection:'column',alignItems:'center',justifyContent:'center', width:'100%',height:'600px'}}>
            <Form style={{margin:'20px 0',display:'flex'}}>
                <Input value={Search} onChange={handleSearch} onKeyUp={()=>{
                    if(window.event.keyCode==13){
                        getProblemList()
                    }
                }}/>
                <Button onClick={getProblemList}>검색</Button>
                </Form>
             <Table
                    columns={columns}
                    dataSource={renderProblems}
                    size='small'
                    bordered='true'
                    pagination={{
                        position:['none','bottomCenter'], 
                        pageSize:10,
                        showSizeChanger:false
                    }}
                    style={{
                        width:'500px'
                    }}
                />
            <Button onClick={()=>{props.history.push('/problem/create')}}>문제 작성</Button>
        </div>
        </Layout>
    )
}


export default ProblemList
