import { Button, Grid, GridItem, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { OfferListData } from './OfferTypes'
import { WaitingTable } from './WaitingTable'

export type WaitingOffersListProps = {
    offersOnWaiting: OfferListData[]
    onClose: (id: string) => void
    onDelete: (id: string) => void
}



export const WaitingOffersList: React.FC<WaitingOffersListProps> = ({ offersOnWaiting: ofs, onClose, onDelete }) => {
    // Control: selectOffer, closeOffer
    const [active, setActive] = useState<OfferListData | { id: "" }>({} as OfferListData)
    const hasActive = active.id === "" ? true : false
    const onSelect = (offer: OfferListData) => setActive(prev => offer)
    if (ofs.length === 0) return <Text fontSize={'2xl'} fontWeight='bold' textAlign='center' >Список ожидания пуст!</Text>
    return (
        <Grid templateColumns={'repeat(8, 1fr)'} columnGap={'40px'} maxW={'70vw'} minW={'50vw'} >
            <GridItem>
                <WaitingTable offersOnWaiting={ofs} onSelect={onSelect} />
            </GridItem>
            <GridItem>
                <Stack align={'stretch'} spacing={'1rem'}>

                    <Button
                        isDisabled={hasActive}
                        colorScheme='twitter'
                        _focus={{ bgColor: 'blue.400' }}
                        onClick={() => onClose(active.id)}
                    >CloseOffer</Button>
                    <Button
                        isDisabled={hasActive}
                        colorScheme='red'
                        _focus={{ bgColor: 'red.400' }}
                        onClick={() => onDelete(active.id)}
                    >DeleteOffer</Button>
                </Stack>
            </GridItem>
        </Grid>
    )
}