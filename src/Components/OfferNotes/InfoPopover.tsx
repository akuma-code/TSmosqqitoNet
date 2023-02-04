import { Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from '@chakra-ui/react'
import React from 'react'

type InfoPopoverProps = {
    desc: string
    target: React.ReactNode
}

export const InfoPopover = (props: InfoPopoverProps) => {
    const { desc, target } = props
    return (
        <Popover>
            <PopoverTrigger>
                {target}
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Комментарий к договору</PopoverHeader>
                <PopoverBody>{desc}</PopoverBody>
            </PopoverContent>
        </Popover>
    )
}