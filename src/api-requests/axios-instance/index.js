import axios from "axios";
import {AUTH_TOKEN_KEY} from "../../utils/constants";
export const axiosInstance = axios.create({
    //baseURL: API_BASE_URL,
});
axiosInstance.interceptors.request.use(async (request) => {
    let token;
    token = globalThis.localStorage?.getItem(AUTH_TOKEN_KEY);
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});