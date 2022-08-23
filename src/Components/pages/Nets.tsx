import React, { FC, useEffect, useState } from 'react'
import { useCalcNet, useStateCalcNet } from '../../hooks/useCalcNet';
import { INetListProps } from '../../types/props';
import { ListContainer } from '../Cards/ListContainer';
import NetCard from '../Cards/NetCard';
import { NetInputForm, newNetType } from '../Forms/NetInputForm';


type NetsPageProps = {
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

const isBigger = (size: string | number): boolean => {
    if (typeof size === 'string') size = parseInt(size, 10)
    return size > 1570 ? true : false
}

export const Nets: FC<NetsPageProps> = () => {

    const [netlist, setNetlist] = useState<newNetType[]>(getFromLS())

    // eslint-disable-next-line react-hooks/rules-of-hooks


    const ADD = (net: newNetType) => {
        // if (isBigger(net.w) && isBigger(net.h)) return alert("Один из размеров не должен привышать 1570")
        return setNetlist(netlist => [...netlist, net])
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
            {/* <div className='col s8'> */}
            <ListContainer>
                {netlist.map((net, idx) => (
                    <NetCard {...net} remove={remove} key={idx} />
                ))}
            </ListContainer>
            {/* </div> */}
        </div>

    )
}
