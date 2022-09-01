import { FC, useEffect, useState } from 'react'
import { Box, Container, Heading, Spinner, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { ISklad, PATHS } from '../../types/IServerData'
import SkladItemCard from '../Cards/SkladItemCard'
import { useFetchApi } from '../../http/useFetchApi'
import { IWarehouse } from './PageTesting'
import WarehouseItemCard from '../Cards/WhItemCard'

export const getNumb = (name: string): number => {
    const signs = name.split("")
    const numb = signs.map(char => isNaN(parseInt(char, 10)) ? null : char).join("")
    return parseInt(numb, 10)
}

export const SkladPage: FC = (): JSX.Element => {
    // const [items, setItems] = useState<ISklad[]>([])
    const [data, isLoading, error] = useFetchApi(PATHS.SKLAD)
    const [sklads, setSklads] = useState<ISklad[]>([])
    const [warehouse, isLoadingWH, errorWH] = useFetchApi(PATHS.WAREHOUSE)
    const [whs, setWhs] = useState([] as IWarehouse[])

    useEffect(() => {
        const sortedByTypeName = warehouse.sort((a, b) => {
            const [nameA, nameB] = [a.typename, b.typename]
            const na = getNumb(nameA);
            const nb = getNumb(nameB);
            return na - nb
        })
        setWhs(sortedByTypeName)
    }, [warehouse])

    if (errorWH) return (<Text fontSize={'9xl'}>ERROR: {errorWH}</Text>)

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
                    isLoadingWH ? <Spinner
                        size={'xl'}
                        emptyColor='red.500'
                        color='black.300'
                        speed='0.65s'
                        thickness='6px' />
                        :
                        <Wrap spacing={'0px'}>
                            {whs?.map(s =>
                                <WrapItem key={s.id}>
                                    <WarehouseItemCard {...s} id={s.id} />
                                </WrapItem>
                            )}
                        </Wrap>
                }

            </Box>



        </Container>
    )
}
