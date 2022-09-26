/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, ButtonSpinner, Center, Checkbox, Container, Editable, EditableInput, EditablePreview, Flex, FormLabel, Heading, HStack, Icon, IconButton, Input, Spinner, Stack, Tag, Text, useDisclosure, useEditableControls, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { FC, ReactEventHandler, useContext, useEffect, useState, useMemo, useCallback } from 'react'
import { HostContext } from '../../App'
import { fetchApi, useFetchApi } from '../../http/useFetchApi'
import { ISklad, PATHS } from '../../types/IServerData'
import { getNumb } from './SkladPage'
import { CleanUpTasks, editWarehouse, RunAutoCompleteTasks } from '../../http/ClientSkladApi'
import { useToggle } from '../../hooks/useToggle'
import { IFiles, IWarehouse, IWarehouseForm } from '../../types/WarehouseTypes'
import { WhControlCard } from '../Cards/WhControlCard'
import { BtnsStack } from './BtnsStack'
import { ActiveItemForm } from './ActiveItemForm'
import { PopoverInput } from '../Modal/PopoverInput'
import { TiDatabase, TiHomeOutline } from 'react-icons/ti'
import { IoLogoUsd } from 'react-icons/io'
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import { AiFillEdit } from 'react-icons/ai'
import { IFields } from './CustomInput'
import * as WT from '../../types/WHTypes'
import { EditItemBox } from '../Modal/EditItemBox'
import { ModalWrap } from '../Modal/ModalWrap'
import { CreateItemBox } from '../Modal/CreateItemBox'
import { ProductionBox } from '../Modal/ProductionBox'


export const isConfirmed = (text: string) => global.confirm(text)

const sortedWhByTypeName = (obj: WT.BaseProps[]) => [...obj].sort((a, b) => {
    const [nameA, nameB] = [getNumb(a.typename), getNumb(b.typename)]
    return nameA - nameB
})
const sortByTypename = (a: any, b: any) => {
    const [nameA, nameB] = [getNumb(a.typename), getNumb(b.typename)]
    return nameA - nameB
}
export const NUM = (str: string | number) => {
    if (typeof str === 'number') return str
    return parseInt(str, 10)
}

const arrControl = (array: Array<any>, initial: number = 5) => {
    const prev = (idx: number = initial): object => array[idx--]
    const next = (idx: number = initial): object => array[idx++]
    return [prev, next] as const
}


const initialState = {
    typename_new: "",
    price_new: "",
    quant_new: "",
    typename: "",
    price: "",
    quant: "",
} as AddedValues
export interface AddedValues extends IWarehouse {
    typename_new?: string
    price_new?: number | string
    quant_new?: number | string
    [field: string]: any
    // [field:string]: keyof whFields
}

export interface IEditableForm extends AddedValues {
    img_main: string
    img_sec: string
    file_main?: Blob
    file_sec?: Blob
}


