/* eslint-disable react-hooks/exhaustive-deps */
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ISklad, PATHS } from "../types/IServerData";

const $api = axios.create({
    baseURL: 'http://akumapc:5000'
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchApi = (path: string) => {

    const fetchAll = async () => {
        const { data } = await $api.get(`api/${path}`)
        // console.log('fetchApiData:', data)
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
export const useFetchApi = (path: PATHS, id?: number) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setFetchedData] = useState<ISklad[]>([])
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



    return { data, isLoading, error }
}