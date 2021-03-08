import axios from "axios";
const env = process.env;
export default axios.create({
  baseURL: `${env.REACT_APP_PROTOCOL}://${env.REACT_APP_UPLOAD_SERVER}:${env.REACT_APP_UPLOAD_SERVER_PORT}`,
  headers: {
    "Content-type": "application/json"
  }
});
