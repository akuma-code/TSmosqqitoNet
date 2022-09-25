import { IWarehouse, StrNum } from "./WarehouseTypes"

export type Partial<T> = {
    [P in keyof T]?: T[P]
}
export type Required<T> = {
    [P in keyof T]-?: T[P]
}
export type Pick<T, Key extends keyof T> = {
    [P in Key]: T[P]
}

export interface BaseProps {
    readonly id: number
    typename: string
    price: StrNum
    quant: StrNum
}


export type EditBaseProps = Partial<BaseProps>
export type reqEditProps = Required<EditProp>
export type EditFields = Pick<BaseProps, 'typename' | 'price' | 'quant'>
export interface ImgProps {
    img_main: string
    img_sec: string
    img_main_new?: string
    img_main_sec?: string
}

export interface FileProps {
    file_main: Blob
    file_sec: Blob

}

export interface EditProp {
    type_new?: string
    price_new?: StrNum
    quant_new?: StrNum
}

export interface IActiveItem {
    item: IWarehouse
}

export interface WhInfo {
    count: StrNum,
    dateReady: string,
    warehouseId: StrNum,
    quant: StrNum,
    status: 'inProduction' | 'Ready',
    isRestored?: boolean,
    id: string
}