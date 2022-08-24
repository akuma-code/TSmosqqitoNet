import { Box, Heading, Image, Stat, StatGroup, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react'
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
    const HoverHandler = onHover(isHover).changeCls('m1 ', 'blue accent-2  red-text')
    const { type, quant, shop } = props
    return (
        <Box className={HoverHandler}
            maxHeight='10em'
            display='flex'
            flexDir='row'
            border='2px'
            borderRadius='md'
            justifyContent={'space-between'}
            alignItems='stretch'
            onMouseEnter={setHoverState.on}
            onMouseLeave={setHoverState.off}
            padding='.6em'
            maxWidth={'25vw'}

        >
            <Box alignItems='center' display={'flex'} margin='1rem'>
                <Image
                    alt='No IMAGE'
                    borderRadius={'lg'}
                    src={`http://localhost:5000/${type?.img || 'noimage.jpg'}`}
                />
            </Box>
            <Box >


                <StatGroup className='mx1'
                    bgColor={'beige'}
                    border='2px solid blue'
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
                        <StatNumber>{quant}штук</StatNumber>
                        <StatHelpText>Цена: {shop?.price} руб.</StatHelpText>
                    </Stat>
                </StatGroup>
            </Box>



        </Box >
    )
}

export default SkladItemCard