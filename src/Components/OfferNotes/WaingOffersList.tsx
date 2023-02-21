import { Button, Flex, Grid, GridItem, Stack, Text } from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import { GrDocumentMissing, GrDocumentVerified } from 'react-icons/gr'
import { BsFillFileEarmarkArrowDownFill } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { OfferListData, OffersDBApi } from './OfferTypes'
import { OfferTable } from './OffersTable'
import { EditPopover } from './EditPopover'
import { InfoPopover } from './InfoPopover'

export type WaitingOffersListProps = {
    offersOnWaiting: OfferListData[]
    nextStep: (id: string) => void
    onDelete: (id: string) => void
    onEdit: (id: string, data: OfferListData) => void
    actions: OffersDBApi
}


export const WaitingOffersList: React.FC<WaitingOffersListProps> = ({ offersOnWaiting: ofs, nextStep, onDelete, onEdit, actions }) => {
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
                <Flex w={'full'} justifyContent='space-between' gap={2} >
                    <Text>Закрыть договор</Text>
                    <BsFillFileEarmarkArrowDownFill fontSize={18} color='white' />
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
        const DocSignBtn =
            <Button
                isDisabled={hasActive}
                colorScheme='green'
                _focus={{ bgColor: 'green.400' }}
                onClick={() => actions.toggleCheck(active, 'isDocSigned')}
            >
                <Flex w={'full'} justifyContent='space-between' gap={4} >
                    <Text textColor={'#000'}>
                        {active.isDocSigned ?
                            `Отменить подпись`
                            :
                            `Подписать договор`
                        }
                    </Text>
                    <BsFillFileEarmarkArrowDownFill fontSize={18} />
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

        return { CloseBtn, DeleteBtn, EditBtn, InfoBtn: DocSignBtn }
    }, [active, hasActive, nextStep, onDelete])


    if (!ofs || ofs.length === 0) return (
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
                    {Control.InfoBtn}
                    {Control.DeleteBtn}

                </Stack>
            </GridItem>
        </Grid>
    )
}