export const PageTesting: FC = (): JSX.Element => {
    const { host } = useContext(HostContext)


    const [active, setActive] = useState<AddedValues & {}>(initialState as IWarehouse)
    const [files, setFiles] = useState<IEditableForm & {}>({} as IEditableForm)
    const [warehouse, setWH, isLoadingWH, errorWH] = useFetchApi<IWarehouse>(PATHS.WAREHOUSE)
    const [whs, setWhs] = useState<IWarehouse[]>([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [createMdl, setCreateState] = useToggle()
    const [autofinish, setAF] = useToggle()

    const check = () => {
        const bool = localStorage.getItem("auto_finish")
        if (!bool) {
            localStorage.setItem("auto_finish", "false")
            setAF.on()
        } else {
            localStorage.setItem("auto_finish", "true")
            setAF.off()
        }
    }

    const updateWH = async () => await fetchApi(PATHS.WAREHOUSE).fetchAll().then(data => setWhs(data as IWarehouse[]))
    const selectItem = (skladItem: IEditableForm) => {
        setActive(skladItem)
        setFiles((prev: any) => ({ ...prev, src_main: skladItem.img_main, src_second: skladItem.img_sec }))
    }


    const selectFiles = (e: any, type: string) => {
        const target = e.target
        active && setFiles((prev: any) => ({
            ...prev,
            [type]: target.files[0],
            src_main: active.img_main,
            src_second: active.img_sec
        }))

    }
    const isActive = (id: number) => (active!.id === id)

    useEffect(() => {
        updateWH()
    }, [warehouse, isOpen, createMdl])

    useEffect(() => {

        if (autofinish) {
            console.log("AutoFinish Done!");
            RunAutoCompleteTasks(0)
        }


    }, [])

    const onDelete = (delid: number) => setWhs(prev => prev.filter(w => w.id !== delid))

    const editableSubmitHandler = () => {

        const isChanged = (field: keyof IFields): boolean => {
            if (active && !active[field + '_new']) return false
            return active ? active[field] !== active[field + '_new'] : false
        }

        const form = new FormData()
        isChanged('typename') && active!.typename_new ? form.append('typename', active!.typename_new) : form.append('typename', active!.typename)
        isChanged('price') && active!.price && form.append('price', JSON.stringify(active!.price_new))
        isChanged('quant') && active!.quant && form.append('quant', JSON.stringify(active!.quant_new))
        files.file_main && form.append('file_main', files.file_main)
        files.file_sec && form.append('file_sec', files.file_sec)
        form.append('src_main', active!.img_main)
        form.append('src_sec', active!.img_sec)
        active && editWarehouse(form, active).then(data => setWH(prev => [...prev]))
        setActive({} as IWarehouse)
        setFiles({} as IEditableForm)
        onClose()
    }

    const resetHandler = () => {
        setActive(initialState)
        setFiles({} as IEditableForm)
        onClose()
    }
    const formHandlers = {
        inputFileHandler: selectFiles,
        submitHandler: editableSubmitHandler,
        resetHandler
    }

    if (errorWH) return (
        <>
            <Text fontSize={'6xl'}>ERROR: {errorWH}</Text>
        </>
    )
    if (isLoadingWH) return (
        <Center mt={10}>
            <Spinner
                size={'xl'}
                emptyColor='red.500'
                color='black.300'
                speed='0.65s'
                thickness='6px' />
        </Center>
    )

    return (
        <div className="row">


            <div className="col s9 mt1">
                {
                    isLoadingWH ?
                        <Center>
                            <Spinner
                                size={'xl'}
                                emptyColor='red.500'
                                color='black.300'
                                speed='0.65s'
                                thickness='6px' />
                        </Center>
                        :
                        <Wrap bgGradient={'linear(to-bl, #72b9e9, #0e324b)'}
                            className='p1'>
                            {[...whs].sort(sortByTypename)?.map((wh) =>
                                <WrapItem key={wh.id}>
                                    <WhControlCard
                                        isActive={isActive}
                                        whItem={wh}
                                        selectItem={selectItem}
                                        server_url={host}
                                        openModal={onOpen}
                                        updateGlobal={updateWH}
                                        onDelete={onDelete}
                                    />
                                </WrapItem>
                            )}
                        </Wrap>
                }
            </div>
            <div className="col s3 mt1">
                <VStack align={'flex-start'}>


                    <Button
                        className=' mt1'
                        variant={'outline'}
                        size='sm'
                        onClick={setCreateState.on}
                        colorScheme='twitter'
                    >
                        Создать новое изделие
                    </Button>


                    <Button
                        className='mx1 mt1'
                        variant={'outline'}
                        size='sm'
                        onClick={() => RunAutoCompleteTasks(0)}
                        colorScheme='twitter'
                    >
                        Завершить выполенные
                    </Button>

                    <label>
                        <input type="checkbox"
                            className="filled-in"
                            checked={autofinish}
                            onChange={check}
                        />
                        <span>Автозавершение заданий</span>
                    </label>

                    <Button
                        className='mx1 mt1'
                        variant={'outline'}
                        size='sm'
                        onClick={CleanUpTasks}
                        colorScheme='red'
                    >
                        Очистить очередь производства
                    </Button>
                </VStack>
            </div>
            <ModalWrap isOpen={isOpen} onClose={onClose} title="Редактировать элемент">
                <EditItemBox handlers={formHandlers} item={active} setItem={setActive} />
            </ModalWrap>
            <ModalWrap isOpen={createMdl} onClose={setCreateState.off} title='Создать новое окно'>
                <CreateItemBox onFinish={setCreateState.off} />
            </ModalWrap>

        </div >

    )
}




