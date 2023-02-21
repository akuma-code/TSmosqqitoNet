import axios from "axios"
import { HOSTURL } from "../types/IServerData"


export const $api = axios.create({
    baseURL: HOSTURL.CKO3
})
