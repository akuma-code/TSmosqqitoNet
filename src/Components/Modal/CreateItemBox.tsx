import { Button, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { createWhItem } from '../../http/ClientSkladApi'

import { IWarehouse, StrNum } from '../../types/WarehouseTypes'
import { CustomFileInput } from '../pages/CustomFileInput'
import { IFields } from '../pages/CustomInput'
import { IEditableForm } from '../pages/PageTesting'


export interface ICreateForm {
    typename: string
    price: StrNum & ""
    quant: StrNum & ""
    file_main?: Blob
    file_sec?: Blob
    src_main?: string
    src_sec?: string
}

interface CreateItemBoxProps {
    children?: React.ReactNode
    onFinish?: () => void

}
const initialFormValues = {
    typename: "",
    price: "",
    quant: ""
} as const
type F = keyof IFields

export const CreateItemBox: React.FC<CreateItemBoxProps> = ({ onFinish }) => {
    const [createForm, setCreateForm] = useState<ICreateForm>(initialFormValues)
    const [files, setFiles] = useState<IEditableForm & {}>({} as IEditableForm)
    const AddFiles = (e: any, type: string) => {
        const target = e.target
        setFiles((prev: any) => ({
            ...prev,
            [type]: target.files[0],
        }))

    }
    const FIELDS: F[] = ['typename', 'price', 'quant']
    const TITLES: string[] = ['Название', "Цена", "Количество"]
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
        <VStack align={'stretch'} className='p1'>
            <>
                {FIELDS.map((field: keyof ICreateForm & F, idx: number) => {
                    return (
                        <fieldset style={{ border: "1px solid red" }}
                            className='p1'
                            key={idx}
                        >
                            <legend>
                                {TITLES[idx]}
                            </legend>
                            <input
                                type={'text'}
                                onChange={(e) => ADD_TO_FORM(field, e)}
                                value={createForm[field]}
                            />
                        </fieldset>
                    )
                })}

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
                    variant='solid'
                    colorScheme='orange'
                    onClick={onCreate}
                >
                    Добавить изделие
                </Button>
            </>

        </VStack>
    )
}

