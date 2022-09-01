import { $api } from "."
import { IWarehouse } from "../Components/pages/PageTesting"
import { ISklad } from "../types/IServerData"
import { fetchApi } from "./useFetchApi"

export const editOGO = async ({ form_type, form_sklad, form_shop }: any, sklad_item: ISklad) => {
    const { id, type, shop } = sklad_item
    const editType = await $api.put(`/api/type/${type.id}/s`, form_type)
    const editSklad = await $api.put(`api/sklad/${id}/s`, form_sklad)
    const editShop = await $api.put(`api/shop/${shop?.id}/s`, form_shop)
    // const editSklad = await $api.put(`/api/sklad/${id}/s`, form_sklad)
    // const editShop = await $api.put(`/api/shop/${shop?.id}/s`, form_shop)
    // const editType = await $api.put(`api/type/${typeId}`, typedata)
    // const editSklad = await $api.put(`api/sklad/${id}`, skladdata)
    // const editShop = await $api.put(`api/shop/${typeId}`, shopdata)
    return { editSklad, editType, editShop }
}

export const editWarehouse = async (form_wh: any, activeItem: IWarehouse) => {
    const { id } = activeItem
    const fetchWH = fetchApi('/sklad/wh')
    const item = await fetchWH.edit(id, form_wh)
    return item
}