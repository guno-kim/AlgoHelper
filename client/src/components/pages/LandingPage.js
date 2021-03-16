import React,{useEffect} from 'react'
import axios from '../../axios'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import Layout from '../Layout/Layout'
function LandingPage(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state)
    return (
        <Layout>
            <div>
                <button onClick={()=>{
                    axios.get('/',(req,res)=>{
                        console.log(res.data)
                    })
                }}>server</button>
                <input/>
            </div>
        </Layout>
        
    )
}
export default LandingPage
