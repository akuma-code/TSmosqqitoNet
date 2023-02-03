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
import { useDaysJS } from '../../hooks/useDaysJS';
const _id = useID
const initSteps = [
    { text: 'Договор подписан', isChecked: false, id: _id() },
    { text: 'Документы запрошены', isChecked: false, id: _id() },
    // { text: 'Документы получены', isChecked: false, id: _id() },
    // { text: 'Документы сданы', isChecked: false, id: _id() },
]


export const OfferCard: React.FC<OfferCardProps> = ({ offer, offControl }) => {
    const [offerSteps, setofferSteps] = useState(initSteps)
    const allChecked = offerSteps.every(s => s.isChecked)
    const [progValue, setProgValue] = useState(0)
    const [progColor, setProgColor] = useState("green")
    const [isAnimOn, setIsAnim] = useState(false)
    const { localDate, daysLeft, HoursLeft } = useDaysJS()
    const finish = localDate(offer.dateReady)
    const dleft = daysLeft(offer.dateReady)
    const calcProgressBarValue = () => {
        if (daysLeft(offer.dateReady) > 10) return 0
        const left = 100 - daysLeft(offer.dateReady) * 10

        return left
    }
    const calcProgressColor = (hours_left: number) => {
        const prog = {
            0: 'green',
            25: 'cyan',
            50: 'yellow',
            75: 'orange',
            100: 'red',
        }

        if (hours_left <= 48) return prog[100]
        if (hours_left <= 96) return prog[75]
        if (hours_left <= 144) return prog[50]
        if (hours_left <= 192) return prog[25]
        if (hours_left <= 244) return prog[0]
        return prog[0]
    }
    useEffect(() => {
        const daysleft = calcProgressBarValue()
        setProgValue(prev => daysleft)
        setProgColor(prev => calcProgressColor(HoursLeft(offer.dateReady)))
        if (HoursLeft(offer.dateReady) <= 24) setIsAnim(true)
    }, [])

    return (
        <Flex maxWidth={'60vw'} flexDir='column'
            rowGap={1}
            border={'1px solid black'}
            rounded={'md'}
        >
            <Card key={offer.id}
                rounded={'md'}
                flexDir={'column'}
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
                <Progress colorScheme={progColor} value={progValue} bgColor={'lightblue'} rounded='md' hasStripe h={5} w={'100%'} isIndeterminate={isAnimOn} isAnimated />
                <Text as={'kbd'}
                    color={'blackAlpha.900'}
                    pos={'absolute'}
                    my={'auto'}
                    px={2}
                    fontWeight={'bold'}
                    // shadow='dark-lg'
                    // bgGradient={' linear-gradient(90deg,#646464ae 0% ,#404b88dd 50%, #646464ae 100%)'}
                    rounded='md'
                >
                    Отгрузка: {finish}                </Text>
                <Text
                    right={4}
                    as={'kbd'}
                    color={'blackAlpha.900'}
                    pos={'absolute'}
                    my={'auto'}
                    px={2}
                    fontWeight={'bold'}
                    // shadow='dark-lg'
                    // bgGradient={' linear-gradient(90deg,#646464ae 0% ,#404b88dd 50%, #646464ae 100%)'}
                    rounded='md'>
                    Осталось {dleft} дней                </Text>
            </Flex>

        </Flex>
    );
};

