/* eslint-disable react-hooks/exhaustive-deps */
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { HOSTURL, PATHS } from "../types/IServerData";

const savedurl = localStorage.getItem('server_url')
savedurl ?? console.log("sever: ", savedurl)
export const $api = axios.create({
    baseURL: savedurl ?? HOSTURL.WORK
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchApi = (path: string) => {

    const fetchAll = async <T>(): Promise<T> => {
        const { data } = await $api.get(`api/${path}`)
        return data.rows
    }
    const create = async <T>(item: T): Promise<T> => {
        const { data } = await $api.post(`api/${path}`, item)
        console.log('Created item: ', data)
        return data
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

    const copySklad = async (skladId: number | string) => {
        const { data } = await $api.post(`api/sklad/wh/${skladId}/copy`)
        return data
    }

    const remove = async (id: number) => {
        if (!id) return await $api.delete(`api/${path}/del`)
        const { data } = await $api.delete(`api/${path}/${id}/del`)
        console.log('removed data: ', data)
        return data
    }
    // console.log("APIFUNC", fetchAll());

    return { fetchAll, fetchOne, edit, copySklad, remove, create } as const

}
export const useFetchApi = <T>(path: PATHS) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setFetchedData] = useState<T[]>([])
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

    return [data, setFetchedData, isLoading, error] as const
}