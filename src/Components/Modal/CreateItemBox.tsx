import { Button, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { createWhItem } from '../../http/ClientSkladApi'

import { StrNum } from '../../types/WarehouseTypes'
import { CustomFileInput } from '../pages/CustomFileInput'
import { IFields } from '../pages/CustomInput'
import { IEditableForm } from '../pages/PageTesting'


export interface ICreateForm {
    typename: string
    price?: StrNum & ""
    quant?: StrNum & ""
    file_main?: Blob
    file_sec?: Blob
    src_main?: string
    src_sec?: string
}

interface CreateItemBoxProps {
    children?: React.ReactNode
    onFinish?: () => void

}



export const CreateItemBox: React.FC<CreateItemBoxProps> = ({ onFinish }) => {
    const [createForm, setCreateForm] = useState<ICreateForm & {}>({} as ICreateForm)
    const [files, setFiles] = useState<IEditableForm & {}>({} as IEditableForm)
    const AddFiles = (e: any, type: string) => {
        const target = e.target
        setFiles((prev: any) => ({
            ...prev,
            [type]: target.files[0],
        }))

    }
    const ADD_TO_FORM = (field: keyof IFields, e: React.ChangeEvent<HTMLInputElement>) => {
        setCreateForm(prev => ({ ...prev, [field]: e.target.value }))
    }
    const onCreate = () => {
        const form = new FormData()
        form.append('typename', createForm.typename);
        createForm.price && form.append('price', createForm.price);
        createForm.quant && form.append('quant', createForm.quant);
        files.file_main && form.append('file_main', files.file_main);
        files.file_sec && form.append('file_sec', files.file_sec);
        createWhItem(form)
        onFinish && onFinish()
    }
    return (
        <VStack align={'stretch'}>
            <fieldset style={{ border: "1px solid red" }}
                className='p1'
            >
                <legend>
                    Название
                </legend>
                <input
                    type={'text'}
                    onChange={(e) => ADD_TO_FORM('typename', e)}
                    value={createForm.typename}
                />
            </fieldset>
            <fieldset style={{ border: "1px solid red" }}
                className='p1'
            >
                <legend>
                    Цена
                </legend>
                <input type={'text'}
                    onChange={(e) => ADD_TO_FORM('price', e)}
                    value={createForm.price || ""}
                />
            </fieldset>
            <fieldset style={{ border: "1px solid red" }}
                className='p1'
            >
                <legend>
                    Количество
                </legend>
                <input type={'text'}
                    onChange={(e) => ADD_TO_FORM('quant', e)}
                    value={createForm.quant || ""}
                />
            </fieldset>
            <CustomFileInput
                selectFile={(e) => AddFiles(e, 'file_main')}
            >
                Загрузить основное изображение
            </CustomFileInput>
            <CustomFileInput
                selectFile={(e) => AddFiles(e, 'file_sec')}
            >
                Загрузить дополнительное изображение
            </CustomFileInput>
            <Button
                className='mt1'
                variant='outline'
                colorScheme='orange'
                onClick={onCreate}
            >
                Добавить изделие
            </Button>
        </VStack>
    )
}
