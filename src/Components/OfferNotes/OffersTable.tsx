import React, { useState, useEffect } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
} from '@chakra-ui/react'
import { OfferFormData, OfferListData } from './OfferTypes'
import { useDaysJS } from '../../hooks/useDaysJS'
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { useSortedOffers } from '../../hooks/useSortedOffers'
interface OfferTableProps {
    onSelect: (offer: OfferListData) => void
    listOffers: OfferListData[]
    headers?: string[]
    sortFn?: (f: keyof OfferFormData) => void
}

export const OfferTable: React.FC<OfferTableProps> = ({ listOffers, onSelect, headers }) => {
    const { localDate } = useDaysJS()
    const [selectedId, setSelectedId] = useState("")
    const [selectedSort, setSelectedSort] = useState<{ field: keyof OfferFormData, isAsc: boolean }>({ field: 'companyName', isAsc: false })
    const select = (off: OfferListData) => {
        onSelect(off)
        setSelectedId(off.id)
    }
    const isSelected = (id: string) => selectedId === id

    function SortHandler(f: keyof OfferFormData) {
        setSelectedSort(prev => prev.field === f ? { ...prev, isAsc: !prev.isAsc } : { ...prev, field: f })
    }
    // useEffect(() => {
    //     SortedOffers.reverse()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [selectedSort.isAsc])
    const HeadButton = (header: string, field: keyof OfferFormData) => <Button
        onClick={() => SortHandler(field)}
        variant={'unstyled'}
        fontSize={16}
        _focusWithin={{ bgColor: 'gray.400' }}
        _active={{ bgColor: 'gray.800' }}
        px={4}
        display='flex'
        gap={2}
    >{header} {selectedSort.field === field ?
        selectedSort.isAsc ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />
        : ""
        }

    </Button>
    const SortedOffers = useSortedOffers(listOffers, selectedSort.field!, selectedSort.isAsc)
    return (
        <TableContainer maxW='60vw'>
            <Table size='sm' variant={''} bgColor='gray.200'>
                <Thead >
                    <Tr >
                        {headers ? headers.map((h, idx) =>
                            <Th fontSize={16} key={idx}

                            >{h}</Th>
                        ) :

                            <>
                                <Th>{HeadButton('Контрагент', 'companyName')}</Th>
                                <Th>{HeadButton('№ договора', 'offerId')}</Th>
                                <Th>{HeadButton('дата закрытия', 'dateReady')}</Th>
                                <Th>{HeadButton('Заметка', 'desc')}</Th>

                            </>
                        }
                    </Tr>
                </Thead>
                <Tbody>
                    {SortedOffers.map(o =>
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