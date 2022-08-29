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

const onHover = (cond: boolean) => {
    function changeCls(initial: string, newCls: string) {
        if (cond) return [initial, newCls].join(" ")
        else return initial
    }

    return { changeCls }
}


const SkladItemCard: React.FC<ISklad> = (props) => {
    const [isHover, setHoverState] = useToggle()
    const [isHoverImg, setHoverStateImg] = useToggle()
    const HoverHandler = onHover(isHover).changeCls('m1 z-depth-3', 'blue accent-2')
    const { type, quant, shop } = props
    const { host } = useContext(HostContext)
    const server_url = host + "/"
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
                            src={`${server_url}${type?.img || 'noimage.jpg'}`}

                        />
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent >
                            <PopoverArrow bgColor={'indigo '} />
                            <PopoverHeader textAlign={'center'} fontSize={'3xl'}><b>{type?.name} <I title="send" className='blue-text' /> {quant} шт.</b></PopoverHeader>
                            <PopoverBody>
                                <Image
                                    alt='No IMAGE'
                                    borderRadius={'lg'}
                                    maxHeight={'20em'}
                                    src={`${server_url}${type?.img || 'noimage.jpg'}`}

                                />
                            </PopoverBody>

                        </PopoverContent>
                    </Portal>
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
                        <StatNumber>{type?.name}</StatNumber>
                        <StatHelpText
                            color={'red'}
                            fontWeight={'semibold'}
                            fontSize={'2xl'}
                        >{shop?.price} руб.</StatHelpText>
                    </Stat>
                    <Heading className='mr1' alignItems={'center'} display='flex' flexDir={'column'}>{quant} шт.</Heading>
                </StatGroup>
            </Box>



        </Box >
    )
}

export default SkladItemCard