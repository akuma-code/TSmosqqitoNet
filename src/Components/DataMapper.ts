import { IFetchSKLAD, ISklad } from "../types/DataTypes";
import axios from 'axios'


const $host = axios.create({
    baseURL: 'http://localhost:5000'
    // baseURL: process.env.REACT_APP_API_URL
})

export const fetchSklad = async () => {
    const { data } = await $host.get('api/sklad')
    return data
}

export function useStateMapper(fetchedData: IFetchSKLAD): ISklad[] {
    const map = new Map();
    const getID = (item: ISklad): void => {
        const id = `${item.id}`

        id && map.set(id, item)
    }
    const savedata = (data: IFetchSKLAD) => data.rows.map(getID)
    savedata(fetchedData)

    return Object.fromEntries(map)
}


export async function test() {
    const t = await fetchSklad().then(data => useStateMapper(data))
    const tt = await fetchSklad()

    console.log("tt", tt);

}

