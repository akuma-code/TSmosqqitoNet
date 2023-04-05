import axios, { AxiosError } from "axios";
import { OfferListData } from "../Components/OfferNotes/OfferTypes";
import { HOSTURL, PATHS } from "../types/IServerData";

const url_path = localStorage.getItem('server_url') || HOSTURL.LOCALHOST

const $api = axios.create({
    baseURL: url_path
})

export const OffersApi = {



    async getAll() {
        const { data } = await $api.get(`api/offers`)
        return data
    },

    async create<T>(item: T): Promise<T> {
        try {
            const { data } = await $api.post(`api/${PATHS.OFFERS}`, item)
            console.log('$API: Created offer: ', data)
            return data
        } catch (error: unknown) {
            if (error instanceof AxiosError) console.log(error.message)
            return item
        }
    },
    async createList<T>(items: T[]): Promise<T[]> {
        const { data } = await $api.post(`api/${PATHS.OFFERS}/list`, items)
        console.log('$API: Created offers list: ', data)
        return data
    },
    async getOne(id: string) {
        const { data } = await $api.get(`api/${PATHS.OFFERS}/${id}`)
        console.log('$API: fetchOne:', data)
        return data
    },

    async edit(id: string, newdata: any) {
        const { data } = await $api.put(`api/${PATHS.OFFERS}/${id}`, newdata)
        return data
    },

    async remove(id: string) {
        const { data } = await $api.delete(`api/${PATHS.OFFERS}/${id}/delete`)
        console.log('$API: removed data: ', data)
        return data
    },
    async removeAll() {
        await $api.delete(`api/${PATHS.OFFERS}/delete`)
        console.log('$API: removed all offers')
    },

    async removeList(status: OfferListData['status']) {
        const data = await $api.delete(`api/${PATHS.OFFERS}/delete/${status}`)
        console.log('$API: removed offers by status ', status)
        return data
    },


}



