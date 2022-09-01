/* eslint-disable react-hooks/exhaustive-deps */
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IWarehouse } from "../Components/pages/PageTesting";
import { HOSTURL, PATHS } from "../types/IServerData";

export const getURL = () => {
    const saved_url = localStorage.getItem('server_url') || HOSTURL.WORK
    // console.log("Server Url: ", saved_url);
    return saved_url
}
const $api = axios.create({
    baseURL: getURL()
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchApi = (path: string) => {

    const fetchAll = async () => {
        const { data } = await $api.get(`api/${path}`)
        return data.rows
    }
    const fetchOne = async (id: number) => {
        const { data } = await $api.get(`api/${path}/${id}`)
        console.log('fetchOneApiData:', data)
        return data
    }

    const edit = async (id: number, newdata: any) => {
        const { data } = await $api.put(`api/${path}/${id}`, newdata)
        return data
    }

    const copySklad = async (skladId: number) => {
        const { data } = await $api.post(`api/sklad/${skladId}/copy`)
        return data
    }

    const remove = async (id: number) => {
        if (!id) return await $api.delete(`api/${path}/del`)
        const { data } = await $api.delete(`api/${path}/${id}/del`)
        console.log('removed data: ', data)
        return data
    }
    // console.log("APIFUNC", fetchAll());

    return { fetchAll, fetchOne, edit, copySklad, remove }

}
export const useFetchApi = (path: PATHS, id?: number) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setFetchedData] = useState<any[]>([])
    const [error, setError] = useState("")

    const fetchAll = async () => {
        const { data } = await $api.get(`api/${path}`)
        return data.rows
    }


    useEffect(() => {
        setIsLoading(true);

        (async () => {
            try {
                setFetchedData(await fetchAll())
                setIsLoading(false)
            } catch (e: unknown) {
                const error = e as AxiosError
                console.log('fetchApiData ERROR!', error)
                setFetchedData([])
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        })()

    }, [])

    // const result: [IWarehouse[], boolean, string] = [data, isLoading, error]

    return [data, isLoading, error] as const
}