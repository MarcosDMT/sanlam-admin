import useAxios from "../../../hooks/use-axios";
import {APP_API_URL} from "../../../utils/api-endpoints";

export const fetchRoles = (authUser) =>{
    return new Promise((resolve,reject) =>{
        const axiosInstance = useAxios(authUser)
        axiosInstance.get(APP_API_URL.GET_ROLES)
            .then((res) =>{
                resolve(res.data)
            })
            .catch((err) =>{
                reject(err.message)
            })
    })
}
export const fetchPermissions = (authUser) =>{
    return new Promise((resolve,reject) =>{
        const axiosInstance = useAxios(authUser)
        axiosInstance.get(APP_API_URL.GET_PERMISSIONS)
            .then((res) =>{
                resolve(res.data)
            })
            .catch((err) =>{
                reject(err.message)
            })
    })
}

export const addRole = (authUser, data) =>{
    return new Promise((resolve,reject) =>{
        const axiosInstance = useAxios(authUser)
        axiosInstance.post(APP_API_URL.GET_ROLES, data)
            .then((res) =>{
                resolve(res.data)
            })
            .catch((err) =>{
                reject(err.message)
            })
    })
}

export const addRolePermissions = (authUser, data) =>{
    return new Promise((resolve,reject) =>{
        const axiosInstance = useAxios(authUser)
        axiosInstance.post(APP_API_URL.GET_PERMISSIONS, data)
            .then((res) =>{
                resolve(res.data)
            })
            .catch((err) =>{
                reject(err.message)
            })
    })
}

export  const fetchUserMenus = (authUser) => {
    return new Promise((resolve, reject) => {
        const axiosInstance = useAxios(authUser)
        const formData = {
            userId: authUser.user?.userid,
        }
        axiosInstance.post(APP_API_URL.GET_MENUS, formData)
            .then((res) =>{
                resolve(res.data)
            })
            .catch((err) =>{
                reject(err.message)
            })
    })
}