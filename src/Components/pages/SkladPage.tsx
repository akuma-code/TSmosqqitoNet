import { FC, useEffect, useState } from 'react'
import { Box, Container, Flex, Heading, Portal, Spinner, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { PATHS } from '../../types/IServerData'
import { useFetchApi } from '../../http/useFetchApi'
import WarehouseItemCard from '../Cards/WhItemCard'
import { IWarehouse } from '../../types/WarehouseTypes'
import { RunAutoCompleteTasks } from '../../http/ClientSkladApi'

export const getNumb = (name: string): number => {
    const signs = name.split("")
    const numb = signs.map(char => isNaN(parseInt(char, 10)) ? null : char).join("")
    return parseInt(numb, 10)
}

export const SkladPage: FC = (): JSX.Element => {
    const [warehouse, setWh, isLoadingWH, errorWH] = useFetchApi<IWarehouse>(PATHS.WAREHOUSE)
    const [whs, setWhs] = useState([] as IWarehouse[])

    const sortedByTypeName = [...warehouse].sort((a, b) => {
        const [nameA, nameB] = [a.typename, b.typename]
        const na = getNumb(nameA);
        const nb = getNumb(nameB);
        return na - nb
    })

    useEffect(() => {
        setWhs(sortedByTypeName)
        return () => {
            console.log("AutoFinish Done!");
            RunAutoCompleteTasks(0)
        }
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
        >


            <Box
                // className=' blue lighten-2'
                textAlign={'center'}
                maxHeight='100vh'
                width={'100%'}
            >
                {
                    isLoadingWH ? <Spinner
                        size={'xl'}
                        emptyColor='red.500'
                        color='green.300'
                        speed='0.35s'
                        thickness='6px' />
                        :
                        <Flex
                            direction={'column'}
                            flexWrap='wrap'
                            alignContent='flex-start'
                            maxHeight={'100vh'}
                        >
                            {whs?.map(s =>
                                <WarehouseItemCard {...s} key={s.id} />
                            )}
                        </Flex>
                }

            </Box>



        </Container>
    )
}
