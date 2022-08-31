import axios from "axios"
import { HOSTURL } from "../types/IServerData"
const getURL = () => {
    const saved_url = localStorage.getItem('server_url') || HOSTURL.WORK
    // console.log("Server Url: ", saved_url);
    return saved_url
}
export const $api = axios.create({
    baseURL: getURL()
})

