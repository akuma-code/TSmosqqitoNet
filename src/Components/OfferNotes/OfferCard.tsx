import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex, IconButton, Progress, Text, Tooltip } from '@chakra-ui/react';
import { Card, CardHeader } from '@chakra-ui/react';
import { OfferCardProps } from './OfferTypes';
import { useDaysJS } from '../../hooks/useDaysJS';
import { EditPopover } from './EditPopover';
import { VscNote, VscSettings, VscUnverified, VscVerified } from "react-icons/vsc";
import { InfoPopover } from './InfoPopover';
import { HiCog } from "react-icons/hi";



export const OfferCard: React.FC<OfferCardProps> = ({ offer, offControl, nextStep: onMove, }) => {
    const [progValue, setProgValue] = useState(0)
    const [progColor, setProgColor] = useState("green")
    const [isFinished, setFinish] = useState(false)
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
        if (HoursLeft(offer.dateReady) <= 12) {
            setFinish(true)

        }
        else setFinish(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offer])


    return (
        <Flex maxWidth={'100vw'} flexDir='column'
            rowGap={1}
            border={'1px solid black'}
            rounded={'md'}
            bgGradient={'linear(to-r,transparent 25%, #000)'}
        >
            <Card key={offer.id}
                flexDir={'column'}
                maxH={14}
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
                        <Flex align={'center'} bg={'#decdfd'} rounded={'md'} flexDir='row' gap={2} p={1}>
                            {offer.desc &&
                                <TTinfo
                                    target={!!offer.desc}
                                    text={offer.desc}
                                />
                            }
                            {
                                <TT target={offer.isDocSigned!}
                                    text={{ yes: 'договор подписан', no: 'договор не подписан' }}
                                />
                            }
                            {
                                <TT target={offer.isDocRequested!}
                                    text={{ yes: 'закрывающие запрошены', no: 'закрывающие не запрошены' }}
                                />
                            }
                        </Flex>

                        <EditPopover offer={offer} onEdit={offControl!.Edit}>

                            <IconButton
                                aria-label='edit'
                                size={'sm'}
                                variant={'solid'}
                                fontSize={20}
                                icon={<VscSettings />}
                                colorScheme={'blue'} />
                        </EditPopover>
                        <InfoPopover offer={offer} controlFn={offControl!} onMove={onMove!}>
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
                // isIndeterminate={isAnimOn}
                />
                <Text as={'kbd'}
                    color={'blackAlpha.900'}
                    pos={'absolute'}
                    my={'auto'}
                    px={2}
                    fontWeight={'bold'}
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
                    rounded='md'>
                    {isFinished ?
                        "Завершено!"
                        :
                        `Осталось дней: ${dleft}`
                    }

                </Text>
            </Flex>

        </Flex>
    );
};

const TT: React.FC<{ target: boolean, text: { yes: string, no: string } }> = ({ target, text }) => {
    const tt = useRef(null)
    const color = target ? 'green' : '#a32c2c'
    return (
        <Tooltip label={`${target ? text.yes : text.no}`} placement={`auto`}>
            <Box ref={tt}>{target ? <VscVerified fontSize={24} color={color} /> : <VscUnverified fontSize={24} color={color} />}</Box>
        </Tooltip>
    )
}
const TTinfo: React.FC<{ target: boolean, text: string }> = ({ target, text }) => {
    const tt = useRef(null)
    return (
        <Tooltip label={text} placement={`auto`} fontSize={20}>
            <Box ref={tt}>{target ? <VscNote fontSize={24} color={'yellow.400'} /> : null}</Box>
        </Tooltip>
    )
}