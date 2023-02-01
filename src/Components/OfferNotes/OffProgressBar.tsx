import { Button, IconButton } from '@chakra-ui/button'
import { Box, Text } from '@chakra-ui/layout'
import { Progress } from '@chakra-ui/progress'
import { Checkbox, CheckboxGroup, CheckboxIcon, Tooltip } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { BiChevronDownCircle, BiChevronRightCircle, BiCircle } from 'react-icons/bi'
import { useID } from '../../hooks/useID'
import { checkboxTheme } from './CbxTheme'
type OffProgressBarProps = {
    children?: React.ReactNode
    steps: string[]
}

export const OffProgressBar: React.FC<OffProgressBarProps> = ({ children, steps }) => {
    const _id = useID
    const stepCount = steps.length
    const [stepsState, setStepsState] = useState(steps.map(s => ({ isChecked: false, text: s, id: _id() })))
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

            <Progress size={'md'} colorScheme={'blue'} value={60} height={'100%'} bgColor={'lightblue'} rounded='md' hasStripe />
            <Box pos={'absolute'} top={0} display={'flex'} justifyContent='space-between' width={'100%'} height={'100%'}>
                <CheckboxGroup >

                    {stepsState.map(ss =>
                        <Tooltip label={ss.text}
                            key={ss.id}
                            hasArrow
                            arrowSize={15}
                        >
                            <Checkbox
                                // icon={ss.isChecked ? <BiChevronDownCircle size={30} /> : <BiCircle size={30} />}
                                isChecked={ss.isChecked}
                                onChange={() => setStepsState(prev => prev.map(st => st.id === ss.id ? ({ ...st, isChecked: !st.isChecked }) : st))}
                                iconColor={'red.700'}
                                isIndeterminate={true}

                            >
                                <CheckboxIcon as={BiChevronDownCircle} />
                            </Checkbox>
                        </Tooltip>
                    )}
                </CheckboxGroup>
            </Box>

        </Box>
    )
}