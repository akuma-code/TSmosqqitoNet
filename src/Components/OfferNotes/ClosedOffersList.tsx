import { Button, Flex, Grid, GridItem, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { GrDocumentMissing } from 'react-icons/gr'
import { OfferListData } from './OfferTypes'
import { OfferTable } from './OffersTable'

export type ClosedOffersListProps = {
    offersClosed: OfferListData[]
    onDelete: (id: string) => void
}



export const ClosedOffersList: React.FC<ClosedOffersListProps> = ({ offersClosed: ofs, onDelete }) => {
    // Control: selectOffer, closeOffer
    const [active, setActive] = useState<OfferListData>({ id: "" } as OfferListData)
    const hasActive = active.id === "" ? true : false
    const onSelect = (offer: OfferListData) => setActive(prev => offer)
    if (ofs.length === 0) return <Text fontSize={'2xl'} fontWeight='bold' textAlign='center' w={'55vw'}>Список закрытых договоров пуст!</Text>
    return (
        <Grid templateColumns={'repeat(8, 1fr)'} columnGap={'40px'} maxW={'80vw'} minW={'50vw'} >
            <GridItem colSpan={6}>
                <OfferTable listOffers={ofs} onSelect={onSelect} />
            </GridItem>
            <GridItem colSpan={2}>
                <Stack align={'stretch'} spacing={'1rem'}>
                    <Button
                        isDisabled={hasActive}
                        colorScheme='red'
                        _focus={{ bgColor: 'red.400' }}
                        onClick={() => onDelete(active.id)}
                    ><Flex w={'full'} justifyContent='space-between' gap={4}>
                            <Text>Удалить запись</Text>
                            <GrDocumentMissing fontSize={20} />
                        </Flex></Button>
                </Stack>
            </GridItem>
        </Grid>
    )
}