/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Container, FormControl, Heading, Icon, IconButton, Image, Input, InputGroup, InputRightElement, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Spinner, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { ChangeEvent, ChangeEventHandler, FC, FormEvent, SyntheticEvent, useContext, useEffect, useState } from 'react'
import { HostContext } from '../../App'
import { fetchApi, useFetchApi } from '../../http/useFetchApi'
import { ISklad, PATHS } from '../../types/IServerData'
import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdOutlineSave } from 'react-icons/md'
import { FaWarehouse } from 'react-icons/fa'
import { BsCalendar2EventFill } from 'react-icons/bs'
import { getNumb } from './SkladPage'
import {
    Editable,
    EditableInput,
    EditablePreview,
} from '@chakra-ui/react'
import { InputFile } from '../Forms/InputFile'
import { editOGO, editWarehouse } from '../../http/ClientSkladApi'
export interface ISkladForm {
    id: number | string
    quant: string | Blob | any
    typeId: string
    shopId: string
}

export interface ITypeForm {
    id: number | string
    name: string | Blob
    img: string | Blob
    secondaryImg: string | Blob | any
    infos?: any[]
}

export interface IShopForm {
    id: number
    title?: string
    price: any
}

interface IFiles {
    file_main: {} & Blob
    file_sec: {} & Blob
    src_main: string
    src_second: string
}
export interface IWarehouse extends ISklad {
    id: number
    quant: number
    typename: string
    img_main: string
    img_sec: string
    price: number
    file_main?: Blob
    file_sec?: Blob
}

export interface IWarehouseForm extends IWarehouse {
    img_main: string
    img_sec: string
    file_main?: Blob
    file_sec?: Blob
}
const sortedByTypeName = (obj: ISklad[]) => [...obj].sort((a, b) => {
    const [nameA, nameB] = [getNumb(a.type?.name), getNumb(b.type?.name)]
    return nameA - nameB
})
const sortedWhByTypeName = (obj: IWarehouse[]) => [...obj].sort((a, b) => {
    const [nameA, nameB] = [getNumb(a.typename), getNumb(b.typename)]
    return nameA - nameB
})
export const NUM = (str: string | number) => {
    if (typeof str === 'number') return str
    return parseInt(str, 10)
}

