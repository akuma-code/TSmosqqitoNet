import { Button, ButtonGroup, Editable, EditableInput, EditablePreview, Flex, HStack, IconButton, Image, Input, useEditableControls } from '@chakra-ui/react';

import React, { HTMLAttributes, useContext, useRef } from 'react'
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { AiFillEdit } from 'react-icons/ai';
import { AddedValues } from './PageTesting';
import { HostContext } from '../../App';
export type CustomInputProps<T> = {
    children?: React.ReactNode
    props?: any
    changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
    active: AddedValues
    value?: T
    field?: string

} & HTMLAttributes<HTMLInputElement>



export const CustomInput: React.FC<CustomInputProps<string>> = ({ active, changeHandler, value, field }): JSX.Element => {

    const isChanged = (field: string): boolean => {
        if (!active[field + '_new']) return false
        const res = active[field] !== active[field + '_new'];
        // console.log(active[field], active[field + '_new']);
        return res
    }
    const getLabel = (field: string) => {
        const result = { label: "" }
        switch (field) {
            case 'typename':
                result.label = 'Тип'
                break;
            case 'price':
                result.label = 'Цена';
                break;
            case 'quant':
                result.label = 'Кол-во';
                break;
            default:
                result.label = 'Изменить'
                break;
        }
        const { label } = result
        return label
    }

    // console.log('isChanged', isChanged('price'))
    return (
        <Editable
            width={'90%'}
            textAlign='center'
            fontSize='2xl'
            isPreviewFocusable={false}
            value={value}
        >
            <HStack justifyContent='space-between'>

                <EditablePreview
                    fontSize={'1.3em'}
                    fontWeight={field && isChanged(field) ? 'bold' : 'normal'}
                    minW={'30%'}
                    className='blue-text  text-darken-4 waves-effect waves-light btn-flat'
                />
                <Input bg={'cyan'}
                    as={EditableInput}
                    onChange={changeHandler} />
                <EditableControls label={field && getLabel(field)} />
            </HStack>
        </Editable>)
}
export function EditableControls(props: any): JSX.Element {

    const { label } = props
    const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
        <ButtonGroup justifyContent='space-between' size='sm'>

            <Button
                {...getSubmitButtonProps()}
                as={IconButton}
                icon={<CheckIcon fontSize={'xl'} />}
            />
            <Button
                {...getCancelButtonProps()}
                as={IconButton}
                icon={<CloseIcon fontSize={'xl'} />}
            />
        </ButtonGroup>
    ) : (
        <Flex gap={2}>
            <span>{label}</span>
            <Button
                {...getEditButtonProps()}
                as={IconButton}
                size='sm'
                icon={<EditIcon as={AiFillEdit}
                    fontSize={'xl'} />}
            />
        </Flex>
    )
}