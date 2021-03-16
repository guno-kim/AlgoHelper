import React,{useState,useEffect,useRef} from 'react'
import { useSelector } from 'react-redux'
import axios from '../../../axios'
import { useDispatch } from 'react-redux';
import {update} from '../../../actions/user_action'
import { withRouter } from 'react-router-dom';
import {List,Divider,Table } from 'antd'
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
    const columns = [
        { title: '제목', dataIndex: 'title', key: 'title',
            render:(text)=><a href={`/problem/${text[1]}`}>{text[0]}</a>,
            align:'center',

        },
        { title: '작성일', dataIndex: 'date', key: 'date',
            render:text=>{
                return text.substring(0,10)
            },
            align:'center',
            width:'100px',

        },
        
        { title: '추천', dataIndex: 'like', key: 'like',align:'center',width:'50px',    },
        {
            title: '삭제',
            dataIndex: 'delete',
            key: 'x',
            render: (text) => <button onClick={()=>handleDelete(text)}>삭제</button>
            ,align:'center',
            width:'80px',

          },
      ];
    const renderProblems=Problems[0]&&Problems.map((ele,index)=>{
        return ({
            key:index,
            delete:ele._id,
            title:[`[ ${ele.id} ] ${ele.title}`,ele._id],
            date:ele.date,
            like:ele.like-ele.dislike
        })
    })
    const tempData=()=>{
        let temp=[]
        for(let i=0;i<95;i++){
            temp.push({
                key:i,
                delete:'asd',
                title:[`sfsdfd${i}`,'asd'],
                date:'2020-12-12',
                like:100-i
            })
        }
        return temp
    }

    return (
        <Layout>

            
            <div style={{
                width:'800px',
                height:'700px',
                borderRadius: '10px',
                border:'1px solid lightgray',
                marginTop:'100px',
                display:'flex',
                flexDirection:'column',
                alignItems:'center'
                
            }}>
                <Divider>닉네임</Divider>
                <div style={{display:'flex' ,justifyContent:'center'}}>
                    <input value={Name} onChange={(e)=>{setName(e.target.value)}}></input>
                    <button onClick={onNameChange}>변경</button>
                 </div>

                <Divider>내 문제</Divider>
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
            </div>
        </Layout>
    )
}

export default withRouter(MyPage)
