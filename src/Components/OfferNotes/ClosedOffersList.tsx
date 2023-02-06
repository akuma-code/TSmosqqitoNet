import { Button, Grid, GridItem, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ClosedTable } from './ClosedTable'
import { OfferListData } from './OfferTypes'

export type ClosedOffersListProps = {
    offersClosed: OfferListData[]
    onDelete: (id: string) => void
}



export const ClosedOffersList: React.FC<ClosedOffersListProps> = ({ offersClosed: ofs, onDelete }) => {
    // Control: selectOffer, closeOffer
    const [active, setActive] = useState<OfferListData | { id: "" }>({} as OfferListData)
    const hasActive = active.id === "" ? true : false
    const onSelect = (offer: OfferListData) => setActive(prev => offer)
    if (ofs.length === 0) return <Text fontSize={'2xl'} fontWeight='bold' textAlign='center' >Список закрытых договоров пуст!</Text>
    return (
        <Grid templateColumns={'repeat(8, 1fr)'} columnGap={'40px'} maxW={'70vw'} minW={'50vw'} >
            <GridItem>
                <ClosedTable offersOnWaiting={ofs} onSelect={onSelect} />
            </GridItem>
            <GridItem>
                <Stack align={'stretch'} spacing={'1rem'}>
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