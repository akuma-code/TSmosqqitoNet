
type ISide = 'top' | 'bot' | 'left' | 'right'
type IFrameType = 'rama' | 'imp' | 'stv_imp' | 'stv_rama' | 'stv232_rama' | string
type IFrameState = 'stv' | 'fix' | 'shtulp' | 'stv232'


interface IFrame {
    top: IFrameType,
    bot: IFrameType,
    left: IFrameType,
    right: IFrameType,
    state: IFrameState,
    posNumb?: number,
    id?: number
    row?: number,
    title?: string
    fSize?: {
        w: number,
        h: number
    }
}
interface ISize {
    H: number,
    W: number,
}

export interface IRamaType {
    frames: IFrame[]
    size?: ISize
}

type IFrameStateFields = Pick<IFrame, 'bot' | 'left' | 'right' | 'top' | 'state'>



export function Convert(frame: IFrame) {

    const toSTV = (value: IFrameType) => {

        switch (value) {
            case 'rama':
                value = 'stv_rama'
                break;
            case 'imp':
                value = 'stv-imp'
                break;
            case 'fix':
                value = 'stv'
                break;
            case 'shtulp':
                value = 'stv'
                break;
            default: return value
        }
        return value
    }
    const toFix = (value: IFrameType) => {
        switch (value) {
            case 'stv_rama':
                value = 'rama'
                break;
            case 'stv_imp':
                value = 'imp'
                break;
            case 'shtulp_imp':
                value = 'imp'
                break;
            case 'stv':
                value = 'fix'
                break;
            case 'shtulp':
                value = 'fix'
                break;
            default: return value
        }
        return value
    }
    const toShtulp = (value: IFrameType) => {
        switch (value) {
            case 'rama':
                value = 'stv_rama'
                break;
            case 'stv_imp':
                value = 'shtulp_imp'
                break;
            case 'imp':
                value = 'shtulp_imp'
                break;
            case 'fix':
                value = 'shtulp'
                break;
            case 'stv':
                value = 'shtulp'
                break;
            default: return value
        }
        return value
    }


    const STV = Object.entries(frame).reduce((obj, [k, v]) => ({ ...obj, [k]: toSTV(v) }), {})
    const FIX = Object.entries(frame).reduce((obj, [k, v]) => ({ ...obj, [k]: toFix(v) }), {})
    const SHTULP = Object.entries(frame).reduce((obj, [k, v]) => ({ ...obj, [k]: toShtulp(v) }), {})
    return { STV, FIX, SHTULP }

}

