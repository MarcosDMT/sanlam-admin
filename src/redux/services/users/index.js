import useAxios from "../../../hooks/use-axios";
import { APP_API_URL } from "../../../utils/api-endpoints";


export const addUser = (authUser,data) =>{
    return new Promise((resolve,reject) =>{
        const axiosInstance = useAxios(authUser)
        axiosInstance.post(APP_API_URL.ADD_USER,data)
        .then((res) =>{
            resolve(res.data)
        })
        .catch((err) =>{
            reject(err.message)
        })
    })
}

export const fetchUser = (authUser) =>{
    return new Promise((resolve,reject) =>{
        const axiosInstance = useAxios(authUser)
        axiosInstance.post(APP_API_URL.GET_USER)
        .then((res) =>{
            resolve(res.data)
        })
        .catch((err) =>{
            reject(err.message)
        })
    })
}