import { Button, ButtonGroup, Editable, EditableInput, EditablePreview, Flex, HStack, IconButton, Image, Input, useEditableControls } from '@chakra-ui/react';

import React, { HTMLAttributes, useContext, useRef } from 'react'
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { AiFillEdit } from 'react-icons/ai';
import { AddedValues } from './PageTesting';
import { HostContext } from '../../App';
import { EditFields } from '../../types/WHTypes';
export type CustomInputProps<T> = {
    children?: React.ReactNode
    props?: any
    changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
    active: AddedValues
    value?: T
    field?: keyof IFields
    desc?: string

} & HTMLAttributes<HTMLInputElement>

const InitialFields = {
    typename: "",
    price: "",
    quant: "",
}

export type IFields = typeof InitialFields

const onToggleChanged = (cond: boolean) => {
    function changeAddCls(initial: string, newCls: string) {
        if (cond) return [initial, newCls].join(" ")
        else return initial
    }

    function tglCls(init: string, optT: string, optF: string) {
        const added = cond ? optT : optF
        const res = [init, added].join(" ")
        return res
    }

    return { changeAddCls, tglCls } as const
}


export const CustomInput: React.FC<CustomInputProps<string>> = ({ active, changeHandler, value, field }): JSX.Element => {

    const isChanged = (field: keyof IFields): boolean => {
        const [val, newval] = [field, field + '_new']
        // console.log('val: ', val)
        // console.log('newval: ', newval)
        if (!newval) return false
        // if (!active[field + '_new']) return false
        if (active[newval]) return active[val] !== active[newval];
        else return false
    }

    const getLabel = (field: keyof EditFields) => {
        const result = { label: "", desc: "" }
        switch (field) {
            case 'typename':
                result.label = 'Тип'
                result.desc = ""
                break;
            case 'price':
                result.label = 'Цена';
                result.desc = "руб."
                break;
            case 'quant':
                result.label = 'Кол-во';
                result.desc = "шт."
                break;
            default:
                result.label = 'Изменить'
                result.desc = ""
                break;
        }
        const { label, desc } = result
        return { label, desc } as const
    }
    const init_text = ' waves-effect waves-light btn-flat text-accent-4'
    const true_text = 'deep-purple-text cyan lighten-2'
    const false_text = 'black-text'
    const textCls = field && [init_text, isChanged(field) ? true_text : false_text].join(" ")
    const desc_txt = field && getLabel(field).desc
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
                {field &&
                    <EditablePreview
                        fontSize={'.9em'}
                        fontWeight={isChanged(field) ? 'bold' : 'normal'}
                        minW={'40%'}
                        alignContent={'center'}
                        // className='blue-text  text-darken-4 waves-effect waves-light btn-flat'
                        className={textCls}
                    />

                }
                <Flex gap={4} direction='row'>

                    <Input bg={'cyan'}
                        as={EditableInput}
                        onChange={changeHandler} />
                    <EditableControls label={field && getLabel(field).label} desc={desc_txt} />
                </Flex>


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
                    fontSize={'md'} />}
            />

        </Flex>
    )
}