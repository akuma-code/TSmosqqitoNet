import axios from "axios"
import { HOSTURL } from "../types/IServerData"


// const url_path = localStorage.getItem('server_url') || HOSTURL.LOCALHOST

// export const $api = axios.create({
//     baseURL: url_path
// })

const savedurl = localStorage.getItem('server_url')
savedurl ?? console.log("sever: ", savedurl)
export const $api = axios.create({
    baseURL: savedurl ?? HOSTURL.WORK
})




// function getUrl(arr: typeof urlarray) {
//     const api = (base_url: HOSTURL) => axios.create({
//         baseURL: base_url
//     })
//     const testApi = async (path: HOSTURL) => {
//         const { data } = await api(path).get(`api/settings/get_host`)
//         return data
//     }
//     const result = []
//     const resUrl = { url: "" }
//     for (let i = 0; i < arr.length; i++) {
//         try {
//             const data = testApi(arr[i]).then(data => resUrl.url = data)

//             result.push(arr[i])
//             return data
//         } catch {
//             continue
//         }
//     }
//     console.log("Result: ", result[0]);
//     console.log('resUrl: ', resUrl)
//     return resUrl

// }

// const base_url = getUrl(urlarray)
// console.log('base_url', base_url)

