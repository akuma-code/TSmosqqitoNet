import { Button, Flex, Grid, GridItem, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { GrDocumentMissing, GrDocumentVerified } from 'react-icons/gr'
import { OfferListData } from './OfferTypes'
import { OfferTable } from './OffersTable'

export type WaitingOffersListProps = {
    offersOnWaiting: OfferListData[]
    nextStep: (id: string) => void
    onDelete: (id: string) => void
}
const stringHeaders = ['Контрагент', "№ ДОГОВОРА", "ДАТА ЗАКРЫТИЯ", "ЗАМЕТКА"]


export const WaitingOffersList: React.FC<WaitingOffersListProps> = ({ offersOnWaiting: ofs, nextStep: onClose, onDelete }) => {
    // Control: selectOffer, closeOffer
    const [active, setActive] = useState<OfferListData>({ id: "" } as OfferListData)
    const hasActive = active.id === "" ? true : false
    const onSelect = (offer: OfferListData) => setActive(offer)

    if (ofs.length === 0) return (
        <Text fontSize={'2xl'} fontWeight='bold' textAlign='center' >Список ожидания пуст!</Text>
    )

    return (
        <Grid templateColumns={'repeat(8, 1fr)'} columnGap={'40px'} maxW={'70vw'} minW={'50vw'} >
            <GridItem colSpan={6}>
                <OfferTable listOffers={ofs} onSelect={onSelect}
                // headers={['Контрагент', "№ ДОГОВОРА", "ДАТА ЗАКРЫТИЯ", "ЗАМЕТКА"]}
                />
            </GridItem>
            <GridItem colSpan={2}>
                <Stack align={'stretch'} spacing={'1rem'}>

                    <Button
                        isDisabled={hasActive}
                        colorScheme='twitter'
                        _focus={{ bgColor: 'blue.400' }}
                        onClick={() => onClose(active.id!)}
                    >
                        <Flex w={'full'} justifyContent='space-between' gap={4} >
                            <Text>Закрыть договор</Text>
                            <GrDocumentVerified fontSize={18} />
                        </Flex>

                    </Button>
                    <Button
                        isDisabled={hasActive}
                        colorScheme='red'
                        _focus={{ bgColor: 'red.400' }}
                        onClick={() => onDelete(active.id!)}
                    >
                        <Flex w={'full'} justifyContent='space-between' gap={4}>
                            <Text>Удалить запись</Text>
                            <GrDocumentMissing fontSize={20} />
                        </Flex>
                    </Button>
                </Stack>
            </GridItem>
        </Grid>
    )
}