import{
    AUTH_USER,
    LOGOUT_USER
} from '../actions/type'
export default function (state = {}, action) {
    switch (action.type) {
        case AUTH_USER:
            return {...state,auth:action.auth,data:action.data}
        case LOGOUT_USER:
            return {...state,auth:false,data:{}}
        default:
            return state;
    }
}