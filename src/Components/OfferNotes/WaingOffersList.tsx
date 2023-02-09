import { Button, Flex, Grid, GridItem, Stack, Text } from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import { GrDocumentMissing, GrDocumentVerified } from 'react-icons/gr'
import { FiEdit } from 'react-icons/fi'
import { OfferListData } from './OfferTypes'
import { OfferTable } from './OffersTable'
import { EditPopover } from './EditPopover'

export type WaitingOffersListProps = {
    offersOnWaiting: OfferListData[]
    nextStep: (id: string) => void
    onDelete: (id: string) => void
    onEdit: (data: OfferListData) => void
}
const stringHeaders = ['Контрагент', "№ ДОГОВОРА", "ДАТА ЗАКРЫТИЯ", "ЗАМЕТКА"]


export const WaitingOffersList: React.FC<WaitingOffersListProps> = ({ offersOnWaiting: ofs, nextStep, onDelete, onEdit }) => {
    // Control: selectOffer, closeOffer
    const [active, setActive] = useState<OfferListData>({ id: "" } as OfferListData)
    const hasActive = active.id === "" ? true : false
    const onSelect = (offer: OfferListData) => setActive(offer)
    const Control = useMemo(() => {
        const CloseBtn =
            <Button
                isDisabled={hasActive}
                colorScheme='twitter'
                _focus={{ bgColor: 'blue.400' }}
                onClick={() => nextStep(active.id!)}
            >
                <Flex w={'full'} justifyContent='space-between' gap={4} >
                    <Text>Закрыть договор</Text>
                    <GrDocumentVerified fontSize={18} />
                </Flex>

            </Button>;
        const EditBtn =
            <Button
                isDisabled={hasActive}
                colorScheme='yellow'
                _focus={{ bgColor: 'blue.400' }}
            >
                <Flex w={'full'} justifyContent='space-between' gap={4} >
                    <Text>Редактировать</Text>
                    <FiEdit fontSize={18} />
                </Flex>

            </Button>;
        const DeleteBtn =
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
            </Button>;
        return { CloseBtn, DeleteBtn, EditBtn }
    }, [active.id, hasActive, nextStep, onDelete])


    if (ofs.length === 0) return (
        <Text fontSize={'2xl'} fontWeight='bold' textAlign='center' w={'55vw'}>Список ожидания пуст!</Text>
    )
    return (
        <Grid templateColumns={'repeat(8, 1fr)'} columnGap={'40px'} maxW={'80vw'} minW={'50vw'} >
            <GridItem colSpan={6}>
                <OfferTable listOffers={ofs} onSelect={onSelect} />
            </GridItem>
            <GridItem colSpan={2}>
                <Stack align={'stretch'} spacing={'1rem'}>
                    {Control.CloseBtn}
                    <EditPopover offer={active} onEdit={onEdit}>
                        {Control.EditBtn}
                    </EditPopover>
                    {Control.DeleteBtn}

                </Stack>
            </GridItem>
        </Grid>
    )
}