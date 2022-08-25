import React, { FC, useEffect, useState } from 'react'
import { Box, Button, Container, Heading, Spinner, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { useToggle } from '../../hooks/useToggle'
import { ProductCard } from '../Testing/ProductCard'
import { ISklad, PATHS } from '../../types/IServerData'
import SkladItemCard from '../Cards/SkladItemCard'
import { useFetchApi } from '../../http/useFetchApi'



export const PageTesting: FC = (): JSX.Element => {
    // const [items, setItems] = useState<ISklad[]>([])
    const { data, isLoading, error } = useFetchApi(PATHS.SKLAD)
    const [sklads, setSklads] = useState<ISklad[]>([])
    useEffect(() => {
        const sorted = data.sort((a, b) => (a.type?.name.localeCompare(b.type?.name)))
        setSklads(sorted)
    }, [data])

    if (error) return (<Text fontSize={'9xl'}>ERROR: {error}</Text>)

    return (
        <Container
            display={'flex'}
            bgColor={'gray.100'}
            maxH={'100vh'}
            maxW={'container.2xl'}
            justifyContent='flex-start'
            flexDir={'row'}
            alignItems='start'
        // alignContent={'center'}
        >

            {/* <Box className=' blue darken-2'
                maxHeight={'90vh'}>
                <Heading textAlign={'center'}>Products Form</Heading>
            </Box> */}

            <Box
                // className=' blue lighten-2'
                textAlign={'center'}
                maxHeight='100vh'
                width={'100%'}
            >

                <Heading paddingBottom='0'>Складские остатки
                </Heading>


                {
                    isLoading ? <Spinner
                        size={'xl'}
                        emptyColor='red lighten-2'
                        color='black'
                        speed='0.65s'
                        thickness='7px' />
                        :
                        <Wrap spacing={'0px'}>
                            {sklads?.map(s =>
                                <WrapItem key={s.id}>
                                    <SkladItemCard {...s} id={s.id} />
                                </WrapItem>
                            )}
                        </Wrap>
                }

            </Box>



        </Container>
    )
}
