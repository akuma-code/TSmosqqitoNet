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


    // console.log('isChanged', isChanged('price'))
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
                    fontWeight={field && isChanged(field) ? 'bold' : 'normal'}
                    minW={'30%'} className='blue-text  text-darken-4 waves-effect waves-light btn-flat' />
                <Input bg={'cyan'}
                    as={EditableInput}
                    onChange={changeHandler} />
                <EditableControls />
            </HStack>
        </Editable>)
}
export const CustomFileInput: React.FC<CustomInputProps<string>> = ({ active, changeHandler, value }): JSX.Element => {
    const { host } = useContext(HostContext)
    const fileref = useRef<HTMLInputElement>(null)
    // console.log('isChanged', isChanged('price'))
    return (
        <Editable
            width={'90%'}
            textAlign='center'
            fontSize='2xl'
            isPreviewFocusable={false}
            defaultValue={value}
        >
            <HStack justifyContent='flex-start'>
                <Image
                    className='mx1 my1'
                    border='2px solid grey'
                    alt='No IMAGE'
                    borderRadius={'lg'}
                    maxHeight={'5em'}
                    src={`${host}${active.img_main || 'noimage.jpg'}`}
                    onClick={() => fileref.current && fileref.current.click()} />
                {/* <EditablePreview
                    fontSize={'1.3em'}
                    fontWeight='normal'
                    minW={'30%'} className='blue-text  text-darken-4 waves-effect waves-light btn-flat' /> */}

                <Input bg={'cyan'}
                    // as={EditableInput}
                    onChange={changeHandler}
                    type='file'
                    // visibility={'hidden'}
                    ref={fileref} />
                {/* <Button
                    as={IconButton}
                    size='sm'
                    icon={<EditIcon as={AiFillEdit}
                        fontSize={'xl'} />}
                /> */}
                {/* <EditableControls /> */}
            </HStack>
        </Editable>)
}

export function EditableControls(props: any): JSX.Element {
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
        <Flex >
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