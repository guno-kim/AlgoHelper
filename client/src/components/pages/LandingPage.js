import React,{useEffect} from 'react'
import axios from 'axios'
import{ Button} from 'antd'
function LandingPage(props) {
    useEffect(() => {
        const body={message:"hihi"}
        axios.post('/',body)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
            })
    }, [])

    return (
        <div>
            <Button onClick={()=>{props.history.push('/data/generate')}}>데이터 생성</Button>
        </div>
    )
}

export default LandingPage
