import { Box, Button, ButtonGroup, Icon, IconButton, Image, Wrap, WrapItem } from '@chakra-ui/react'
import React, { HTMLAttributes } from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import { BsCalendar2EventFill } from 'react-icons/bs'
import { FaWarehouse } from 'react-icons/fa'
import { IWarehouse } from '../../types/WarehouseTypes'
import { MdAssignment, MdDeleteForever, MdGrading, MdStore, MdViewHeadline } from "react-icons/md";
import { fetchApi } from '../../http/useFetchApi'
import { deleteWhItem } from '../../http/ClientSkladApi'
type WhControlCardProps = {
    isActive: (id: number) => boolean,
    whItem: IWarehouse,
    selectItem: (skladItem: IWarehouse) => void,
    server_url: string
    openModal: () => void

} & HTMLAttributes<HTMLDivElement>

export const WhControlCard: React.FC<WhControlCardProps> = (props): JSX.Element => {
    const { isActive, whItem, selectItem, server_url, openModal, ...rest } = props
    const onDelete = (id: number) => {
        const toast = global.confirm('Удалить окно навсегда?')
        if (toast) deleteWhItem(id)
    }

    const isConf = (text: string) => global.confirm(text)
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
                        icon={<MdViewHeadline size={'sm'} />}
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
                        icon={<MdDeleteForever size={'lg'} />}
                    />
                </WrapItem>
                <WrapItem>
                    <IconButton
                        // disabled
                        onClick={() => isConf('Production Start')}
                        colorScheme='cyan'
                        bgColor={'blackAlpha.700'}
                        size={'md'}
                        variant='outline'
                        aria-label='start production'
                        icon={<MdGrading size={'lg'} />}
                    />
                </WrapItem>
                <WrapItem>
                    <IconButton
                        // disabled
                        onClick={() => isConf('Production Info')}
                        colorScheme='linkedin'
                        // bgColor={'aquamarine'}
                        size={'md'}
                        variant='ghost'
                        aria-label='show production'
                        icon={<MdAssignment size={'lg'} />}
                    />
                </WrapItem>


            </Wrap>

        </Box>)
}