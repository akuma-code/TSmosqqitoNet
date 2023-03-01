import axios from "axios"
import { HOSTURL } from "../types/IServerData"
const urlarray = [HOSTURL.HOME, HOSTURL.WORK, HOSTURL.CKO3, HOSTURL.LOCALHOST]
function getUrl(arr: typeof urlarray) {
    const api = (base_url: HOSTURL) => axios.create({
        baseURL: base_url
    })
    const testApi = async (path: HOSTURL) => {
        const { data } = await api(path).get(`api/offers`)
        return data
    }
    const result = []
    for (let i = 0; i < arr.length; i++) {
        try {
            const data = testApi(arr[i])
            result.push(arr[i])
        } catch {
            continue
        }
    }
    console.log("Result: ", result[0]);
    return result[0]

}

// const base_url = getUrl(urlarray)



export const $api = axios.create({
    baseURL: HOSTURL.HOME
})
