import axios from './axios'

const problemAPI={
    get:(data)=>{
        const url='/problem'
        return axios.get(url,data)
    },
    getList:(data)=>{
        const url='/problem/list'
        return axios.get(url,data)
    },
    getMyList:()=>{
        const url='/problem/my'
        return axios.get(url)
    },
    delete: (data)=>{
        const url='/problem/delete'
        return axios.post(url,data)
    },
    test : (data)=>{
        const url='/problem/test'
        return axios.get(url,data)
    },
    create : (data)=>{
        const url='/problem/create'
        return axios.post('/problem/create',data)
    },
    like : (problem_Id)=>{
        return axios.post(`/problem/${problem_Id}/like`)
    },
    dislike : (problem_Id)=>{
        return axios.post(`/problem/${problem_Id}/dislike`)
    }
    
}

export default problemAPI