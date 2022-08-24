import axios from "axios";
import { ISklad } from "../types/IServerData";

const $api = axios.create({
    baseURL: 'http://localhost:5000'
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