export const PageTesting: FC = (): JSX.Element => {

    const [active, setActive] = useState({} as IWarehouse | any)
    const [whform, setWhform] = useState({} as IWarehouseForm)
    const [files, setFiles] = useState({} as IFiles | any)
    const [warehouse, isLoadingWH, errorWH] = useFetchApi(PATHS.WAREHOUSE)
    const [whs, setWhs] = useState([] as IWarehouse[])
    const { host } = useContext(HostContext)



    const selectItem = (skladItem: IWarehouse) => {
        setActive(skladItem)
        setFiles((prev: any) => ({ ...prev, src_main: skladItem.img_main, src_second: skladItem.img_sec }))
        setWhform(prev => ({
            ...prev,
            id: skladItem.id,
            typename: skladItem.typename,
            // file_main: files.file_main,
            // file_sec: files.file_sec,
            price: skladItem.price,
            quant: skladItem.quant,
            img_main: files.src_main || skladItem.img_main,
            img_sec: files.src_second || skladItem.img_sec
        }))

    }
    const selectFiles = (e: any, type: string) => {
        const target = e.target
        setFiles((prev: any) => ({ ...prev, [type]: target.files[0] }))
        setWhform(prev => ({ ...prev, [type]: target.files[0] }))
    }
    const isActive = (id: number) => (active.id === id)
    const JST = (obj: any) => JSON.stringify(obj, null, 4)?.slice(1, -1)
    const str = active ? JST(active) : ""
    // console.log('str', str)
    useEffect(() => {
        const sortedWH = sortedWhByTypeName(warehouse as IWarehouse[])
        // const sorted = sortedByTypeName(sklad as ISklad[])
        setWhs([...sortedWhByTypeName(warehouse as IWarehouse[])])
        // setSklads(sorted)
    }, [warehouse, whform])
    // useEffect(() => {
    //     const whApi = fetchApi('sklad/wh')
    //     whApi.fetchAll().then(data => setWhs([...data]))
    //     const sortedWH = sortedWhByTypeName(warehouse)
    //     setWhs(sortedWH)

    // }, [])

    const submitHandler = () => {
        const sortedWH = sortedWhByTypeName(warehouse as IWarehouse[])
        const form_wh = new FormData();

        form_wh.append('id', JSON.stringify(whform.id))
        form_wh.append('typename', whform.typename)
        form_wh.append('quant', whform!.quant.toString())
        form_wh.append('price', whform!.price.toString())
        form_wh.append('img_main', whform.img_main)
        form_wh.append('img_sec', whform.img_sec)
        form_wh.append('file_main', files.file_main)
        form_wh.append('file_sec', files.file_sec)
        editWarehouse(form_wh, active).then((data) => setWhs([...sortedWH]))
        // setActive({})
        setFiles({})
        // setWhs(prev => [...prev])
    }



    if (errorWH) return (
        <>
            <Text fontSize={'6xl'}>ERROR: {errorWH}</Text>
        </>
    )

    return (
        <div className="row">
            <div className="col s2">
                <Container borderRight={'4px '} borderColor='gray.500' borderStyle={'groove'}>
                    {
                        isLoadingWH && <Spinner
                            size={'xl'}
                            emptyColor='red.500'
                            color='black.300'
                            speed='0.65s'
                            thickness='6px' />
                    }
                    <Stack dir='row' className='mt1'>
                        <Button
                            bg={'green.200'}
                            onClick={() => {
                                fetchApi('/sklad').copySklad(active.id)
                            }}
                            disabled
                        >
                            Copy Sklad Item
                        </Button>
                        <Button

                        >
                            Create Warehouse Item
                        </Button>
                        {/* <Button
                                onClick={submitHandler}
                            >
                                Edit Warehouse Item
                            </Button> */}
                        <Button

                        >
                            Delete Warehouse Item
                        </Button>
                        <Button
                            bg={'red.300'}
                        >
                            DELETE ALL WAREHOUSE
                        </Button>
                    </Stack>
                </Container>
            </div>
            <div className="col s2 mt1">
                {active &&
                    <>
                        <Heading textAlign={'center'}>
                            ID Склада: {active.id || "###"}
                        </Heading>

                        <FormControl className='col '

                        >

                            <Input
                                variant='filled'
                                placeholder='ТИП'
                                // defaultValue={active.typename}
                                value={whform.typename}
                                borderWidth={1}
                                borderStyle='double'
                                onChange={(e) => setWhform(prev => ({ ...prev, typename: e.target.value }))}
                            />
                            <InputGroup>
                                <Input
                                    variant='filled'
                                    placeholder='ЦЕНА'
                                    // defaultValue={active.price}
                                    borderWidth={1}
                                    borderStyle='double'
                                    type={'number'}
                                    value={whform.price}
                                    onChange={e => setWhform(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                                />
                                <InputRightElement pointerEvents={'none'} children={'руб.'} />
                            </InputGroup>
                            <InputGroup>
                                <Input
                                    variant='filled'
                                    placeholder='Количество'
                                    // defaultValue={active.quant}
                                    borderWidth={1}
                                    borderStyle='double'
                                    borderColor={'coral'}
                                    type='number'
                                    value={whform.quant}
                                    onChange={e => setWhform(prev => ({ ...prev, quant: parseInt(e.target.value) }))}
                                />
                                <InputRightElement pointerEvents={'none'} children={'шт.'} />
                            </InputGroup>
                            <div className="file-field input-field">
                                <div className="btn">
                                    <span>Изображение</span>
                                    <input type="file" onChange={(e) => selectFiles(e, 'file_main')} />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" />
                                </div>
                            </div>
                            <div className="file-field input-field">
                                <div className="btn">
                                    <span>Дополнительно</span>
                                    <input type="file" onChange={(e) => selectFiles(e, 'file_sec')} />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" />
                                </div>
                            </div>
                            {/* <InputFile title='Дополнительно' changeHandler={(e) => selectFiles(e, 'file_sec')} value={files.file_main} /> */}
                            <Button
                                onClick={submitHandler}
                            >Сохранить изменения</Button>
                        </FormControl>
                    </>
                }
            </div>
            <div className="col s7 mt1">
                <Wrap>
                    {whs?.map((wh) =>
                        <WrapItem key={wh.id}>
                            <Box className={'m1 z-depth-3'}
                                maxHeight='7rem'
                                width={'max-content'}
                                display='flex'
                                flexDir='row'
                                border='2px'
                                borderRadius='lg'
                                justifyContent={'space-between'}
                                alignItems='flex-start'
                                padding='.5em'
                                // margin='.3em'
                                bgColor={isActive(wh.id) ? 'blue.600' : 'gray.500'}
                                onClick={() => selectItem(wh)}
                                _hover={{ border: "3px solid white", cursor: "pointer" }}
                            >
                                <Image
                                    alt='No IMAGE'
                                    borderRadius={'lg'}
                                    maxHeight={'5em'}
                                    src={`${host}${wh.img_main || 'noimage.jpg'}`}
                                />
                                <Image className='mx1'
                                    alt='No IMAGE'
                                    borderRadius={'lg'}
                                    maxHeight={'5em'}
                                    src={`${host}${wh.img_sec || 'noimage.jpg'}`}
                                />
                                <Box
                                    className='mx1'
                                    display='flex'
                                    flexDir='column'
                                    fontSize={'1.8em'}

                                >
                                    <div className="flex-row-between txt-bold w100 white-text">
                                        <Icon as={BsCalendar2EventFill} color={'gray.100'} />
                                        <i>{wh.typename}</i>
                                    </div>
                                    <div className="flex-row-between  w100 txt-bold">
                                        <Icon as={FaWarehouse} w={8} h={8} />
                                        <i>{wh.quant} шт.</i>
                                    </div>
                                </Box>
                            </Box>
                        </WrapItem>
                    )}
                </Wrap>
            </div>
        </div >

    )
}



// <Editable
// value={active.quant?.toString()}
// bg={'gray.300'}
// fontSize='2xl'

// >
// <EditablePreview cursor={'pointer'} className='mx1' />
// <EditableInput
//     value={active.quant}
//     onChange={(e: ChangeEvent<HTMLInputElement>) => { setActive({ ...active, quant: e.target.value }) }}
// />
// <span> Шт.</span>
// </Editable>


/* <Wrap spacing='-2'>
                       {sklads?.map(s =>
                           <WrapItem key={s.id}>
                               <Box className={'m1 z-depth-3'}
                                   maxHeight='7rem'
                                   width={'max-content'}
                                   display='flex'
                                   flexDir='row'
                                   border='2px'
                                   borderRadius='lg'
                                   justifyContent={'space-between'}
                                   alignItems='flex-start'
                                   padding='.5em'
                                   // margin='.3em'
                                   bgColor={isActive(s.id) ? 'blue.600' : 'gray.500'}
                                   onClick={() => selectItem(s)}
                                   _hover={{ border: "3px solid white", cursor: "pointer" }}
                               >
                                   <Image
                                       alt='No IMAGE'
                                       borderRadius={'lg'}
                                       maxHeight={'5em'}
                                       src={`${host}${s.type?.img || 'noimage.jpg'}`}
                                   />
                                   <Box
                                       className='mx1'
                                       display='flex'
                                       flexDir='column'
                                       fontSize={'1.8em'}

                                   >
                                       <div className="flex-row-between txt-bold w100 white-text">
                                           <Icon as={BsCalendar2EventFill} color={'gray.100'} />
                                           <i>{s.type.name}</i>
                                       </div>
                                       <div className="flex-row-between  w100 txt-bold">
                                           <Icon as={FaWarehouse} w={8} h={8} />
                                           <i>{s.quant} шт.</i>
                                       </div>
                                   </Box>
                               </Box>
                           </WrapItem>
                       )}
                   </Wrap> */