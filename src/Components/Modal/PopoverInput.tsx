import { PopoverProps } from '@chakra-ui/react'
import React, { HTMLAttributes } from 'react'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
} from '@chakra-ui/react'

type PopoverInputProps = {
    children?: React.ReactNode | React.ReactNode[],
    rest?: any

} & HTMLAttributes<PopoverProps>


export const PopoverInput: React.FC<PopoverInputProps> = ({ children, rest }) => {


    return (
        <Popover
            placement='auto'
            closeOnBlur
        >
            <PopoverTrigger>
                {children}
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                    <input type='text' />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}
