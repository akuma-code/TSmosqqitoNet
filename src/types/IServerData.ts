

export interface ISklad {
    id: number
    quant?: number
    type: IType
    typeId?: string
    shop?: IShop
    shopId?: string
    prods?: any[]

}
export interface IType {
    id: number
    name: string
    img: string
    secondaryImg?: string,
    infos: ITypeInfo[]
}

export interface ITypeInfo {
    id: number
    desc: string
}

export interface IShop {
    id: number
    price: number
    title: string
}

export enum PATHS {
    SKLAD = 'sklad',
    SHOP = 'shop',
    PROD = 'prod',
    TYPE = 'type',
    OFFER = 'offer'
}