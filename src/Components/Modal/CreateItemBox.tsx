import { Button, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { StrNum } from '../../types/WarehouseTypes'
import { CustomFileInput } from '../pages/CustomFileInput'
import { IFields } from '../pages/CustomInput'
import { IEditableForm } from '../pages/PageTesting'


export interface ICreateForm {
    typename: string
    price?: StrNum
    quant?: StrNum
    file_main?: Blob
    file_sec?: Blob
    src_main?: string
    src_sec?: string
}

interface CreateItemBoxProps {
    children?: React.ReactNode
    onCreate: (item: ICreateForm) => void
}



export const CreateItemBox: React.FC<CreateItemBoxProps> = ({ onCreate }) => {
    const [createForm, setCreateForm] = useState<ICreateForm & {}>({} as ICreateForm)
    const [files, setFiles] = useState<IEditableForm & {}>({} as IEditableForm)
    const selectFiles = (e: any, type: string) => {
        const target = e.target
        setCreateForm((prev: any) => ({
            ...prev,
            [type]: target.files[0],
        }))

    }
    const ADD_TO_FORM = (field: keyof IFields, e: React.ChangeEvent<HTMLInputElement>) => {
        setCreateForm(prev => ({ ...prev, [field]: e.target.value }))
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
                    value={createForm.price}
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
                    value={createForm.quant}
                />
            </fieldset>
            <CustomFileInput
                selectFile={(e) => selectFiles(e, 'file_main')}
            >
                Загрузить основное изображение
            </CustomFileInput>
            <CustomFileInput
                selectFile={(e) => selectFiles(e, 'file_sec')}
            >
                Загрузить дополнительное изображение
            </CustomFileInput>
            <Button
                className='mt1'
                variant='outline'
                colorScheme='orange'
                onClick={() => onCreate(createForm)}
            >
                Добавить изделие
            </Button>
        </VStack>
    )
}
