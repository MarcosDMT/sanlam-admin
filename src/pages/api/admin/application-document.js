import {API_METHODS, API_URL} from "../../../utils/api-endpoints";
import {backendAxiosInstance} from "../../../api-requests/backend-axios-instance";
import {applicationData} from "../../../api-requests/dummy-data";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1024mb' // Set desired value here
        }
    }
}
export default async function handler(req, res) {
    if (req.method === API_METHODS.GET) {
        try {
            if (!req.headers?.authorization){
                res.status(401).send('Unauthorized');
            }
            const config = {
                headers: {
                    'Authorization': req.headers.authorization,
                }
            };
            await backendAxiosInstance.get(API_URL.GET_APPLICATIONS, config).then(response => {
                res.status(response.status).json(response.data);
            }).catch(e =>{
                res.status(e.response?.status).json(e.response?.data)
            })

        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    else if (req.method === API_METHODS.POST) {
        try {
            if (!req.headers?.authorization){
                res.status(401).send('Unauthorized');
            }
            const config = {
                headers: {
                    'Authorization': req.headers.authorization,
                }
            };
            const body = req.body;

            const URL = `${API_URL.DOWNLOAD_APPLICATION}/${body.applicationId}/downloadapplication`;
            console.log(URL);

            await backendAxiosInstance.post(URL,{}, config).then(response => {
                res.status(200).json(response.data);

            }).catch(e => {
                    res.status(e.response?.status ?? 500).json(e.response?.data)
                }
            )

        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    else {
        res.status(404).json({message: 'path not found!'});
    }
}