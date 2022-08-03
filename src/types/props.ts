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
    remove: (id: number) => void
}