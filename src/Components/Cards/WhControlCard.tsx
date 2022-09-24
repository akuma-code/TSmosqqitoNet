import { Box, Icon, IconButton, Image, Wrap, WrapItem } from '@chakra-ui/react'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import { BsCalendar2EventFill } from 'react-icons/bs'
import { FaWarehouse } from 'react-icons/fa'
import { IWarehouse } from '../../types/WarehouseTypes'
import { MdAssignment, MdDeleteForever, MdGrading, MdViewHeadline } from "react-icons/md";
import { deleteWhItem, getProdInfos } from '../../http/ClientSkladApi'
import { ModalWrap } from '../Modal/ModalWrap'
import { ProductionBox } from '../Modal/ProductionBox'
import { useToggle } from '../../hooks/useToggle'
import { WhInfo } from '../../types/WHTypes'
import { fetchApi } from '../../http/useFetchApi'
import { PATHS } from '../../types/IServerData'
import dayjs from 'dayjs'


type WhControlCardProps = {
    isActive: (id: number) => boolean,
    whItem: IWarehouse & { prod_info?: WhInfo[] },
    selectItem: (skladItem: IWarehouse) => void,
    server_url: string
    openModal: () => void
    updateGlobal?: () => void

} & HTMLAttributes<HTMLDivElement>


const INFOBOX = (whItem: IWarehouse & { prod_info?: WhInfo[] }) => {
    const DATE = (dateReady: string) => {
        const now = dayjs()


        const formatted = dayjs(now, 'DD MMMM YYYY', 'ru', true).format('DD MMMM')
        return formatted

    }
    return (
        <Box className='p1' textAlign='center'>
            {
                whItem.prod_info && whItem.prod_info?.map(i =>
                    <div key={i.id}>
                        <span >{i.count} шт.</span> || <span style={{ textTransform: "uppercase" }}>{DATE(i.dateReady)}</span>
                    </div>
                )
            }
        </Box>
    )
}

export const WhControlCard: React.FC<WhControlCardProps> = (props): JSX.Element => {
    const { isActive, whItem, selectItem, server_url, openModal, updateGlobal, ...rest } = props
    const [showProd, prodState] = useToggle()
    const [showProdInfo, infoState] = useToggle()
    const [info, setInfo] = useState<WhInfo[]>([] as WhInfo[])


    const onDelete = (id: number) => {
        const toast = global.confirm('Удалить окно навсегда?')
        if (toast) deleteWhItem(id)
        updateGlobal && updateGlobal()
    }
    const infos = async () => await fetchApi(PATHS.WHINFO).fetchAll<WhInfo[]>()
    const prodOpen = () => {
        infoState.on()
        infos().then(setInfo)

    }
    return (
        <Box
            {...rest}
            className={isActive(whItem.id) ? 'm1 z-depth-3' : 'm1 z-depth-0'}
            maxHeight='7rem'
            width={'max-content'}
            display='flex'
            flexDir='row'
            border='2px'
            borderRadius='lg'
            justifyContent={'space-between'}
            alignItems='flex-start'
            padding='.5em'
            // margin='.3em'
            bgColor={isActive(whItem.id) ? 'blue.600' : 'gray.500'}
            onClick={() => selectItem(whItem)}
            _hover={{ outline: "4px inset #6eedfd", cursor: "pointer" }}
            _after={{
                content: `"${whItem.price} руб."`,
                position: 'absolute',
                right: 0,
                bottom: '-2em',
                fontWeight: 'bolder',
                color: 'blue'
            }}
            position='relative'
        >
            <Image
                alt='No IMAGE'
                borderRadius={'lg'}
                maxHeight={'5em'}
                src={`${server_url}${whItem.img_main || 'noimage.jpg'}`} />
            <Image className='mx1'
                alt='No IMAGE'
                borderRadius={'lg'}
                maxHeight={'5em'}
                src={`${server_url}${whItem.img_sec || 'noimage.jpg'}`} />
            <Box
                className='mx1'
                display='flex'
                flexDir='column'
                fontSize={'1.8em'}

            >
                <div className="flex-row-between txt-bold w100 white-text">
                    <Icon as={BsCalendar2EventFill} color={'gray.100'} />
                    <i>{whItem.typename}</i>
                </div>
                <div className="flex-row-between  w100 txt-bold">
                    <Icon as={FaWarehouse} w={8} h={8} />
                    <i>{whItem.quant} шт.</i>
                </div>
            </Box>
            <Wrap maxWidth={'6rem'}>
                <WrapItem >
                    <IconButton
                        colorScheme='cyan'
                        bgColor={'blackAlpha.700'}
                        size={'md'}
                        variant='outline'
                        aria-label='edit item'
                        icon={<MdViewHeadline size={'30'} />}
                        onClick={() => { openModal(); selectItem(whItem) }}
                    />
                </WrapItem>
                <WrapItem>
                    <IconButton
                        // disabled
                        onClick={() => onDelete(whItem.id)}
                        colorScheme='red'
                        bgColor={'blackAlpha.700'}
                        size={'md'}
                        variant='ghost'
                        aria-label='delete item'
                        icon={<MdDeleteForever size={'30'} />}
                    />
                </WrapItem>
                <WrapItem>
                    <IconButton
                        // disabled
                        onClick={prodState.on}
                        colorScheme='cyan'
                        bgColor={'blackAlpha.700'}
                        size={'md'}
                        variant='outline'
                        aria-label='start production'
                        icon={<MdGrading size={'30'} />}
                    />
                </WrapItem>
                <WrapItem>
                    <IconButton
                        // disabled
                        onClick={prodOpen}
                        colorScheme='linkedin'
                        // bgColor={'aquamarine'}
                        size={'md'}
                        variant='ghost'
                        aria-label='show production'
                        icon={<MdAssignment size={'30'} />}
                    />
                </WrapItem>


            </Wrap>
            <ModalWrap isOpen={showProdInfo} onClose={infoState.off} title='Информация по готовности'>
                {INFOBOX(whItem)}
            </ModalWrap>
            <ModalWrap isOpen={showProd} onClose={prodState.off} title='Запустить в производство'>
                <ProductionBox item={whItem} onFinish={prodState.off} />
            </ModalWrap>
        </Box>)
}