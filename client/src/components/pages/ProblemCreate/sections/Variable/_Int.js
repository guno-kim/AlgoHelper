import React,{useState,useEffect} from 'react'
import { Input,Descriptions,Checkbox,InputNumber } from 'antd';
import 'antd/dist/antd.css';
function _Int(props) {

    const [Data, setData] = useState(props.data)
    const handleName=(e)=>{
        setData({...Data,name:e.target.value})
    }
    const handleMin=(e)=>{
        setData({...Data,min:e})
    }
    const handleMax=(e)=>{
        setData({...Data,max:e})
    }
    const handleFix=(e)=>{
        console.log(Data)
        console.log(props.data)
        setData({...Data,fix:e.target.checked})
    }
    useEffect(() => {
        props.changeVariable(Data)
    }, [Data])
    useEffect(() => {
        setData(props.data)
    },[props.data])
    return (
        <div>
            <Descriptions layout="vertical" bordered size="small" column={{ xs: 8, sm: 16, md: 24}}>
            <Descriptions.Item label="자료형" style={{width:'20%',textAlign:'center'}}>
                Int
            </Descriptions.Item>
            <Descriptions.Item label="변수이름" style={{width:'20%',textAlign:'center'}}>
                <Input value={Data.name} onChange={handleName} style={{textAlign:'center'}}/>
            </Descriptions.Item>
            <Descriptions.Item label="최소값" style={{width:'20%',textAlign:'center'}}>
                <InputNumber value={Data.min} onChange={handleMin} style={{textAlign:'center'}}/>
            </Descriptions.Item>
            <Descriptions.Item label="최대값" style={{width:'20%',textAlign:'center'}}>
                <InputNumber value={Data.max} onChange={handleMax} style={{textAlign:'center'}}/>
            </Descriptions.Item>
            <Descriptions.Item label="고정" style={{width:'20%',textAlign:'center'}}>
                <Checkbox checked={Data.fix} onChange={handleFix}/>
            </Descriptions.Item>
            </Descriptions>
        </div>
    )

}

export default _Int
