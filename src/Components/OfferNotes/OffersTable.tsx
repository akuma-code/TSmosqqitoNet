import React, { useState, useCallback } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    Tooltip,
    Flex,
    Stack,
} from '@chakra-ui/react'
import { OfferFormData, OfferListData } from './OfferTypes'
import { useDaysJS } from '../../hooks/useDaysJS'
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { FiAlertTriangle } from "react-icons/fi";
import { useSortedOffers } from '../../hooks/useSortedOffers'
interface OfferTableProps {
    onSelect: (offer: OfferListData) => void
    listOffers: OfferListData[]
    headers?: string[]
    sortFn?: (f: keyof OfferFormData) => void
}

export const OfferTable: React.FC<OfferTableProps> = ({ listOffers, onSelect }) => {
    const { localDate } = useDaysJS()
    const [selectedId, setSelectedId] = useState("")
    const [selectedSort, setSelectedSort] = useState<{ field: keyof OfferFormData, isAsc: boolean }>({ field: 'dateReady', isAsc: true })
    const select = (off: OfferListData) => {
        onSelect(off)
        setSelectedId(off.id)
    }
    const isSelected = (id: string) => selectedId === id

    function SortHandler(f: keyof OfferFormData) {
        setSelectedSort(prev => prev.field === f ? { ...prev, isAsc: !prev.isAsc } : { ...prev, field: f })
    }

    const HeadButton = useCallback((text: string, field: keyof OfferFormData) =>
        <Button
            onClick={() => SortHandler(field)}
            variant={'unstyled'}
            fontSize={16}
            _focusWithin={{ bgColor: 'gray.400' }}
            _active={{ bgColor: 'gray.800' }}
            px={0}
            display='flex'
            gap={2}
            w='full'
            mx={4}
        >
            {text}
            {selectedSort.field === field ?
                selectedSort.isAsc ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />
                : ""
            }

        </Button>, [selectedSort])
    const SortedOffers = useSortedOffers(listOffers, selectedSort.field!, selectedSort.isAsc)
    return (
        <TableContainer maxW='80vw'>
            <Table size='sm' bgColor='gray.200'>
                <Thead >
                    <Tr >
                        <Th>{HeadButton('Контрагент', 'companyName')}</Th>
                        <Th>{HeadButton('№ договора', 'offerId')}</Th>
                        <Th>{HeadButton('Дата закрытия', 'dateReady')}</Th>
                        <Th>{HeadButton('Заметка', 'desc')}</Th>
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
                                <Tooltip label='не хватает подписанного договора' placement='top' hasArrow isDisabled={o.isDocSigned}>
                                    <Flex justify={'space-around'}>
                                        {o.offerId}
                                        {!o.isDocSigned &&
                                            <FiAlertTriangle color='red' />
                                        }
                                    </Flex>
                                </Tooltip>

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