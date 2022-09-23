import { Box, Button, HStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IActiveItem } from '../../types/WHTypes'
import { IWarehouse, StrNum } from '../../types/WarehouseTypes'
import { NUM } from '../pages/PageTesting'
import { editWarehouse } from '../../http/ClientSkladApi'
import dayjs from 'dayjs'


interface ProductionBoxProps extends IActiveItem {
    children?: React.ReactNode
}
type IProd = {
    count: StrNum,
    dateReady: string,
    wh_id: StrNum,
    quant: StrNum,
    status: 'inProduction' | 'Ready'

}


export const ProductionBox: React.FC<ProductionBoxProps> = ({ item }) => {
    const initial_prod = {
        count: 1,
        dateReady: dayjs().add(8, 'day').format('YYYY-MM-DD'),
        wh_id: item.id,
        quant: item.quant,
        status: 'inProduction'
    }
    const [production, setProduction] = useState(initial_prod as IProd)


    function StartProd(whItem: IWarehouse) {
        const rest = NUM(production.quant) - NUM(production.count)
        const form = new FormData()
        form.append('quant', rest.toString())
        editWarehouse(form, whItem)

    }

    return (
        <Box padding={3} display='flex' flexDir={'column'} alignItems={'stretch'}>
            <HStack
                gap={5}
                margin='1em 1em'
                className='prodbox'
            >
                <fieldset className='prod-fs'>
                    <legend>Сколько</legend>
                    <input type="number" style={{ textAlign: 'center', width: "4rem" }}
                        value={production.count}
                        onChange={e => setProduction((prev: any) => ({ ...prev, count: e.target.value }))}
                    />
                </fieldset>
                <fieldset className='prod-fs'>
                    <legend>
                        Дата готовности
                    </legend>
                    <input type="date"
                        value={production.dateReady}
                        onChange={e => setProduction((prev: any) => ({ ...prev, dateReady: e.target.value }))}
                    // style={{ minWidth: 'fit-content' }}
                    />
                </fieldset>
                <Button
                    variant={'solid'}
                    colorScheme='whatsapp'
                    height={20}
                    onClick={() => StartProd(item)}
                >Запустить
                </Button>
            </HStack>
        </Box>
    )
}