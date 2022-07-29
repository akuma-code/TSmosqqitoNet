/* eslint-disable @typescript-eslint/no-unused-vars */

export enum IFetchDataType {
    MAP = "map",
    NORM = "normal"
}
type fetchVar = 'map' | 'normal'

export interface IOptionsProps {
    type: IFetchDataType
}

export interface ISklad {
    id?: number | string
    quant: number
    type: IType | null
    typeId: string
    shop?: IShop[] | null
    shopId?: string
    prods?: any[] | null

}
export interface IType {
    id: number | string
    name: string
    img: string
    infos: ITypeInfo[]
}

export interface ITypeInfo {
    id: number | string
    desc: string
}

export interface IShop {
    id: number | string
    price: number
    title: string
}



export interface IFetchSKLAD {
    count: number
    rows: ISklad[]
}


const item = {
    "id": 50,
    "quant": -14,
    "typeId": 16,
    "type": {
        "id": 16,
        "name": "ОК-1",
        "img": "c537dbea-f200-420d-9eb6-5426f24b93e7.jpg",
        "info": []
    },
    "shop": {
        "id": 71,
        "price": 4500,
        "title": "ВХС Фрамуга",
        "skladId": 50
    },
    "prods": [
        {
            "id": 33,
            "number": 2,
            "dateReady": "2022-07-27",
            "isReady": true,
            "prodQuery": {
                "id": 33,
                "prodId": 33,
                "skladId": 50
            }
        },
        {
            "id": 37,
            "number": 4,
            "dateReady": "2022-08-04",
            "isReady": false,
            "prodQuery": {
                "id": 37,
                "prodId": 37,
                "skladId": 50
            }
        },
        {
            "id": 38,
            "number": 1,
            "dateReady": "2022-08-31",
            "isReady": false,
            "prodQuery": {
                "id": 38,
                "prodId": 38,
                "skladId": 50
            }
        }
    ]
}