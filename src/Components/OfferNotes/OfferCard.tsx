import React, { useEffect, useState } from 'react';
import { Button, Heading, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { OfferCardProps } from './OfferTypes';
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

    return (
        <Card key={offer.id} bg={allChecked ? 'aqua' : 'gray.600'} flexDir={'column'} margin={4}
            maxWidth={'60vw'} rounded={'md'}>

            <CardHeader pos={'relative'}>
                <Heading size={'md'} flexDir={'column'} display={'flex'} textAlign={'center'}>
                    <span>{offer.offerId}</span>
                    <span>{offer.companyTag} "{offer.companyName}"</span>
                </Heading>
                <Menu colorScheme={'gray'} >
                    <MenuButton pos={'absolute'} top={1} right={1}
                        height={'3em'} width={'3em'}
                    ><I title='developer_board' /></MenuButton>
                    <MenuList>

                        <MenuItem onClick={() => offControl.Remove(offer.id!)}>Delete</MenuItem>
                        <MenuDivider />
                    </MenuList>
                </Menu>

            </CardHeader>
            <CardBody textColor={'whiteAlpha.800'} flexDir={'column'} display={'flex'} gap={2} textAlign={'center'}>
                <Text fontSize={'lg'}>Дата отгрузки: {offer.dateReady}</Text>
                {offer.desc &&
                    <Text fontSize={'lg'}>Комментарий: {offer.desc}</Text>}
            </CardBody>
            <CardFooter bgColor={'green.600'} width={'100%'}>
                <OffProgressBar steps={offerSteps} toggle={toggleCheck} progBarValue={getProgressValue} />
            </CardFooter>
        </Card>
    );
};

// const cbxgrp = <CheckboxGroup
// // defaultValue={[]}
// >
//     <Stack textShadow={'lg'} fontWeight='bold' >
//         <Checkbox icon={<div className='bg-red' />} isChecked={offer.isRequested} onChange={() => checkFN(offer.id!, 'isRequested')}>Закрывающие запрошены</Checkbox>
//         <Checkbox isChecked={offer.isDocSigned} onChange={() => checkFN(offer.id!, 'isDocSigned')} >Договор подписан</Checkbox>
//         <Checkbox isChecked={offer.isDocResieved} onChange={() => checkFN(offer.id!, 'isDocResieved')} >Документы в офисе</Checkbox>
//     </Stack>
// </CheckboxGroup>  