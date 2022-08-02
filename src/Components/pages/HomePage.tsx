import React, { FC, useState } from 'react'
import { Layout } from 'antd'
import { INetType, NetInputForm } from '../Forms/NetInputForm';


const { Content } = Layout;
type HomePageProps = {
    children?: React.ReactNode[] | string
}


export interface INet {
    w: string
    h: string
    type?: INetType
}

export const HomePage: FC<HomePageProps> = () => {

    const [netlist, setNetlist] = useState<INet[]>([])
    const ADD = (net: INet) => {
        return setNetlist([net, ...netlist])
    }



    return (
        <div></div>
    )
}
