import React,{useEffect} from 'react'
import axios from 'axios'
import{ Button,Form,Input,Checkbox} from 'antd'

function LandingPage(props) {
    useEffect(() => {
        const body={message:"hihi"}
        axios.post('/',body)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
            })
    }, [])


    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
      const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      };
      
    return (
        <div>
            <Form
                name="basic"
                >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default LandingPage
