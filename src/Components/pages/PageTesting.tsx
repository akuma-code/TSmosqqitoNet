import { Box, Button, Container, IconButton, Image, NumberInput, NumberInputField, Spinner, Text, Wrap, WrapItem } from '@chakra-ui/react'
import React, { FC, useContext, useEffect, useState } from 'react'
import { HostContext } from '../../App'
import { useFetchApi } from '../../http/useFetchApi'
import { ISklad, IType, PATHS } from '../../types/IServerData'
import { I } from '../Cards/I'
import SkladItemCard from '../Cards/SkladItemCard'
import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdOutlineSave } from 'react-icons/md'
interface ISkladForm {
    id?: number
    quant?: number
    typeId?: string
    shopId?: string
}

interface ITypeForm {
    id?: number
    name?: string
    img?: string
    secondaryImg?: string
    infos?: any[]
}

interface IShopForm {
    id?: number
    title?: string
    price?: number
}
export const PageTesting: FC = (): JSX.Element => {

    const [skladform, setSkladform] = useState<ISkladForm>({})
    const [shopform, setShopform] = useState<IShopForm>({})
    const [typeform, setTypeform] = useState<ITypeForm>({})
    const { data, isLoading, error } = useFetchApi(PATHS.SKLAD)
    const [sklads, setSklads] = useState([] as ISklad[])
    const { host } = useContext(HostContext)
    const server_url = host + "/"
    useEffect(() => {
        setSklads(data)


    }, [data])


    if (error) return (
        <>
            <Text fontSize={'6xl'}>ERROR: {error}</Text>
        </>
    )

    return (
        <div className="row">
            <div className="col s3">
                <Container>
                    {
                        isLoading && <Spinner
                            size={'xl'}
                            emptyColor='red.500'
                            color='black.300'
                            speed='0.65s'
                            thickness='6px' />
                    }
                    <Wrap spacing={'0px'}>
                        {sklads?.map(s =>
                            <WrapItem key={s.id}>
                                <Box className={'m1 z-depth-3'}
                                    maxHeight='7rem'
                                    display='flex'
                                    flexDir='row'
                                    border='2px'
                                    borderRadius='lg'
                                    justifyContent={'space-between'}
                                    alignItems='stretch'
                                    padding='.5em'
                                    margin='.3em'
                                    bgColor={'gray.500'}
                                >
                                    <Image
                                        alt='No IMAGE'
                                        borderRadius={'lg'}
                                        maxHeight={'5em'}
                                        src={`${server_url}${s.type?.img || 'noimage.jpg'}`}
                                    />
                                    <Box
                                        maxWidth={'15em'}
                                        display='flex'
                                        flexDir='column'

                                    >
                                        <div className="flex-row mx1 w100">
                                            <IconButton aria-label='plus' icon={<MdKeyboardArrowDown />} />
                                            <NumberInput size='xs' maxW={5}>
                                                <NumberInputField />
                                            </NumberInput>
                                            <IconButton aria-label='minus' icon={<MdKeyboardArrowUp />} />
                                        </div>
                                        <div className="flex-row mx1">
                                            <NumberInput size='xs' w={15}>
                                                <NumberInputField />
                                            </NumberInput>
                                            <IconButton aria-label='save price' icon={<MdOutlineSave />} />
                                        </div>
                                    </Box>
                                </Box>
                            </WrapItem>
                        )}
                    </Wrap>
                </Container>
            </div>
            <div className="col s9">

            </div>
        </div>

    )
}
