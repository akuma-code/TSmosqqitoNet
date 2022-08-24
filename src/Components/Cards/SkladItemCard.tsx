import { Box, Heading, Image, Stat, StatGroup, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react'
import React from 'react'
import { ISklad } from '../../types/IServerData'

const SkladItemCard: React.FC<ISklad> = (props) => {

    const { type, quant, shop } = props
    return (
        <Box className='my1'
            maxHeight='7em'
            display='flex'
            flexDir='row'
            border='2px'
            borderRadius='md'
            maxWidth='container.lg'
        >
            <Box maxHeight='container.md' alignItems='center' display={'flex'}>
                <Image
                    alt='No IMAGE'
                    maxHeight='5em'
                    src={`http://localhost:5000/${type?.img || 'noimage.jpg'}`}
                />
            </Box>
            <Box >


                <StatGroup className='mx1'
                    bgColor={'beige'}
                    border='2px solid white'
                    borderRadius='xl'
                    w='max-content'
                    height={'5em'}
                >
                    <Heading size={'md'} className='m2' alignItems={'center'} display='flex'>{type?.name}</Heading>
                    <Stat className='ml1' textAlign='center' height={'3rem'}>
                        <StatLabel>Стоимость</StatLabel>
                        <StatNumber>{shop?.price}</StatNumber>
                        <StatHelpText>рублей</StatHelpText>
                    </Stat>
                    <Stat className='mx1' textAlign='center' height={'3rem'}>
                        <StatLabel>Осталось</StatLabel>
                        <StatNumber>{quant}</StatNumber>
                        <StatHelpText>штук</StatHelpText>
                    </Stat>
                </StatGroup>
            </Box>



        </Box>
    )
}

export default SkladItemCard