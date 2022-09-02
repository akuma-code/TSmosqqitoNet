import React from "react"
import { ISklad } from "./IServerData"

export interface ISkladForm {
    id: number | string
    quant: string | Blob | any
    typeId: string
    shopId: string
}

export interface ITypeForm {
    id: number | string
    name: string | Blob
    img: string | Blob
    secondaryImg: string | Blob | any
    infos?: any[]
}

export interface IShopForm {
    id: number
    title?: string
    price: any
}

export interface IFiles {
    file_main: {} & Blob
    file_sec: {} & Blob
    src_main: string
    src_second: string
}
export interface IWarehouse extends ISklad {
    id: number & string
    quant: number
    typename: string
    img_main: string
    img_sec: string
    price: number
    file_main?: Blob
    file_sec?: Blob
}

export interface IWarehouseForm extends IWarehouse {
    img_main: string
    img_sec: string
    file_main?: Blob
    file_sec?: Blob
}

