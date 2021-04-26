import {GETLIST_PROBLEM} from './type'
import problemAPI from '../apis/problem'

export async function getlist(){
    const req=await problemAPI.list().then(res=>res.data)
    return{
        type:GETLIST_PROBLEM,
        success:req.success
    }
}
