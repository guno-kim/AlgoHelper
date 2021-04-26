import React,{useState,useEffect,useRef} from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import {update} from '../../../actions/user_action'
import { withRouter } from 'react-router-dom';
import {Divider,Table } from 'antd'
import Layout from '../../Layout/Layout'
import problemAPI from '../../../apis/problem'

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
        problemAPI.getMyList().then((res)=>{setProblems(res.data)})
    }, [])

    const handleDelete=(_id)=>{
        problemAPI.delete({_id:_id})
            .then(()=>{
                problemAPI.getMyList().then((res)=>{setProblems(res.data)})
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
            like:ele.like.length-ele.dislike.length
        })
    })

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
