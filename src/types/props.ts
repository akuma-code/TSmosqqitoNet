export interface ICardProps {
    bordered?: boolean;
    width?: string;
    title?: string;
    text?: string

}

export interface INetListProps {
    w: string
    h: string
    type?: INetType
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