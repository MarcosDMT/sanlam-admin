import JwtHelper from "../helpers/jwt-helper";
import {axiosInstance} from "./axios-instance";
import {APP_API_URL} from "../utils/api-endpoints";

import SimpleCrypto from  'simple-crypto-js'

const secretKey = new SimpleCrypto(process.env.NEXT_PUBLIC_ENCRYPTION_KEY);

class AuthApis{
    async Login (values) {
        const encryptedData = {
            data: secretKey.encrypt(values)
        };

        return new Promise(async (resolve, reject) => {
            axiosInstance.post(APP_API_URL.LOGIN, encryptedData).then( response => {
                const data = secretKey.decrypt(response.data);
                if(data.token !== null){
                    resolve(data);
                }
                reject(new Error('Wrong Username/Password Combination.'))
            }).catch(e => {
                if (e.response.status === 401){
                    reject(new Error('Wrong Username/Password Combination.'))
                }
                else{
                    reject(new Error(e.message))
                }

                console.log(e.message)
            })
        })
    };
    async decodeToken(accessToken) {
        return new Promise((resolve, reject) => {
            try {
                // Decode access token
                const jwt = new JwtHelper()
                const decodedToken  = jwt.decodeToken(accessToken);
                resolve(decodedToken);
            } catch (err) {
                reject(new Error("Internal server error"));
            }
        });
    }
}

export const authApi = new AuthApis();