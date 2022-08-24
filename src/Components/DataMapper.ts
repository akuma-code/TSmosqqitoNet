import { ISklad } from '../types/IServerData'
type IFetchSklad = {
    count: number,
    rows: ISklad[]
}

export function StateMapper(fetchedData: IFetchSklad): ISklad[] {
    const map = new Map();

    const getID = (item: ISklad): void => {
        const id = item.id
        id && map.set(id, item)
    }

    const savedata = (data: IFetchSklad) => data.rows.map(getID)
    savedata(fetchedData)

    return Object.fromEntries(map)
}







