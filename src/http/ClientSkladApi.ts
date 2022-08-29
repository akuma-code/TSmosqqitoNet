import axios from "axios";

import { HOSTURL } from "../types/DataTypes";
import { ISklad } from "../types/IServerData";
export const getURL = () => {
    const saved_url = localStorage.getItem('server_url') || HOSTURL.LOCALHOST
    // console.log("Server Url: ", saved_url);
    return saved_url
}
const $api = axios.create({
    baseURL: getURL()
})

interface IApiSklad {
    warehouse: ISklad[]
    path?: string
}

class ClientSkladApi implements IApiSklad {
    warehouse: []
    path?: string

    constructor() {
        this.warehouse = []

        // this.initial = this.fetchApi('sklad').fetchAll().then(data => this.warehouse.push(data))
    }

    fetchApi(path: string) {

        const fetchAll = async () => {
            const { data } = await $api.get(`api/${path}`)
            console.log('fetchApiData:', data)
            return data.rows
        }
        const fetchOne = async (id: number) => {
            const { data } = await $api.get(`api/${path}/${id}`)
            console.log('fetchOneApiData:', data)
            return data
        }
        console.log("APIFUNC", fetchAll());

        return { fetchAll, fetchOne }

    }
}

export const API = new ClientSkladApi().fetchApi('sklad')
