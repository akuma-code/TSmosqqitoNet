/* eslint-disable @typescript-eslint/no-unused-vars */

import {
    Box,
    Heading,
    Image,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    Stat,
    StatGroup,
    StatHelpText,
    StatLabel,
    StatNumber
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import { HostContext } from '../../App'
import { useToggle } from '../../hooks/useToggle'
import { ISklad } from '../../types/IServerData'
import { I } from './I'
import { IWarehouse } from '../pages/PageTesting'

const onHover = (cond: boolean) => {
    function changeCls(initial: string, newCls: string) {
        if (cond) return [initial, newCls].join(" ")
        else return initial
    }

    return { changeCls }
}


const WarehouseItemCard: React.FC<IWarehouse> = (whItem) => {
    const [isHover, setHoverState] = useToggle()
    const [isHoverImg, setHoverStateImg] = useToggle()
    const HoverHandler = onHover(isHover).changeCls('m1 z-depth-3', 'blue accent-2')

    const { host } = useContext(HostContext)
    return (
        <Box className={'m1 z-depth-3'}
            maxHeight='10em'
            display='flex'
            flexDir='row'
            border='2px'
            borderRadius='md'
            justifyContent={'space-between'}
            alignItems='stretch'
            padding='.6em'
            bgColor={'gray.500'}
        >
            <Box alignItems='center' display={'flex'} margin='.5rem'>

                <Popover isOpen={isHoverImg}
                    closeOnBlur
                >
                    <PopoverTrigger>
                        <Image
                            alt='No IMAGE'
                            borderRadius={'lg'}
                            maxHeight={'9em'}
                            onMouseEnter={setHoverStateImg.on}
                            onMouseLeave={setHoverStateImg.off}
                            src={`${host}${whItem.img_main || 'noimage.jpg'}`}

                        />
                    </PopoverTrigger>
                    {/* <Portal> */}
                    <PopoverContent minWidth={'55em'}
                        border='6px indigo'
                        borderStyle='double'
                        borderRadius='lg'
                    >
                        <PopoverArrow bgColor={'indigo '} />
                        <PopoverHeader textAlign={'center'} fontSize={'3xl'}>
                            <b>{whItem.typename} <I title="send" className='blue-text' /> {whItem.quant} шт.</b>
                        </PopoverHeader>
                        <PopoverBody
                            border='6px indigo'
                            borderStyle='outset'
                        >
                            <Image
                                alt='No IMAGE'
                                borderRadius={'lg'}

                                src={`${host}${whItem.img_sec || 'noimage.jpg'}`}

                            />
                        </PopoverBody>

                    </PopoverContent>
                    {/* </Portal> */}
                </Popover>
            </Box>
            <Box >


                <StatGroup className='mx1'
                    bgColor={'gray.300'}
                    border='2px solid white'
                    borderRadius='xl'
                    display={'flex'}
                    minWidth='max-content'
                    height={'fit-content'}
                    alignItems='center'
                >

                    {/* <Stat className='m1' textAlign='center' >
                        <StatLabel>Стоимость</StatLabel>
                        <StatNumber>{shop?.price}</StatNumber>
                        <StatHelpText>рублей</StatHelpText>
                    </Stat> */}

                    <Stat className='m1' textAlign='center'>
                        <StatLabel>Наименование:</StatLabel>
                        <StatNumber>{whItem.typename}</StatNumber>
                        <StatHelpText
                            color={'red'}
                            fontWeight={'semibold'}
                            fontSize={'2xl'}
                        >{whItem.price} руб.</StatHelpText>
                    </Stat>
                    <Heading className='mr1' alignItems={'center'} display='flex' flexDir={'column'}>{whItem.quant} шт.</Heading>
                </StatGroup>
            </Box>



        </Box >
    )
}

export default WarehouseItemCard