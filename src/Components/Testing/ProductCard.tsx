import {
    Box, Heading, Image, Stat, Text, StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
} from '@chakra-ui/react'
import React from 'react'

type IProductInfo = {
    w: number
    h: number
    prof: string
    glass: number
}

interface ProductCardProps {

    id: number,
    title: string,
    src: string,
    count?: number
    price?: number,
    info?: IProductInfo[]

}

export const ProductCard: React.FC<ProductCardProps> = (product): JSX.Element => {

    return (
        <Box className='my1'
            maxHeight='14em'
            display='flex'
            flexDir='row'
            border='2px'
            borderRadius='md'
            maxWidth='container.lg'
        >
            <Box maxHeight='container.md' alignItems='center' display={'flex'}>
                <Image
                    src={product.src}
                    alt='No IMAGE'
                    maxHeight='12em'

                />
            </Box>
            <Box>
                <Heading size={'lg'} textAlign='center' className='my1'>{product.title}</Heading>

                <StatGroup className='mx1'
                    bgColor={'beige'}
                    border='2px solid white'
                    borderRadius='xl'
                    w='max-content'
                >
                    <Stat className='ml1' textAlign='center'>
                        <StatLabel>Стоимость</StatLabel>
                        <StatNumber>{product?.price}</StatNumber>
                        <StatHelpText>рублей</StatHelpText>
                    </Stat>
                    <Stat className='mx1' textAlign='center'>
                        <StatLabel>Осталось</StatLabel>
                        <StatNumber>{product?.count}</StatNumber>
                        <StatHelpText>штук</StatHelpText>
                    </Stat>
                </StatGroup>
            </Box>



        </Box>
    )
}

/* <Box padding={'1rem'} minWidth='max-content'
>
    {product.info && product.info.map((i, idx) =>
        <ol key={idx}>
            <li> размер: {i.w} x {i.h}</li>
            <li> профиль: {i.prof}</li>
            <li> стекло: {i.glass}мм</li>
        </ol>
    )}
</Box> */