export interface ICardProps {
    bordered?: boolean;
    width?: string;
    title?: string;
    text?: string

}

export interface INetListProps {
    w: string
    h: string
    isSimple: boolean
    id: number
    remove?: (id: number) => void
    isForbidden: boolean

}

export type INetInputProps = {
    value?: ISizes
    onChange?: (value: ISizes) => void
    ADD: (net: INetListProps) => void
}

export type ISizes = {
    w: string
    h: string
}

export type INetType = 'skf' | 'simple' | string

export interface INetCardProps {
    w: string
    h: string
    id: number
    isSimple: boolean
    isForbidden?: boolean
    remove: (id: number) => void
}
export type ITodoNote = {
    note: string
}
export type ITodoPayment = {
    sum: string | number
    info: string
    numb?: number
}

export enum TodoInputType {
    NOTES = 'notes',
    CASH = 'cash',
    CHECKED = 'checked'
}
export type TDItype = 'notes' | 'cash'
export type ITodoFormTypes = { type: TDItype }
export interface ITodoFormProps {
    type: 'notes' | 'cash'
    value?: ITodoNote | ITodoPayment

    ADD: (todo: { text: string, numb: number, checked: boolean, type: string | TDItype }) => void
    getData?: (data: ITodoNote | { sum: string, info: string }) => void,
    onChange?: (value: ITodoNote | ITodoPayment) => void
    children?: React.ReactNode

}

export interface ITodoFormData {
    notes?: ITodoNote[] | [] | null,
    payments?: ITodoPayment[] | [] | null
}

export interface ITodoItem {
    numb: number,
    text: string,
    checked: boolean,
    type: string,
    date?: string,
    // remove?: (numb: number) => void

}

export interface ITodoListItem {
    numb: number,
    text: string,
    checked: boolean,
    type: string,
    idx: number,
    rem: (numb: number) => void
    check?: (isCheck: boolean) => void,
    reverse?: () => void
    children?: React.ReactNode
}