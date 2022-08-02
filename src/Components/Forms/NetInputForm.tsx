import React, { useState } from 'react'
import { INet } from '../pages/HomePage'

type ISizes = {
    w: string
    h: string
}
export type INetType = 'skf' | 'simple' | string
// type NetTypeProps = {
//     value?: INetType
//     onChange?: (value: INetType) => void
// }
type INetInputProps = {
    value?: ISizes
    onChange?: (value: ISizes) => void
    ADD: (net: INet) => void
}


export const NetInputForm: React.FC<INetInputProps> = ({ value = { w: "0", h: "0" }, ADD }) => {

    const [size, setSize] = useState<ISizes>({ w: "", h: "" })
    const [typeNet, setTypeNet] = useState<string>("skf")



    const changeSize = (e: React.ChangeEvent<HTMLInputElement>, s: 'w' | 'h') => {
        const newSize = parseInt(e.target.value || '0', 10)
        setSize({ ...size, [s]: newSize })
    }
    const changeType = (value: string) => {
        setTypeNet(value)
    }
    const submitHandler = (): void => {
        const newnet: INet = { w: size.w || "0", h: size.h || "0", type: typeNet || "skf" }
        console.log('newnet', newnet)
        ADD(newnet)
    }
    return (
        <div></div>
    )
}

