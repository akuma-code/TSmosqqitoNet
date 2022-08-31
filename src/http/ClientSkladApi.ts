import { $api } from "."

export const editOGO = async (ogoFormData: any) => {
    const { id, typeId, name, img, secondaryImg, price, quant } = ogoFormData
    const typedata = { name, img, secondaryImg, typeId }
    const shopdata = { price }
    const skladdata = { id, quant }
    await console.log({ typedata, skladdata, shopdata });
    $api.put('/api/fulledit/', typedata)
    // const editType = await $api.put(`api/type/${typeId}`, typedata)
    // const editSklad = await $api.put(`api/sklad/${id}`, skladdata)
    // const editShop = await $api.put(`api/shop/${typeId}`, shopdata)
    // return { editSklad, editType, editShop }
}