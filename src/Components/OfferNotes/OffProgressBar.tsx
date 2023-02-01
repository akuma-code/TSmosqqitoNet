import { useCheckboxGroup } from '@chakra-ui/react'
import { Button, IconButton } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import { Progress } from '@chakra-ui/progress'
import { Checkbox, CheckboxGroup, CheckboxIcon, Tooltip } from '@chakra-ui/react'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { BiChevronRightCircle } from 'react-icons/bi'
import { useID } from '../../hooks/useID'
import { checkboxTheme } from './CbxTheme'
import { Icon } from '@chakra-ui/icon'
import { CustomCheckbox } from './CustomCheckbox'
type OffProgressBarProps = {
    children?: React.ReactNode
    steps: { text: string, isChecked: boolean, id: string }[]
    toggle: (id: string) => void
    progBarValue: number
}

export const OffProgressBar: React.FC<OffProgressBarProps> = ({ progBarValue, steps, toggle }) => {

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

            <Progress size={'md'} colorScheme={'blue'} value={progBarValue} height={'100%'} bgColor={'lightblue'} rounded='md' hasStripe />
            <Box pos={'absolute'} top={0} display={'flex'} justifyContent='space-between' width={'100%'} height={'100%'}>
                <CheckboxGroup >

                    {steps.map(ss =>

                        <CustomCheckbox step={ss} key={ss.id} ClickFn={toggle} />
                    )}
                </CheckboxGroup>
            </Box>

        </Box>
    )
}
