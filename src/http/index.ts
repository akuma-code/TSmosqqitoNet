import axios from "axios"
import { HOSTURL } from "../types/IServerData"
import { getURL } from "./useFetchApi"


export const $api = axios.create({
    baseURL: getURL()
})

