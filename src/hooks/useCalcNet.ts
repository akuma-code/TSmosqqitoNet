import { useEffect, useState } from "react"
import { newNetType } from "../Components/Forms/NetInputForm"

type IDeltaNet = {
    skf: { dw: number, dh: number }
    simple: { dw: number, dh: number }
}
type INet = {
    W: number,
    H: number
}
type INetResult = {
    skf: { W: number, H: number, isForbidden: boolean }
    simple: { W: number, H: number, isForbidden: boolean }

}

export type INetsObject = {
    skf: { W: number, H: number, isForbidden: boolean }
    simple: { W: number, H: number, isForbidden: boolean }
}
const isBigger = (size: string | number): boolean => {
    if (typeof size === 'string') size = parseInt(size, 10)
    return size > 1570 ? true : false
}



export const useCalcNet = (w: string, h: string): INetResult => {


    const delta: IDeltaNet = {
        skf: { dw: -45, dh: -47 },
        simple: { dw: 24, dh: 45 }
    }
    const Numb = (s: string) => parseInt(s, 10)
    const nets = {
        skf: { W: Numb(w + delta.skf.dw), H: Numb(h + delta.skf.dh) },
        simple: { W: Numb(w + delta.simple.dw), H: Numb(h + delta.simple.dh) }
    }
    const isForb = (net: INet) => {
        if (isBigger(net.W) && isBigger(net.H)) return { ...net, isForbidden: true }
        return { ...net, isForbidden: false }
    }
    const NETS = {
        simple: isForb(nets.simple),
        skf: isForb(nets.skf)
    }

    return NETS
}

export const useStateCalcNet = (list: newNetType[]): [INetsObject[]] => {

    const delta: IDeltaNet = {
        skf: { dw: -45, dh: -47 },
        simple: { dw: 24, dh: 45 }
    }
    const N = (s: string) => parseInt(s, 10)

    const CalcNetSize = {
        skf: (w: string, h: string): INet => ({ W: N(w + delta.skf.dw), H: N(h + delta.skf.dh) }),
        simple: (w: string, h: string): INet => ({ W: N(w + delta.simple.dw), H: N(h + delta.simple.dh) })
    }

    const AddIsForb = (net: INet) => {
        if (isBigger(net.W) && isBigger(net.H)) return { ...net, isForbidden: true }
        return { ...net, isForbidden: false }
    }

    const NETS = (net: newNetType): INetsObject => ({
        simple: AddIsForb(CalcNetSize.simple(net.w, net.h)),
        skf: AddIsForb(CalcNetSize.skf(net.w, net.h))
    })
    const getNetsSizes = (newnet: newNetType[]) => newnet.map(NETS)

    const [netsList, setNetsList] = useState<INetsObject[]>([])
    useEffect(() => {
        setNetsList(getNetsSizes(list))
    }, [list])



    return [netsList]
}