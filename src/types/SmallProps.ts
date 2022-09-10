import { StrNum } from "./WarehouseTypes"

export interface WH_BaseProps {
    readonly id: number
    type: string
    price: StrNum
    quant: StrNum
}

export interface WH_ImgProps {
    img_main: string
    img_sec: string
    img_main_new?: string
    img_main_sec?: string
}

export interface WH_FileProps {
    file_main: Blob
    file_sec: Blob

}

export interface WH_EditProp {
    type_new?: string
    price_new?: StrNum
    quant_new?: StrNum
}

