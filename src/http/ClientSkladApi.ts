// import { $api } from "."
// import { ISklad } from "../types/IServerData"
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

export const getProdInfos = async () => {
    const API = fetchApi(PATHS.WHINFO)
    const infos = await API.fetchAll() as WhInfo
    return infos
}


// export const editOGO = async ({ form_type, form_sklad, form_shop }: any, sklad_item: ISklad) => {
//     const { id, type, shop } = sklad_item
//     const editType = await $api.put(`/api/type/${type.id}/s`, form_type)
//     const editSklad = await $api.put(`api/sklad/${id}/s`, form_sklad)
//     const editShop = await $api.put(`api/shop/${shop?.id}/s`, form_shop)
//     // const editSklad = await $api.put(`/api/sklad/${id}/s`, form_sklad)
//     // const editShop = await $api.put(`/api/shop/${shop?.id}/s`, form_shop)
//     // const editType = await $api.put(`api/type/${typeId}`, typedata)
//     // const editSklad = await $api.put(`api/sklad/${id}`, skladdata)
//     // const editShop = await $api.put(`api/shop/${typeId}`, shopdata)
//     return { editSklad, editType, editShop }
// }