/* eslint-disable @typescript-eslint/no-unused-vars */

export enum IFetchDataType {
    MAP = "map",
    NORM = "normal"
}
type fetchVar = 'map' | 'normal'

export interface IOptionsProps {
    type: IFetchDataType
}

