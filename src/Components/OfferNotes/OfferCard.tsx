import React, { useEffect, useState } from 'react';
import { Box, Button, Center, Flex, Heading, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Progress, Text } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { OfferCardProps, OfferListData } from './OfferTypes';
import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react'
import { OffProgressBar } from './OffProgressBar';
import { I } from '../Cards/I';
import { useID } from '../../hooks/useID';
import { CheckIcon } from '@chakra-ui/icons';
import { customCBx } from './ThemedCheckBox';
import { GiBiohazard } from 'react-icons/gi';
const _id = useID
const initSteps = [
    { text: 'Договор подписан', isChecked: false, id: _id() },
    { text: 'Документы запрошены', isChecked: false, id: _id() },
    { text: 'Документы получены', isChecked: false, id: _id() },
    { text: 'Документы сданы', isChecked: false, id: _id() },
]


export const OfferCard: React.FC<OfferCardProps> = ({ offer, offControl }) => {
    const [offerSteps, setofferSteps] = useState(initSteps)
    const allChecked = offerSteps.every(s => s.isChecked)

    return (
        <Flex maxWidth={'60vw'} flexDir='column'
            rowGap={1}
            border={'1px solid black'}
            rounded={'md'}
        >
            <Card key={offer.id}
                rounded={'md'}

                // display={'flex'}
                flexDir={'column'}
                // justifyContent='space-between'
                minH={10}
                pos={'relative'}
            >
                <CardHeader p={0} bgGradient={'linear(to-r,#abf8e7,#8778c7)'}
                    rounded={'md'}
                >
                    <Flex columnGap={12} px={4}>
                        <Text fontSize={24}>{offer.companyTag} "{offer.companyName}"</Text>
                        <Text fontSize={24}>{offer.offerId} </Text>
                    </Flex>
                    <Menu colorScheme={'blue'} >
                        <MenuButton
                            bgColor='red.400'
                            rounded={'lg'}
                            // p={2}
                            pos={'absolute'}
                            fontSize={32}
                            right={0}
                            mr={0}
                            top={0}
                            h={'full'}
                            w={10}
                            textColor={'gray.800'}
                        >
                            <Center>
                                <GiBiohazard width={6} height={6} />
                            </Center>
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => offControl.Remove(offer.id!)}>Delete</MenuItem>
                            <MenuDivider />
                        </MenuList>
                    </Menu>
                </CardHeader>
            </Card>

            <Flex pos={'relative'} alignItems='center'>
                <Progress colorScheme={'blue'} value={95} bgColor={'lightblue'} rounded='md' hasStripe h={5} w={'100%'} />
                <Text as={'kbd'}
                    color={'HighlightText'}
                    pos={'absolute'}
                    my={'auto'}
                    px={2}
                    fontWeight={'bold'}
                    shadow='dark-lg'
                    bgGradient={' linear-gradient(90deg,#646464ae 0% ,#404b88dd 50%, #646464ae 100%)'}
                    rounded='md'>Отгрузка: {offer.dateReady}</Text>
            </Flex>

        </Flex>
    );
};
// const getProgressValue = 100 / sCount * checkedCount
//     function checkQuery<T extends { isChecked: boolean }>(items: T[]) {
//         for (let i = 1; i < items.length; i++) {
//             const prev = items[i - 1]
//             if (!prev.isChecked) items[i].isChecked = false
//             else items[i].isChecked = true
//         }
//         return items
//     }
//     const toggleCheck = (id: string) => { setofferSteps(prev => prev.map(s => s.id === id ? ({ ...s, isChecked: !s.isChecked }) : s)) }
//     const sCount = offerSteps.length
//     const checkedCount = offerSteps.reduce((count, step) => step.isChecked ? ++count : count, 0)
