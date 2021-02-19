import React,{useState,useEffect} from 'react'
import { Input,Descriptions,Checkbox,InputNumber } from 'antd';
import 'antd/dist/antd.css';
function _Int(props) {

    const [Data, setData] = useState(props.data)
    useEffect(() => {
        setData(props.data)
    },[props.data])
    return (
        <div>
            <Descriptions layout="vertical" bordered size="small" column={{ xs: 8, sm: 16, md: 24}} style={{width:'500px'}}>
                <Descriptions.Item label="자료형" style={{width:'20%',textAlign:'center'}}>
                    Int
                </Descriptions.Item>
                <Descriptions.Item label="변수이름" style={{width:'20%',textAlign:'center'}}>
                    {Data.name}
                </Descriptions.Item>
                <Descriptions.Item label="최소값" style={{width:'20%',textAlign:'center'}}>
                    {Data.min}
                </Descriptions.Item>
                <Descriptions.Item label="최대값" style={{width:'20%',textAlign:'center'}}>
                   {Data.max}
                </Descriptions.Item>
                <Descriptions.Item label="고정" style={{width:'20%',textAlign:'center'}}>
                    <Checkbox checked={Data.fix} />
                </Descriptions.Item>
            </Descriptions>
        </div>
    )

}

export default _Int
