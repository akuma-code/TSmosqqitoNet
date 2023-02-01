import { chakra, Tooltip } from '@chakra-ui/react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { useCheckbox } from '@chakra-ui/react';
import React from 'react';
import { BiChevronDownCircle, BiCircle } from 'react-icons/bi';

type CustomCbProps = {
    step: { text: string; isChecked: boolean; id: string; };
    ClickFn: (id: string) => void;
};
export const CustomCheckbox: React.FC<CustomCbProps> = ({ step, ClickFn }) => {
    const { getCheckboxProps, getInputProps, getLabelProps, htmlProps } = useCheckbox();

    return (
        <Tooltip
            label={step.text}
            hasArrow
            arrowSize={20}
        >

            <chakra.label
                display='flex'
                flexDirection='row'
                alignItems='center'
                gridColumnGap={2}
                maxW='36'
                bg={step.isChecked ? 'transparent' : 'transparent'}
                // border='1px solid'
                borderColor='red.500'
                rounded='lg'
                px={2}
                py={1}
                cursor='pointer'
                {...htmlProps}
            >
                <input {...getInputProps()} hidden onChange={() => ClickFn(step.id)} checked={step.isChecked} />
                <Flex
                    alignItems='center'
                    justifyContent='center'
                    w={8}
                    h={8}
                    {...getCheckboxProps()}
                >
                    <Box w={20} border='2px inset' bgColor={step.isChecked ? 'red.900' : ''}
                        rounded={'xl'}
                    > {step.isChecked ? <BiChevronDownCircle size={40} /> : <BiCircle size={40} />}</Box>
                </Flex>
                <Text color="whiteAlpha.900" {...getLabelProps()} ml={2}>{ }</Text>
            </chakra.label>
        </Tooltip>
    );
};
