import {APP_API_URL} from "../utils/api-endpoints";
import useAxios from "../hooks/use-axios";


class AdminApis {
    getCustomers(useAuth){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            axiosInstance.get(APP_API_URL.GET_CUSTOMERS).then( response => {
              resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    getCustomerApplications(customerId, useAuth){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            axiosInstance.post(APP_API_URL.GET_CUSTOMERS, { customerId }).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    getApplications (useAuth) {
        return new Promise ((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            axiosInstance.get(APP_API_URL.GET_APPLICATIONS).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    downloadApplication(applicationId, useAuth){
        return new Promise ((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            axiosInstance.post(APP_API_URL.GET_APPLICATIONS,{applicationId}).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    downloadAttachment(applicationId, useAuth){
        return new Promise ((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            axiosInstance.post(APP_API_URL.GET_OTHER_DOCUMENTS,{applicationId}).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
}

export const adminApis  = new AdminApis();