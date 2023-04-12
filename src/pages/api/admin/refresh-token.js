import {API_METHODS, API_URL} from "../../../utils/api-endpoints";
import {backendAxiosInstance} from "../../../api-requests/backend-axios-instance";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1024mb' // Set desired value here
        }
    }
}

export default async function handler(req, res) {
    if (req.method === API_METHODS.POST) {
        const formData = req.body;
        if (formData.token !== undefined) {
            try {
                await backendAxiosInstance.post(API_URL.REFRESH_TOKEN, formData).then(response => {
                    res.status(200).json(response.data);
                }).catch(e => res.status(500).json(e.response?.data))

            } catch (e) {
                res.status(500).json(e.message);
            }
        } else {
            res.status(400).json({message: 'No body found!'})
        }
    } else {
        res.status(404).json({message: 'path not found!'});
    }
}