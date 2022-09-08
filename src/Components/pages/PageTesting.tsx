/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, ButtonGroup, ButtonSpinner, Center, Container, Editable, EditableInput, EditablePreview, Flex, FormLabel, Heading, HStack, Icon, IconButton, Image, Input, Spinner, Tag, Text, useEditableControls, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { FC, useContext, useEffect, useState } from 'react'
import { HostContext } from '../../App'
import { fetchApi, useFetchApi } from '../../http/useFetchApi'
import { ISklad, PATHS } from '../../types/IServerData'
import { getNumb } from './SkladPage'
import { editWarehouse } from '../../http/ClientSkladApi'
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
import { CustomInput, IFields } from './CustomInput'
import { CustomFileInput } from "./CustomFileInput"
import auth from '../../GoggleSheets/gsheet'
// const sortedByTypeName = (obj: ISklad[]) => [...obj].sort((a, b) => {
//     const [nameA, nameB] = [getNumb(a.type?.name), getNumb(b.type?.name)]
//     return nameA - nameB
// })


const sortedWhByTypeName = (obj: IWarehouse[]) => [...obj].sort((a, b) => {
    const [nameA, nameB] = [getNumb(a.typename), getNumb(b.typename)]
    return nameA - nameB
})
const sortByTypename = (a:any, b:any) => {
    const [nameA, nameB] = [getNumb(a.typename), getNumb(b.typename)]
    return nameA - nameB
}
export const NUM = (str: string | number) => {
    if (typeof str === 'number') return str
    return parseInt(str, 10)
}

const arrControl = (array: Array<any>, initial: number = 5) => {
    const prev = (idx: number = initial): object => array[idx--]
    const next = (idx: number = initial): object => array[idx--]
    return [prev, next] as const
}


const initialState={
    typename_new: "",
    price_new: "",
    quant_new: "",
    typename: "",
    price: "",
    quant: "",
} as AddedValues
export interface AddedValues extends IWarehouse {
    typename_new?: string
    price_new?: number|string
    quant_new?: number|string
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

    const [active, setActive] = useState<AddedValues & {} >({} as IWarehouse)
    const [whform, setWhform] = useState({} as IEditableForm)
    const [files, setFiles] = useState<IEditableForm & {}>({} as IEditableForm)
    const [warehouse, setWH, isLoadingWH, errorWH] = useFetchApi<IWarehouse>(PATHS.WAREHOUSE)
    const [whs, setWhs] = useState<IWarehouse[]>([])

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
        // setWhform(prev => ({ ...prev, [type]: target.files[0] }))
        // setActive(prev=>({...prev, [type]: target.files[0]}))
    }
    const isActive = (id: number) => (active!.id === id)

    useEffect(() => {
        fetchApi(PATHS.WAREHOUSE).fetchAll().then(data => setWhs(data as IWarehouse[]))
    }, [warehouse])




    const editableSubmitHandler = () => {
        const isChanged = (field: keyof IFields ): boolean => {
            if (active && !active[field + '_new']) return false
            
            return active ? active[field] !== active[field + '_new'] : false
        }


        const form = new FormData()
        isChanged('typename') && active!.typename_new ? form.append('typename', active!.typename_new):form.append('typename', active!.typename)
        isChanged('price') && active!.price && form.append('price', JSON.stringify(active!.price_new))
        isChanged('quant') && active!.quant && form.append('quant', JSON.stringify(active!.quant_new))
        files.file_main && form.append('file_main', files.file_main)
        files.file_sec && form.append('file_sec', files.file_sec)
        form.append('src_main', active!.img_main)
        form.append('src_sec', active!.img_sec)
       active && editWarehouse(form, active).then(data => setWH(prev => [...prev]))
        setActive({} as IWarehouse)
        setFiles({} as IEditableForm)
    }

    const resetHandler = () => {
        setActive(initialState)
        setFiles({} as IEditableForm)
    }

    if (errorWH) return (
        <>
            <Text fontSize={'6xl'}>ERROR: {errorWH}</Text>
        </>
    )


    return (
        <div className="row">
            {/* <div className="col s2">
                <Container borderRight={'4px '} borderColor='gray.500' borderStyle={'groove'} className='mt1'>
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
                            <BtnsStack sklads={sklads} />
                    }
                </Container>
            </div> */}

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

                        <Wrap bgGradient={'linear(to-bl, #72b9e9, #0e324b)'} >


                            {[...whs].sort(sortByTypename)?.map((wh) =>
                                <WrapItem key={wh.id}>
                                    <WhControlCard
                                        isActive={isActive}
                                        whItem={wh}
                                        selectItem={selectItem}
                                        server_url={host} />
                                </WrapItem>
                            )}
                        </Wrap>
                }
            </div>
            <div className="col s3 mt1">
                <Box border={'1rem groove #0c99eb'}
                    padding='2rem'
                    borderRadius={'2rem'}
                    marginRight={4}
                    bgGradient={'linear(to-l, #087cc9, #bda7e0)'}
                >
                    <Heading size={'lg'}>Selected Item: {active!.typename}</Heading>
                    
                    <HStack  className=' my1' justifyContent={'space-between'}>
                        <Image

                            border='2px solid grey'
                            alt='No IMAGE'
                            borderRadius={'lg'}
                            maxHeight={'5em'}
                            src={`${host}${active!.img_main || 'noimage.jpg'}`}
                             />
                        {/* <div className='file-field '>
                            <div className="btn ">
                               <i className="material-icons left">edit</i> загрузить
                                <input type="file" onChange={(e) => selectFiles(e, 'file_main')} />
                            </div>

                        </div> */}
                        <CustomFileInput selectFile={(e) => selectFiles(e, 'file_main')}>
                           <div className='flex-row-between wrap-normal'><i className="material-icons">edit</i> загрузить</div>
                        </CustomFileInput>
                    </HStack >
                    <HStack className='my1' justifyContent={'space-between'}>
                        <Image
                            border='2px solid grey'
                            alt='No IMAGE'
                            borderRadius={'lg'}
                            maxHeight={'4em'}
                            src={`${host}${active!.img_sec || 'noimage.jpg'}`}
                             />
                        <CustomFileInput selectFile={(e) => selectFiles(e, 'file_sec')} >
                            <div className='flex-row-between wrap-normal'><i className="material-icons">edit</i> загрузить</div>
                        </CustomFileInput>
                    </HStack>
                    {active &&
                        <VStack justifyContent={'space-between'}>
                            
                            <CustomInput active={active} value={active!.typename_new || active!.typename} field='typename' 
                                changeHandler={(e) => setActive(prev => ({ ...prev, typename_new: e.target.value }))}
                            />
                            <CustomInput active={active} value={`${active.price_new || active.price}`} field='price' desc=' руб.'
                                changeHandler={(e) => setActive(prev => ({ ...prev, price_new: parseInt(e.target.value) }))}
                            />
                            <CustomInput active={active} value={`${active.quant_new || active.quant}`} field='quant' desc=" шт."
                                changeHandler={(e) => setActive(prev => ({ ...prev, quant_new: parseInt(e.target.value) }))}
                            />
                            <ButtonGroup dir='horisontal'>
                                <Button onClick={editableSubmitHandler}
                                    colorScheme='green'
                                >
                                    Accept
                                </Button>
                                <Button onClick={resetHandler}
                                    colorScheme='red'
                                >
                                    Decline
                                </Button>
                            </ButtonGroup>
                            
                        </VStack>}


                </Box>
                {/* {active &&
                    <ActiveItemForm active={active}
                        whform={whform}
                        selectFiles={selectFiles}
                        files={files}
                        submitHandler={submitHandler}
                        onChangeForm={changeForm} />
                } */}
            </div>
        </div >

    )
}



