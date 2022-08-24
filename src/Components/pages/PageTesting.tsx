import React, { FC, useEffect, useState } from 'react'
import { Box, Button, Container, Heading, Text } from '@chakra-ui/react'
import { useToggle } from '../../hooks/useToggle'
import { ProductCard } from '../Testing/ProductCard'
import { fetchSklad } from '../../http'
import { ISklad } from '../../types/IServerData'
import { StateMapper } from '../DataMapper'
import SkladItemCard from '../Cards/SkladItemCard'
import { API } from '../../http/ClientSkladApi'
const products = [
    {
        id: 1,
        title: "OK3",
        src: "//localhost:5000/assets/ok-4.jpg",
        price: 8300,
        count: 5,
        info: [{
            w: 1170,
            h: 970,
            prof: "WHS",
            glass: 24
        }]
    },
    {
        id: 2,
        title: "OK6",
        src: "//localhost:5000/assets/ok-6.jpg",
        price: 21200,
        count: 5,
        info: [{
            w: 1660,
            h: 1440,
            prof: "Proline",
            glass: 36
        }]
    },
    {
        id: 3,
        title: "OK8",
        src: "//localhost:5000/assets/ok-8.jpg",
        price: 8600,
        count: 5,
        info: [{
            w: 560,
            h: 1440,
            prof: "Proline",
            glass: 36
        }]
    },
]

const initial = async () => {
    const sklad = await fetchSklad()
    // console.log(sklad);
    API.fetchAll()

    const map = StateMapper(sklad)
    // console.log('map', map)
    return map
}

export const PageTesting: FC = (): JSX.Element => {
    const [items, setItems] = useState(products)
    const [sklads, setSklads] = useState<ISklad[]>([])
    const [skladsMap, setSkladsMap] = useState([])
    useEffect(() => {
        fetchSklad().then(data => setSklads(data.rows))
        initial()
    }, [])



    return (
        <Container
            display={'flex'}
            bgColor={'whatsapp.500'}
            maxH={'100vh'}
            maxW={'container.2xl'}
            justifyContent='flex-start'
            flexDir={'row'}
            alignItems='start'
        // alignContent={'center'}
        >
            {/* <Box
                bgColor={'#4fc3f7'}
                padding='1rem'
                margin='1rem'
                className='z-depth-5 w100'
                maxH='90vh'
                maxWidth='max'
                borderRadius='lg'
                overflow='visible'
            >
                {items.map(product =>
                    <ProductCard {...product} key={product.id} />)}
            </Box> */}
            <Box className=' blue darken-2'
                maxHeight={'90vh'}>
                <Heading textAlign={'center'}>Products Form</Heading>
            </Box>

            <Box className=' blue lighten-2'
                textAlign={'center'}
                maxHeight='100vh'
                width={'100%'}
            >

                <Heading paddingBottom='0'>Складские остатки</Heading>
                <Box
                    className=''
                    maxHeight='80vh'
                    display='flex'
                    flexDir={'column'}
                    flexWrap='wrap'
                    overflow={'hidden'}
                    justifyContent='space-between'
                >
                    {sklads.map(s =>
                        <SkladItemCard {...s} id={s.id} key={s.id} />)}
                </Box>
            </Box>



        </Container>
    )
}
