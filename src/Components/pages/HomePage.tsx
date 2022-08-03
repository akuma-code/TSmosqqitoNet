import React, { FC, useState } from 'react'
import { INetListProps } from '../../types/props';
import { NetInputForm } from '../Forms/NetInputForm';


type HomePageProps = {
    children?: React.ReactNode[] | string
}




export const HomePage: FC<HomePageProps> = () => {

    const [netlist, setNetlist] = useState<INetListProps[]>([])
    const ADD = (net: INetListProps) => {
        return setNetlist([net, ...netlist])
    }



    return (
        <>
            <div>
                <div>
                    <NetInputForm ADD={ADD} />
                </div>
                <div>
                    listoutput
                </div>
            </div>
        </>
    )
}
