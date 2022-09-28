/* eslint-disable @typescript-eslint/no-unused-vars */
import { TiDatabase, TiHomeOutline } from "react-icons/ti";
import { GiFactory } from "react-icons/gi";
import { TbCurrencyRubel } from 'react-icons/tb'
import {
    Badge,
    Box,
    Container,
    Heading,
    Icon,
    Image,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    Stat,
    StatGroup,
    StatHelpText,
    StatLabel,
    StatNumber,
    Text,
    VStack
} from '@chakra-ui/react'
import React, { HTMLAttributes, useContext } from 'react'
import { HostContext } from '../../App'
import { IToggleFuncs, useToggle } from '../../hooks/useToggle'
import { ISklad } from '../../types/IServerData'
import { I } from './I'
import { IWarehouse } from "../../types/WarehouseTypes";
import { INFOBOX } from "./WhControlCard";
import { WhInfo } from "../../types/WHTypes";


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
} & HTMLAttributes<HTMLDivElement> & IWarehouse & { prod_info?: WhInfo[] }

const WarehouseItemCard: React.FC<WarehouseItemProps> = (whItem) => {
    const [isHoverImg, setHoverStateImg] = useToggle()
    const [isHoverInfo, setHoverStateInfo] = useToggle()
    const hasProd = whItem.prod_info!.length >= 1 ? true : false
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
            position='relative'
        >
            <Box alignItems='center' display={'flex'} margin='.5rem'>

                <PopImage
                    host={host}
                    isHover={isHoverImg}
                    setHoverState={setHoverStateImg}
                    whItem={whItem}
                />
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
                    <VStack>

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
                            // onMouseEnter={setHoverStateInfo.on}
                            // onMouseLeave={setHoverStateInfo.off}
                            >
                                <span>{whItem.typename}</span>
                                <span>{whItem.quant} шт.</span>
                            </Heading>
                        </InfoPOP>
                    </VStack>
                </StatGroup>
            </Box>


            {
                hasProd &&
                <Badge
                    className="btn"
                    borderRadius={10}
                    position='absolute'
                    right={4}
                    top={1}
                    // colorScheme='whatsapp'
                    display={'flex'}
                    flexDir={'row-reverse'}
                    alignItems='center'
                    gap={1}
                    border='solid black'
                    borderWidth={2}
                    paddingRight={2}
                    bg='#d8d8d8'
                    boxShadow={'3px 3px #0000006f'}
                    onClick={setHoverStateInfo.toggle}
                    cursor={'pointer'}
                    _hover={{
                        border: "solid white",
                        width: "transform(skaleX)"
                    }}
                >
                    <Text fontSize={25} color='grey.700'>{whItem.prod_info?.length}</Text>
                    <Icon
                        width={25}
                        height={25}
                        // w={13}
                        //  h={13}
                        as={GiFactory} />
                </Badge>
            }
        </Box >
    )




}

export type SkladPopoverProps = {
    children?: React.ReactNode,
    isHover: boolean,
    setHoverState: IToggleFuncs,
    whItem: IWarehouse & { prod_info?: WhInfo[] },
    host: string,
}

export const InfoPOP: React.FC<SkladPopoverProps> = ({ isHover, whItem, children, setHoverState }) => {
    return (
        <Popover isOpen={isHover}
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
                        <PopoverCloseButton onClick={setHoverState.off}
                            colorScheme='blackAlpha'
                        />
                        <div className=" flex-row-between px2">
                            <div><b>Количество</b></div>
                            <div><b >Дата готовности</b></div>
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





const PopImage: React.FC<SkladPopoverProps> = ({ isHover, setHoverState, whItem, host }) => {
    const hasProd = !!whItem.prod_info

    return (
        <Popover
            isOpen={isHover}
            closeOnBlur
        >
            <PopoverTrigger>
                <Image
                    alt='No IMAGE'
                    borderRadius={'lg'}
                    maxHeight={'9em'}
                    onMouseEnter={setHoverState.on}
                    onMouseLeave={setHoverState.off}
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
                            <div><Icon as={TbCurrencyRubel} /><b>{whItem.price} руб.</b></div>
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
        </Popover>)
}



export default WarehouseItemCard