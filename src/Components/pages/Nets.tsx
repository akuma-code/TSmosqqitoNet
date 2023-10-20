import React, { FC, useEffect, useState } from 'react'
import { useStateCalcNet } from '../../hooks/useCalcNet';
import { INetListProps } from '../../types/props';
import { ListContainer } from '../Cards/ListContainer';
import NetCard from '../Cards/NetCard';
import { NetInputForm, newNetType } from '../Forms/NetInputForm';
// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'

// 2. Extend the theme with new layer styles
const theme = extendTheme({
    layerStyles: {
        base: {
            bg: 'gray.50',
            border: '2px solid',
            borderColor: 'gray.500',
        },
        selected: {
            bg: 'teal.500',
            color: 'teal.700',
            borderColor: 'orange.500',
        },
    },
})

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
            {/* <Text fontSize={'4xl'} className='center'>Расчет М\С по световому проему</Text>y */}

            <div className='flex-row'>
                <NetInputForm ADD={ADD} />
                <button className="material-icons red darken-4 black-text mx1 reset-btn"
                    onClick={reset}
                >delete
                </button>
            </div>
            <ListContainer>
                {netlist.map((net, idx) => (
                    <NetCard {...net} remove={remove} key={net.id} counter={idx + 1} />
                ))}
            </ListContainer>
        </div>

    )
}
