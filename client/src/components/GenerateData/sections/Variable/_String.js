import React,{useState} from 'react'
import { Input, Select,Descriptions,Checkbox } from 'antd';
import 'antd/dist/antd.css';

function _String(props) {
 
    const [Data, setData] = useState(props.data)
    const handleName=(e)=>{
        setData({...Data,name:e.target.value})
        props.changeVariable({...Data,name:e.target.value})
    }
    const handleMin=(e)=>{
        setData({...Data,min:e.target.value})
        props.changeVariable(Data)
    }
    const handleMax=(e)=>{
        setData({...Data,max:e.target.value})
        props.changeVariable(Data)
    }
    const handleFix=(e)=>{
        setData({...Data,fix:e.target.checked})
        props.changeVariable(Data)
    }

    return (
        <div>
            <Descriptions layout="vertical" bordered size="small" column={{ xs: 5, sm: 5, md: 5}}>
            <Descriptions.Item label="자료형" style={{width:'20%',textAlign:'center'}}>
                String
            </Descriptions.Item>
            <Descriptions.Item label="변수이름" style={{width:'20%',textAlign:'center'}}>
                <Input value={Data.name} onChange={handleName} style={{textAlign:'center'}}/>
            </Descriptions.Item>
            <Descriptions.Item label="최소길이" style={{width:'20%',textAlign:'center'}}>
                <Input value={Data.min} onChange={handleMin} style={{textAlign:'center'}}/>
            </Descriptions.Item>
            <Descriptions.Item label="최대길이" style={{width:'20%',textAlign:'center'}}>
                <Input value={Data.max} onChange={handleMax} style={{textAlign:'center'}}/>
            </Descriptions.Item>
            <Descriptions.Item label="고정" style={{width:'20%',textAlign:'center'}}>
                <Checkbox checked={Data.fix} onChange={handleFix}/>
            </Descriptions.Item>
            <Descriptions.Item label="구성요소" style={{width:'100%',textAlign:'center'}}>
                <Checkbox checked={Data.fix} onChange={handleFix}/>
            </Descriptions.Item>
            </Descriptions>
        </div>
    )

}

export default _String
