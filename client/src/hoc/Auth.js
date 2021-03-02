import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {auth} from '../actions/user_action'

export default function (SpecificComponent) {

    function AuthCheck(props) {
        const dispatch = useDispatch();
        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log(response)
                if (!response.auth) {
                    props.history.push('/user/login')
                } 
            })
        }, [])
        return (<SpecificComponent {...props}/>)
    }
    return AuthCheck
}