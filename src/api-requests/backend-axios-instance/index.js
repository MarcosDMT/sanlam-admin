import axios from "axios";

export const backendAxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,

});

backendAxiosInstance.interceptors.request.use(async (request) => {
    // console.log(process.env.NEXT_PUBLIC_BASE_URL);
    return request;
});