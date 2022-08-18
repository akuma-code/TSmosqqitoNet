import React, { FC, useEffect, useState } from 'react'
import { INetListProps } from '../../types/props';
import NetCard from '../Cards/NetCard';
import { NetInputForm } from '../Forms/NetInputForm';


type HomePageProps = {
    children?: React.ReactNode[] | string
}

const getFromLS = (): INetListProps[] => {
    const saved = JSON.parse(localStorage.getItem('saved_nets') || '[]')
    return saved
}
const saveToLS = (netlist: INetListProps[]) => {
    const saved = JSON.stringify(netlist)
    return localStorage.setItem('saved_nets', saved)
}

export const HomePage: FC<HomePageProps> = () => {

    const [netlist, setNetlist] = useState<INetListProps[]>(getFromLS())
    const ADD = (net: INetListProps) => {
        return setNetlist(netlist => [net, ...netlist])
    }
    const reset = () => setNetlist([])
    const remove = (id: number) => setNetlist(netlist => netlist.filter(n => n.id !== id))
    useEffect(() => {
        saveToLS(netlist)

    }, [netlist])


    return (

        <div className='col container'>
            <h4 className='center'>Расчет М\С по световому проему</h4>
            <div className='flex-row'>
                <NetInputForm ADD={ADD} />
                <button className="material-icons red darken-4 black-text mx1 reset-btn"
                    onClick={reset}
                >delete
                </button>
            </div>
            <div className='col s3'>
                {netlist.map(net => (
                    <NetCard {...net} key={net.id} remove={() => remove(net.id)} />
                ))}
            </div>
        </div>

    )
}