/* <VStack align={'flex-start'}>
                        <PopoverInput>
                            <div className='blue accent-1 txt-bold flex-row-between w100 p1 bdr-radius-1' >
                                <span><Icon as={TiDatabase} color='purple.900' width={'2rem'} />Название: </span><span>{active.typename}</span>
                            </div>
                        </PopoverInput>
                        <PopoverInput>
                            <div className='blue accent-1 txt-bold flex-row-between w100 p1 bdr-radius-1'>
                                <span><Icon as={IoLogoUsd} width={'2rem'} />Стоимость: </span><span>{active.price} руб.</span>
                            </div>
                        </PopoverInput>
                        <div className='blue accent-1 txt-bold flex-row-between w100 p1 bdr-radius-1'>
                            <PopoverInput>
                                <span><Icon as={TiHomeOutline} width={'2rem'} /> Количество: </span>
                            </PopoverInput>
                            <span>{active.quant} шт.</span>
                        </div>
                    </VStack> */

                    // <Editable width={'100%'}
                    //             textAlign='center'
                    //             fontSize='2xl'
                    //             isPreviewFocusable={false}
                    //             value={`${active.price}`}
                    //         >
                    //             <HStack>
                    //                 <EditablePreview />
                    //                 <Input
                    //                     as={EditableInput}
                    //                     onChange={(e) => setActive(prev => ({ ...prev, price: parseInt(e.target.value) }))} />
                    //                 <EditableControls />
                    //             </HStack>
                    //         </Editable>
                    //         <Editable width={'100%'}
                    //             textAlign='center'
                    //             fontSize='2xl'
                    //             isPreviewFocusable={false}
                    //             value={`${active.quant}`}
                    //         >
                    //             <HStack alignContent={'space-between'} className='w100'>
                    //                 <EditablePreview />
                    //                 <Input
                    //                     as={EditableInput}
                    //                     onChange={(e) => setActive(prev => ({ ...prev, quant: parseInt(e.target.value) }))} />
                    //                 <EditableControls />
                    //             </HStack>
                    //         </Editable>

                    // const submitHandler = () => {
                    //     const sortedWH = sortedWhByTypeName(warehouse as IWarehouse[])
                    //     const form_wh = new FormData();
                
                    //     form_wh.append('id', JSON.stringify(whform.id))
                    //     form_wh.append('typename', whform.typename)
                    //     form_wh.append('quant', whform!.quant.toString())
                    //     form_wh.append('price', whform!.price.toString())
                    //     form_wh.append('img_main', whform.img_main)
                    //     form_wh.append('img_sec', whform.img_sec)
                    //     form_wh.append('file_main', files.file_main)
                    //     form_wh.append('file_sec', files.file_sec)
                    //     editWarehouse(form_wh, active).then(() => setWhs([...sortedWH]))
                    //     setActive({} as IWarehouse)
                    //     setFiles({} as IFiles)
                    //     // setWhs(prev => [...prev])
                    // }
                    // const changeForm = (e: React.ChangeEvent<HTMLInputElement>, key: string) => setWhform(prev => ({ ...prev, [key]: e.target.value }))