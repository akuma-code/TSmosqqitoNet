import { Box, Button, ButtonGroup, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { ISklad } from '../../types/IServerData'

interface ICopyModalProps {
    skladID?: string
    onShow: boolean
    onHide(): void
    children?: React.ReactNode
    clickHandlers: {
        clickPrev: () => void
        clickNext: () => void
        clickCopy: () => void
    }

}

export const CopyModal: React.FC<ICopyModalProps> = ({ skladID, onShow, onHide, clickHandlers, children, }) => {



    return (
        <Popover
            placement='auto'
            closeOnBlur={false}
        >
            <PopoverTrigger>
                <Button>Скопировать со склада</Button>
            </PopoverTrigger>
            <PopoverContent >
                <PopoverHeader fontWeight='bold' border='0'>
                    Что копируем?
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                    {children}
                </PopoverBody>
                <PopoverFooter
                    border='0'
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'

                >
                    <Button

                    >
                        GO!
                    </Button>

                </PopoverFooter>
            </PopoverContent>
        </Popover>
    )
}
 /* <ButtonGroup size='sm'>
           <Button colorScheme='green'
               onClick={() => clickPrev()}
           >{"<<<"}</Button>
           <Button colorScheme='green'
               onClick={() => clickNext()}
           >{">>>"}</Button>

       </ButtonGroup> */