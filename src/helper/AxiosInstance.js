import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: "https://appapi.makerdog.ai", //"http://44.203.54.245:5000" //"http://localhost:5000"
});

export default AxiosInstance