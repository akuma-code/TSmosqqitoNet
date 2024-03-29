

export interface ISklad {
    id: number
    quant?: number | string
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
    secondaryImg: string,
    infos: ITypeInfo[]
}

export interface ITypeInfo {
    id: number
    desc: string
}

export interface IShop {
    id: number
    price: number | string
    title: string
}

export enum PATHS {
    SKLAD = 'sklad',
    SHOP = 'shop',
    PROD = 'prod',
    TYPE = 'type',
    OFFERS = 'offers',
    WAREHOUSE = 'sklad/wh',
    WHINFO = 'whinfo',
    SETTINGS = 'settings'
}

export enum HOSTURL {
    LOCALHOST = 'http://localhost:5000',
    HOME = 'http://akumapc:5000',
    WORK = 'http://prodnyan:5000',
    CKO3 = 'http://cko3:5000'
}