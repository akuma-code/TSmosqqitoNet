import {
    Box,
    Button,
    Heading,
    Image,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    Stat,
    StatGroup,
    StatHelpText,
    StatLabel,
    StatNumber
} from '@chakra-ui/react'
import React from 'react'
import { useToggle } from '../../hooks/useToggle'
import { ISklad } from '../../types/IServerData'

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
            maxWidth={'23vw'}
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
                            src={`http://localhost:5000/${type?.img || 'noimage.jpg'}`}

                        />
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent >
                            <PopoverArrow bgColor={'indigo '} />
                            <PopoverHeader textAlign={'center'} fontSize={'3xl'}><b>{type?.name}</b></PopoverHeader>
                            <PopoverBody>
                                <Image
                                    alt='No IMAGE'
                                    borderRadius={'lg'}
                                    maxHeight={'20em'}
                                    src={`http://localhost:5000/${type?.img || 'noimage.jpg'}`}

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
                    <Heading className='ml1' alignItems={'center'} display='flex' flexDir={'column'}>{type?.name}</Heading>
                    <Stat className='m1' textAlign='center'>
                        <StatLabel>Осталось</StatLabel>
                        <StatNumber>{quant} шт.</StatNumber>
                        <StatHelpText color={'red'} fontWeight={'semibold'}>Цена: {shop?.price} руб.</StatHelpText>
                    </Stat>
                </StatGroup>
            </Box>



        </Box >
    )
}

export default SkladItemCard