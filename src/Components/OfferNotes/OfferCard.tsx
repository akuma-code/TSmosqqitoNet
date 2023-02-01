import React, { useEffect, useState } from 'react';
import { Button, Heading, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { OfferCardProps, OfferListData } from './OfferTypes';
import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react'
import { OffProgressBar } from './OffProgressBar';
import { I } from '../Cards/I';
import { useID } from '../../hooks/useID';
const _id = useID
const initSteps = [
    { text: 'Договор подписан', isChecked: false, id: _id() },
    { text: 'Документы запрошены', isChecked: false, id: _id() },
    { text: 'Документы получены', isChecked: false, id: _id() },
    { text: 'Документы сданы', isChecked: false, id: _id() },
]


export const OfferCard: React.FC<OfferCardProps> = ({ offer, offControl }) => {
    const [offerSteps, setofferSteps] = useState(initSteps)
    const toggleCheck = (id: string) => { setofferSteps(prev => prev.map(s => s.id === id ? ({ ...s, isChecked: !s.isChecked }) : s)) }
    const sCount = offerSteps.length
    const allChecked = offerSteps.every(s => s.isChecked)
    const checkedCount = offerSteps.reduce((count, step) => step.isChecked ? ++count : count, 0)
    const getProgressValue = 100 / sCount * checkedCount
    function checkQuery<T extends { isChecked: boolean }>(items: T[]) {
        for (let i = 1; i < items.length; i++) {
            const prev = items[i - 1]
            if (!prev.isChecked) items[i].isChecked = false
            else items[i].isChecked = true
        }
        return items
    }
    return (
        <Card key={offer.id} bg={allChecked ? 'aqua' : 'gray.600'} flexDir={'row'} margin={4}
            maxWidth={'90vw'} rounded={'md'}>

            <CardHeader pos={'relative'}>
                <Heading size={'md'} flexDir={'row'} display={'flex'} textAlign={'center'}>
                    <span>{offer.offerId}</span>
                    <span>{offer.companyTag} "{offer.companyName}"</span>
                </Heading>


            </CardHeader>
            <CardBody textColor={'whiteAlpha.800'} flexDir={'column'} display={'flex'} gap={2} textAlign={'center'}>
                <Text fontSize={'lg'}>Дата отгрузки: {offer.dateReady}</Text>
                {offer.desc &&
                    <Text fontSize={'lg'}>Комментарий: {offer.desc}</Text>}
            </CardBody>
            <CardFooter bgColor={'green.600'} width={'30%'} pos={'relative'}>
                <Menu colorScheme={'blue'} >
                    <MenuButton pos={'absolute'}
                        top={0}
                        right={'-3em'}
                        bgColor='cyan.400'
                        rounded={'xl'}
                        p={2}
                        height={'3em'} width={'3em'} fontSize={'2xl'}
                    ><I title='developer_board' /></MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => offControl.Remove(offer.id!)}>Delete</MenuItem>
                        <MenuDivider />
                    </MenuList>
                </Menu>
                <OffProgressBar steps={offerSteps} toggle={toggleCheck} progBarValue={getProgressValue} />
            </CardFooter>
        </Card>
    );
};

