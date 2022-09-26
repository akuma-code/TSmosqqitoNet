import { HOSTURL } from "../types/IServerData";



export const useHostUrl = (url: HOSTURL | null = null) => {
    const saved_url = localStorage.getItem('server_url') || ""
    if (saved_url) return saved_url
    if (url) {
        localStorage.setItem('server_url', url)

        return url
    }

}