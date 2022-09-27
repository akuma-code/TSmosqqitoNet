/* eslint-disable @typescript-eslint/no-unused-vars */
import { TiDatabase, TiHomeOutline } from "react-icons/ti";
import { IoLogoUsd } from 'react-icons/io'
import {
    Box,
    Container,
    Heading,
    Icon,
    Image,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    Stat,
    StatGroup,
    StatHelpText,
    StatLabel,
    StatNumber
} from '@chakra-ui/react'
import React, { HTMLAttributes, useContext } from 'react'
import { HostContext } from '../../App'
import { IToggleFuncs, useToggle } from '../../hooks/useToggle'
import { ISklad } from '../../types/IServerData'
import { I } from './I'
import { IWarehouse } from "../../types/WarehouseTypes";
import { INFOBOX } from "./WhControlCard";


const onHover = (cond: boolean) => {
    function changeCls(initial: string, newCls: string) {
        if (cond) return [initial, newCls].join(" ")
        else return initial
    }

    return { changeCls }
}
export type WarehouseItemProps = {
    children?: React.ReactNode
    id: number | string
} & HTMLAttributes<HTMLDivElement> & IWarehouse

const WarehouseItemCard: React.FC<WarehouseItemProps> = (whItem) => {
    const [isHover, setHoverState] = useToggle()
    const [isHoverImg, setHoverStateImg] = useToggle()
    const [isHoverInfo, setHoverStateInfo] = useToggle()
    const HoverHandler = onHover(isHover).changeCls('m1 z-depth-3', 'blue accent-2')

    const { host } = useContext(HostContext) || ""
    return (
        <Box className={'m1 z-depth-3'}
            maxHeight='10em'
            display='flex'
            flexDir='row'
            border='2px'
            borderRadius='md'
            justifyContent={'space-between'}
            alignItems='stretch'
            padding='.6em'
            bgColor={'gray.500'}
        >
            <Box alignItems='center' display={'flex'} margin='.5rem'>

                {ImagePO()}
            </Box>
            <Box >


                <StatGroup className='mx1'
                    bgColor={'gray.300'}
                    border='2px solid white'
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

                    <Stat className='m1' textAlign='center'>
                        <StatLabel>Наименование:</StatLabel>
                        <StatNumber>{whItem.typename}</StatNumber>
                        <StatHelpText
                            color={'red'}
                            fontWeight={'semibold'}
                            fontSize={'2xl'}
                        >{whItem.price} руб.</StatHelpText>
                    </Stat>
                    <InfoPOP
                        whItem={whItem}
                        host={host}
                        isHover={isHoverInfo}
                        setHoverState={setHoverStateInfo}


                    >

                        <Heading className='mr1'
                            alignItems={'center'}
                            display='flex'
                            flexDir={'column'}
                            onMouseEnter={setHoverStateInfo.on}
                            onMouseLeave={setHoverStateInfo.off}
                        >
                            {whItem.quant} шт.
                        </Heading>
                    </InfoPOP>
                </StatGroup>
            </Box>



        </Box >
    )

    function ImagePO() {
        return <Popover isOpen={isHoverImg}
            closeOnBlur
        >
            <PopoverTrigger>
                <Image
                    alt='No IMAGE'
                    borderRadius={'lg'}
                    maxHeight={'9em'}
                    onMouseEnter={setHoverStateImg.on}
                    onMouseLeave={setHoverStateImg.off}
                    src={`${host}${whItem.img_main || 'noimage.jpg'}`} />
            </PopoverTrigger>
            <Portal>
                <PopoverContent minWidth={'55em'}
                    border='6px indigo'
                    borderStyle='groove'
                    borderRadius='lg'
                >
                    <PopoverArrow bgColor={'indigo '} />
                    <PopoverHeader fontSize={'3xl'}
                        className="indigo lighten-4 z-depth-4"
                        borderRadius={'md'}
                    >
                        <div className="w100 flex-row-between  ">
                            <div><b><Icon as={TiDatabase} /></b><b>{whItem.typename}</b></div>
                            <div><Icon as={TiHomeOutline} /><b> {whItem.quant} шт.</b></div>
                            <div><Icon as={IoLogoUsd} /><b>{whItem.price} руб.</b></div>
                        </div>
                    </PopoverHeader>
                    <PopoverBody
                        className="blue accent-1"
                    >
                        <Image
                            alt='No IMAGE'
                            borderRadius={'lg'}
                            src={`${host}${whItem.img_sec || 'noimage.jpg'}`} />
                    </PopoverBody>

                </PopoverContent>
            </Portal>
        </Popover>;
    }
}

export type InfoPopsProps = {
    children?: React.ReactNode,
    isHover: boolean,
    setHoverState: IToggleFuncs,
    host: string,
    whItem: IWarehouse
}

export const InfoPOP: React.FC<InfoPopsProps> = ({ isHover, setHoverState, host, whItem, children }) => {
    return (<Popover isOpen={isHover}
        closeOnBlur
    >
        <PopoverTrigger>
            {children}
        </PopoverTrigger>
        <Portal>
            <PopoverContent minWidth={'25em'}
                border='6px indigo'
                borderStyle='groove'
                borderRadius='lg'
            >
                <PopoverArrow bgColor={'indigo '} />
                <PopoverHeader fontSize={'xl'}
                    className="indigo lighten-4 z-depth-4"
                    borderRadius={'md'}
                >
                    <div className="w100 flex-row-between  ">
                        <div><b>Количество</b></div>
                        <div><b>Дата готовности</b></div>
                    </div>
                </PopoverHeader>
                <PopoverBody
                    className="blue accent-1"
                >
                    <INFOBOX whItem={whItem} hidebtn={true} />
                </PopoverBody>

            </PopoverContent>
        </Portal>
    </Popover>);
}



export default WarehouseItemCard