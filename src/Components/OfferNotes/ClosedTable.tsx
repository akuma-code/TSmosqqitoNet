import React, { useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
    Text,
} from '@chakra-ui/react'
import { WaitingOffersListProps } from './WaingOffersList'
import { OfferCardProps, OfferListData } from './OfferTypes'
import { useDaysJS } from '../../hooks/useDaysJS'

type ClosedTableProps = {
    onSelect: (offer: OfferListData) => void
    offersOnWaiting: OfferListData[]
}

export const ClosedTable: React.FC<ClosedTableProps> = ({ offersOnWaiting, onSelect }) => {
    const { localDate } = useDaysJS()
    const [selectedId, setSelectedId] = useState("")
    const select = (off: OfferListData) => {
        onSelect(off)
        setSelectedId(off.id)
    }
    const isSelected = (id: string) => selectedId === id




    return (
        <TableContainer maxW='60vw'>
            <Table size='sm' variant={''} bgColor='gray.200'>
                <Thead >
                    <Tr >
                        <Th fontSize={16}>контрагент</Th>
                        <Th fontSize={16}>№ договора</Th>
                        <Th fontSize={16}>дата закрытия</Th>
                        <Th fontSize={16}>Заметка</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {offersOnWaiting.map(o =>
                        <Tr
                            h={'fit-content'}
                            _hover={{ bgColor: "blue.100" }}
                            onClick={() => select(o)}
                            cursor='pointer'
                            border={isSelected(o.id) ? '2px solid black' : ""}
                            key={o.id}
                        >
                            <Td>
                                {o.companyTag + " " + o.companyName}
                            </Td>
                            <Td>
                                {o.offerId}
                            </Td>
                            <Td>
                                {localDate(o.dateReady)}
                            </Td>
                            <Td>
                                {o.desc}
                            </Td>
                        </Tr>
                    )}

                </Tbody>

            </Table>
        </TableContainer>
    )
}