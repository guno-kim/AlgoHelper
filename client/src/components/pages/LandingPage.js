import React,{useEffect} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import {auth} from '../../actions/user_action'
import styled from 'styled-components'
import Layout from '../Layout/Layout'
function LandingPage(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state)
    useEffect(() => {
        dispatch(auth())
    }, [])
    return (
        <Layout>
            <div>
                <input/>
            </div>
        </Layout>
        
    )
}
export default LandingPage
