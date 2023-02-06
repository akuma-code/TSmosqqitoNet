import React from 'react'
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
} from '@chakra-ui/react'
import { WaitingOffersListProps } from './WaingOffersList'
import { OfferListData } from './OfferTypes'
import { useDaysJS } from '../../hooks/useDaysJS'

type WaitingTableProps = {
    offers: WaitingOffersListProps['offers']
}

export const WaitingTable: React.FC<WaitingTableProps> = ({ offers }) => {
    const { localDate, daysLeft, HoursLeft } = useDaysJS()
    const date = (dr: OfferListData['dateReady']) => (localDate(dr))

    return (
        <TableContainer w='60vw'>
            <Table size='sm' variant={'striped'} bgColor='gray.200'>
                <Thead>
                    <Tr>
                        <Th>контрагент</Th>
                        <Th>№ договора</Th>
                        <Th>дата закрытия</Th>
                        <Th>закрыть договор</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {offers.map(o =>
                        <Tr>
                            <Td>
                                {o.companyTag + " " + o.companyName}
                            </Td>
                            <Td>
                                {o.offerId}
                            </Td>
                            <Td>
                                {date(o.dateReady)}
                            </Td>
                            <Td>
                                <Button
                                    colorScheme={'whatsapp'}
                                >Закрыть</Button>
                            </Td>
                        </Tr>
                    )}

                </Tbody>

            </Table>
        </TableContainer>
    )
}