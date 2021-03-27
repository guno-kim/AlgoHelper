import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {auth} from '../actions/user_action'

export default function (SpecificComponent,needAuth) {

    function AuthCheck(props) {
        const dispatch = useDispatch();
        useEffect(() => {

            dispatch(auth()).then(response => {
                if (needAuth&&!response.auth) {
                    props.history.push('/user/login')
                } 
            })
        }, [])
        return (<SpecificComponent {...props}/>)
    }
    return AuthCheck
}