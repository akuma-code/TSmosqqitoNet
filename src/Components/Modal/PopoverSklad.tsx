import React, { HTMLAttributes } from 'react'
import { Button, Icon, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverProps, PopoverTrigger, Wrap, WrapItem } from '@chakra-ui/react'
import { IoAppsOutline } from 'react-icons/io5'
import { ISklad } from '../../types/IServerData'


export type PopoverSkladProps = {
    sklads: ISklad[]
    children?: React.ReactNode
} & HTMLAttributes<PopoverProps>

export const PopoverSklad: React.FC<PopoverSkladProps> = ({ sklads, children }) => (

    <Popover
        placement='auto'
        closeOnBlur
    >
        <PopoverTrigger>
            <Button>Скопировать со склада</Button>
        </PopoverTrigger>
        <PopoverContent>
            <PopoverHeader fontWeight='bold' border='0'>
                Что копируем?
            </PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
                <Wrap>
                    {sklads.map(s => (
                        <WrapItem key={s.id} >
                            <Button className='btn btn-outline blue-text text-darken-3'><Icon as={IoAppsOutline} w={7} />{s.type.name}</Button>
                        </WrapItem>
                    ))}
                </Wrap>
            </PopoverBody>
            <PopoverFooter
                border='0'
                display='flex'
                alignItems='center'
                justifyContent='space-between'

            >
                <Button
                    colorScheme={'blue'}
                >
                    GO!
                </Button>

            </PopoverFooter>
        </PopoverContent>
    </Popover>)