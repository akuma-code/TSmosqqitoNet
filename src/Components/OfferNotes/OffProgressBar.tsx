import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import { Progress } from '@chakra-ui/progress'
import React from 'react'

type OffProgressBarProps = {
    children?: React.ReactNode
}

export const OffProgressBar: React.FC<OffProgressBarProps> = ({ children }) => {


    return (
        <Box
            bgColor={'red.400'}
            zIndex={4}
            height={'3rem'}
            width={'100vw'}
            alignItems={'center'}
            justifyContent={'center'}
            pos={'relative'}
            rounded='md'
        >

            <Progress size={'lg'} colorScheme={'blue'} value={60} height={'3rem'} bgColor={'lightblue'} rounded='md' />
            <Box pos={'absolute'} top={0} display={'flex'} justifyContent='space-between' width={'100%'} height={'3rem'}>
                {children}
            </Box>

        </Box>
    )
}