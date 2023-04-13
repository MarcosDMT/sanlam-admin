import { API_METHODS, API_URL } from "../../../utils/api-endpoints";
import { backendAxiosInstance } from "../../../api-requests/backend-axios-instance";

const SimpleCrypto = require("simple-crypto-js").default;
const secretKey = new SimpleCrypto(process.env.NEXT_PUBLIC_ENCRYPTION_KEY);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1024mb", // Set desired value here
    },
  },
};

export default async function handler(req, res) {
  if (req.method === API_METHODS.POST) {
    const body = req.body;
    if (body.data !== undefined) {
      try {
        const formData = secretKey.decrypt(body.data);
        await backendAxiosInstance
          .post(API_URL.LOGIN, formData)
          .then((response) => {
            console.log("RESPONSE ", response.data)
            res.status(response.status).json(secretKey.encrypt(response.data));
          })
          .catch((e) =>
            res.status(e?.response?.status ?? 500).json(e.response?.data)
          );
      } catch (e) {
        res.status(500).json(e.message);
      }
    } else {
      res.status(400).json({ message: "No body found!" });
    }
  } else {
    res.status(404).json({ message: "path not found!" });
  }
}
