type IDeltaNet = {
    skf: { dw: number, dh: number }
    simple: { dw: number, dh: number }
}
type INetResult = {
    skf: { W: number, H: number }
    simple: { W: number, H: number }
}

export const useCalcNet = (w: string, h: string): INetResult => {
    const delta: IDeltaNet = {
        skf: { dw: -45, dh: -47 },
        simple: { dw: 24, dh: 45 }
    }
    const calc = (type: 'skf' | 'simple') => ({ W: parseInt(w, 10) + delta[type].dw, H: parseInt(h, 10) + delta[type].dh })

    return { simple: calc('simple'), skf: calc('skf') }
}