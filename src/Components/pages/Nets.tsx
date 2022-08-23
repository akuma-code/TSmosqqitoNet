import React, { FC, useEffect, useState } from 'react'
import { useStateCalcNet } from '../../hooks/useCalcNet';
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


export const Nets: FC<NetsPageProps> = () => {

    const [netlist, setNetlist] = useState<newNetType[]>(getFromLS())
    const [hookList] = useStateCalcNet(netlist)


    const ADD = (net: newNetType) => setNetlist(netlist => [...netlist, net])
    const reset = () => setNetlist([])
    const remove = (id: number) => setNetlist(netlist => netlist.filter(n => n.id !== id))

    useEffect(() => {
        saveToLS(netlist)
        console.log('hookList', hookList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <ListContainer>
                {netlist.map(net => (
                    <NetCard {...net} remove={remove} key={net.id} />
                ))}
            </ListContainer>
        </div>

    )
}
