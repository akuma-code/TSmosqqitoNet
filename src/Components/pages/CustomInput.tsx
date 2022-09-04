import { Button, Editable, EditableInput, EditablePreview, HStack, Input } from '@chakra-ui/react';
import { IWarehouse } from '../../types/WarehouseTypes';
import { EditableControls } from './PageTesting';
import React, { HTMLAttributes } from 'react'
export type CustomInputProps<T> = {
    children?: React.ReactNode
    props?: any
    changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
    active?: IWarehouse
    value?: T

} & HTMLAttributes<HTMLInputElement>

export const CustomInput: React.FC<CustomInputProps<string>> = ({ active, changeHandler, value }): JSX.Element => {
    return (
        <Editable
            width={'90%'}
            textAlign='center'
            fontSize='2xl'
            isPreviewFocusable={false}
            value={value}
        >
            <HStack justifyContent='flex-start'>

                <EditablePreview
                    fontSize={'1.3em'}
                    fontWeight='bold'
                    minW={'30%'} className='blue-text  text-darken-4 waves-effect waves-light btn-flat' />
                <Input bg={'cyan'}
                    as={EditableInput}
                    onChange={changeHandler} />
                <EditableControls />
            </HStack>
        </Editable>)
}
