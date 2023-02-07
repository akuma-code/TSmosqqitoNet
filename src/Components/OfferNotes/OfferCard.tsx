import React, { useEffect, useState } from 'react';
import { Box, Button, Center, Flex, Heading, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Progress, Text, Tooltip } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { OfferCardProps, OfferListData } from './OfferTypes';
import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react'
import { I } from '../Cards/I';
import { useID } from '../../hooks/useID';
import { CheckIcon } from '@chakra-ui/icons';
import { customCBx } from './ThemedCheckBox';
import { GiBiohazard } from 'react-icons/gi';
import { useDaysJS } from '../../hooks/useDaysJS';
import { EditCardPopover } from './EditPopover';
import { VscSettings } from "react-icons/vsc";
import { MdDeleteForever, MdDeleteOutline } from 'react-icons/md';
import { AiOutlineCloseCircle, AiOutlineExclamationCircle, AiOutlineMessage } from 'react-icons/ai';
import { InfoPopover } from './InfoPopover';
import { GrAction } from 'react-icons/gr';
import { HiCog } from "react-icons/hi";
const _id = useID
const initSteps = [
    { text: 'Договор подписан', isChecked: false, id: _id() },
    { text: 'Документы запрошены', isChecked: false, id: _id() },
    // { text: 'Документы получены', isChecked: false, id: _id() },
    // { text: 'Документы сданы', isChecked: false, id: _id() },
]


export const OfferCard: React.FC<OfferCardProps> = ({ offer, offControl, nextStep: onMove }) => {
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

        if (hours_left <= 48) return prog[100] //меньше 2 суток
        if (hours_left <= 96) return prog[75] //меньше 4 суток
        if (hours_left <= 144) return prog[50] //меньше 6 суток
        if (hours_left <= 192) return prog[25] //меньше 8 суток
        if (hours_left <= 240) return prog[0] //меньше 10 суток
        return prog[0]
    }
    useEffect(() => {
        const daysleft = calcProgressBarValue()
        setProgValue(prev => daysleft)
        setProgColor(prev => calcProgressColor(HoursLeft(offer.dateReady)))
        if (HoursLeft(offer.dateReady) <= 12) setIsAnim(true)
        else setIsAnim(false)
    }, [offer])

    return (
        <Flex maxWidth={'100vw'} flexDir='column'
            rowGap={1}
            border={'1px solid black'}
            rounded={'md'}
            bgGradient={'linear(to-r,transparent 25%, #000)'}
        >
            <Card key={offer.id}

                // rounded={'md'}
                flexDir={'column'}
                maxH={14}
                pos={'relative'}

            >
                <CardHeader p={0} bgGradient={'linear(to-r,#abf8e7,#8778c7)'}
                    rounded={'md'}
                    borderBottomLeftRadius={0}
                    borderBottomRightRadius={0}
                    display={'flex'} flexDir={'row'} justifyContent='space-between'

                >
                    <Flex columnGap={12} px={4} alignItems='center' borderBottomLeftRadius={0} maxH={10}
                        borderBottomRightRadius={0}>
                        <Text fontSize={22}>{offer.companyTag} "{offer.companyName}"</Text>
                        <Text fontSize={22}>{offer.offerId} </Text>
                    </Flex>
                    <Flex gap={4} m={2}>
                        <EditCardPopover offer={offer} onEdit={offControl.Edit}>

                            <IconButton
                                aria-label='edit'
                                size={'sm'}
                                variant={'solid'}
                                fontSize={20}
                                icon={<VscSettings />}
                                colorScheme={'blue'} />
                        </EditCardPopover>
                        <InfoPopover offer={offer} controlFn={offControl} onMove={onMove!}>
                            <IconButton
                                size={'sm'}
                                variant={'solid'}
                                colorScheme={'blue'}
                                aria-label='delete'
                                fontSize={20}
                                icon={<HiCog />}
                            />
                        </InfoPopover>
                    </Flex>
                </CardHeader>

            </Card>

            <Flex pos={'relative'} alignItems='center'>
                <Progress colorScheme={progColor}
                    value={progValue}
                    bgColor={'lightblue'}
                    rounded='md'
                    hasStripe
                    isAnimated
                    borderTopLeftRadius={0}
                    borderTopRightRadius={0}
                    h={5}
                    w={'100%'}
                    isIndeterminate={isAnimOn}
                />
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
                    Отгрузка: {finish}</Text>
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
                    Осталось дней: {dleft} </Text>
            </Flex>

        </Flex>
    );
};

