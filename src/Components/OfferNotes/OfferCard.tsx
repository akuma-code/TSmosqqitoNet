import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Progress, Text } from '@chakra-ui/react';
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
    return (<Flex maxWidth={'90vw'} flexDir='column'>


        <Card key={offer.id} bg={allChecked ? 'aqua' : 'gray.600'} rounded={'md'} display={'flex'} flexDir={'row'} justifyContent='space-between' >

            <CardHeader maxH={'1em'}>
                <Heading size={'sm'} flexDir={'row'} display={'flex'} textAlign={'center'} columnGap={4} justifyContent='space-between' w={'100%'}>
                    <Text>{offer.offerId} </Text>
                    <Text>{offer.companyTag} "{offer.companyName}"</Text>
                </Heading>


            </CardHeader>
            {/* <CardBody textColor={'whiteAlpha.800'} flexDir={'column'} display={'flex'} gap={2} textAlign={'center'}> */}

            {/* {offer.desc &&
                    <Text fontSize={'lg'}>Комментарий: {offer.desc}</Text>} */}
            {/* </CardBody> */}
            <CardFooter display={'flex'}>
                {/* <Menu colorScheme={'blue'} >
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
                </Menu> */}
                {/* <OffProgressBar steps={offerSteps} toggle={toggleCheck} progBarValue={getProgressValue} /> */}
                <Text fontSize={'lg'} color='white'>Дата отгрузки: {offer.dateReady}</Text>
            </CardFooter>
        </Card>
        <Progress colorScheme={'blue'} value={60} bgColor={'lightblue'} rounded='md' hasStripe />
    </Flex>
    );
};

