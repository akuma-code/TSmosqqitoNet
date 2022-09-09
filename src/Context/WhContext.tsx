import React, { useContext, useState } from 'react'
import { StrNum } from '../types/WarehouseTypes'

export interface ContextDataType {
    typename?: string
    price?: StrNum
    quant?: StrNum
    typename_new?: string
    price_new?: StrNum
    quant_new?: StrNum

}

const InitialValue = {
    typename: "",
    price: "",
    quant: "",
    formdata: {},
    setFormdata: null
}

export interface IWhContext {
    formdata: ContextDataType
    setFormdata(): void
    children?: React.ReactNode
}

export const ContextWarehouse = React.createContext<ContextDataType | null>(null)

export const WhProvider = ({ children }: any) => {
    const [state, setState] = useState<ContextDataType & {}>({} as ContextDataType)

}

export const useWhContext = () => useContext(ContextWarehouse)


