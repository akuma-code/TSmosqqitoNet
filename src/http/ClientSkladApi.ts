
import { $api } from "."
import { PATHS } from "../types/IServerData"
import { IWarehouse } from "../types/WarehouseTypes"
import { WhInfo } from "../types/WHTypes"
import { fetchApi } from "./useFetchApi"

export const editWarehouse = async (form_wh: any, activeItem: IWarehouse) => {
    const { id } = activeItem
    const fetchWH = fetchApi('/sklad/wh')
    const item = await fetchWH.edit(id, form_wh)
    return item
}

export const createWhItem = async (item_form: any) => {
    const WhAPI = fetchApi('/sklad/wh')
    const item = await WhAPI.create(item_form)
    return item
}

export const deleteWhItem = async (id: number) => {
    const WhAPI = fetchApi('/sklad/wh')
    const item = await WhAPI.remove(id)
    return item
}

export const addProdTask = async (task_form: any) => {
    const WhAPI = fetchApi('/whinfo/start')
    const item = await WhAPI.create(task_form) as WhInfo
    return item
}
export const FinProdTask = async (id: string) => {
    const API = $api.put(`api/${PATHS.WHINFO}/${id}/fin`)
    return API
}
export const RunAutoCompleteTasks = async (days: number) => {

    return await $api.post(`api/${PATHS.WHINFO}/autocomplete/` + days)
}

export const FinishTaskAndRestore = async (id: string) => {
    const { data } = await $api.put(`api/${PATHS.WHINFO}/${id}/fin_and_res`)
    return data
}
export const StartTaskAndRemove = async (task_form: any) => {
    const WhAPI = fetchApi('/whinfo/start_and_remove')
    const item = await WhAPI.create(task_form) as WhInfo
    return item
}
export const getProdInfos = async () => {
    const API = fetchApi(PATHS.WHINFO)
    const infos = await API.fetchAll() as WhInfo
    return infos
}

export const CleanUpTasks = async () => {
    const { data } = await $api.delete(`api/${PATHS.WHINFO}/clean`)
    return data
}
