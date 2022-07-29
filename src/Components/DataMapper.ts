import { IFetchSKLAD, IOptionsProps, ISklad } from "../types/DataTypes";
import axios from 'axios'



export function StateMapper(fetchedData: IFetchSKLAD): ISklad[] {
    const map = new Map();

    const getID = (item: ISklad): void => {
        const id = `${item.id}`
        id && map.set(id, item)
    }

    const savedata = (data: IFetchSKLAD) => data.rows.map(getID)
    savedata(fetchedData)

    return Object.fromEntries(map)
}



const $host = axios.create({
    baseURL: 'http://localhost:5000'
    // baseURL: process.env.REACT_APP_API_URL
})

export const fetchData = async (path: string, options: IOptionsProps | null = null) => {
    const { data } = await $host.get(path)
    if (!options) return console.log('noOptions')
    if (options.type === 'map') return StateMapper(data)
    return data.rows
}






