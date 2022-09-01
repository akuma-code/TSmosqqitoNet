import { Box, Button, Container, FormControl, Heading, Icon, IconButton, Image, Input, InputGroup, InputRightElement, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Spinner, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { ChangeEvent, ChangeEventHandler, FC, FormEvent, SyntheticEvent, useContext, useEffect, useState } from 'react'
import { HostContext } from '../../App'
import { useFetchApi } from '../../http/useFetchApi'
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
import { editOGO } from '../../http/ClientSkladApi'
interface ISkladForm {
    id: number | string
    quant: string | Blob | any
    typeId: string
    shopId: string
}

interface ITypeForm {
    id: number | string
    name: string | Blob
    img: string | Blob
    secondaryImg: string | Blob | any
    infos?: any[]
}

interface IShopForm {
    id: number
    title?: string
    price: any
}

interface IFiles {
    img: {} & Blob | string
    secondaryImg: {} & Blob | string
    src_main?: string
    src_second?: string
}

const sortedByTypeName = (obj: ISklad[]) => [...obj].sort((a, b) => {
    const [nameA, nameB] = [getNumb(a.type?.name), getNumb(b.type?.name)]
    return nameA - nameB
})


export const PageTesting: FC = (): JSX.Element => {

    const [skladform, setSkladform] = useState<ISkladForm>({ id: -1, quant: "", typeId: "", shopId: "" } as ISkladForm)
    const [shopform, setShopform] = useState<IShopForm>({ id: -1, price: "", title: "" } as IShopForm)
    const [typeform, setTypeform] = useState<ITypeForm>({ name: "", img: "", secondaryImg: "" } as ITypeForm)
    const [files, setFiles] = useState({ img: {}, secondaryImg: {}, src_main: "", src_second: "" } as IFiles)
    const [sklad, isLoading, error] = useFetchApi(PATHS.SKLAD)
    const [sklads, setSklads] = useState([] as ISklad[])
    const { host } = useContext(HostContext)

    const [active, setActive] = useState({} as ISklad)

    const selectItem = (skladItem: ISklad) => {
        setActive(skladItem)
        setFiles(prev => ({ ...prev, src_main: active.type?.img, src_second: active.type?.secondaryImg }))
        setShopform(prev => ({ ...prev, price: active.shop?.price }))
        setSkladform(prev => ({ ...prev, id: active.id?.toString(), quant: active?.quant?.toString() }))
        setTypeform(prev => ({ ...prev, name: active.type?.name, img: active.type?.img, secondaryImg: active.type?.secondaryImg }))
    }
    const selectFiles = (e: any, type: string) => {
        const target = e.target
        setFiles(prev => ({ ...prev, [type]: target.files[0] }))
    }
    const isActive = (id: number) => (active.id === id)
    const JST = (obj: any) => JSON.stringify(obj, null, 4)?.slice(1, -1)
    const str = active ? JST(active) : ""
    // console.log('str', str)
    useEffect(() => {
        // const sortedByTypeName = sklad.sort((a, b) => {
        //     const [nameA, nameB] = [getNumb(a.type?.name), getNumb(b.type?.name)]
        //     return nameA - nameB
        // })
        const sorted = sortedByTypeName(sklad)
        setSklads(sorted)
    }, [sklad])

    const submitHandler = () => {
        const form_type = new FormData();
        const form_sklad = new FormData();
        const form_shop = new FormData();
        active.type.name !== typeform.name && form_type.append('name', typeform.name)
        form_type.append('img', typeform.img)
        form_type.append('secondaryImg', typeform.secondaryImg)
        files.img && form_type.append('file_main', files.img)
        files.secondaryImg && form_type.append('file_second', files.secondaryImg)
        form_sklad.append('quant', skladform.quant)
        form_sklad.append('id', active.id.toString())
        form_type.append('typeId', active.type.id.toString())
        form_shop.append('price', shopform.price)
        // form_sklad.append('shopId', active.shop!.id.toString())
        const forms = { form_type, form_sklad, form_shop }
        editOGO(forms, active).then(() => setSklads(prev => [...prev]))
    }



    if (error) return (
        <>
            <Text fontSize={'6xl'}>ERROR: {error}</Text>
        </>
    )

    return (
        <div className="row">
            <div className="col s3">
                <Container borderRight={'4px '} borderColor='gray.500' borderStyle={'groove'}>
                    {
                        isLoading && <Spinner
                            size={'xl'}
                            emptyColor='red.500'
                            color='black.300'
                            speed='0.65s'
                            thickness='6px' />
                    }
                    <Wrap spacing='-2'>
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
                    </Wrap>
                </Container>
            </div>
            <div className="col s6 mt1">
                {active &&
                    <>
                        <Heading textAlign={'center'}>
                            ID Склада: {active.id || "###"} | ID Типа: {active.typeId || "###"} | ID Магазина: {active.shopId || "###"}
                        </Heading>

                        <FormControl className='col s3'

                        >

                            <Input
                                variant='filled'
                                placeholder='ТИП'
                                defaultValue={active.type?.name}
                                borderWidth={1}
                                borderStyle='double'
                                onChange={(e) => setTypeform(prev => ({ ...prev, name: e.target.value }))}
                            />
                            <InputGroup>
                                <Input
                                    variant='filled'
                                    placeholder='ЦЕНА'
                                    defaultValue={active.shop?.price}
                                    borderWidth={1}
                                    borderStyle='double'
                                    type={'number'}
                                    onChange={e => setShopform((prev) => ({ ...prev, price: e.target.value }))}
                                />
                                <InputRightElement pointerEvents={'none'} children={'руб.'} />
                            </InputGroup>
                            <InputGroup>
                                <Input
                                    variant='filled'
                                    placeholder='Количество'
                                    defaultValue={active.quant}
                                    borderWidth={1}
                                    borderStyle='double'
                                    borderColor={'coral'}
                                    type='number'
                                    onChange={e => setSkladform(prev => ({ ...prev, quant: e.target.value }))}
                                />
                                <InputRightElement pointerEvents={'none'} children={'шт.'} />
                            </InputGroup>
                            <div className="file-field input-field">
                                <div className="btn">
                                    <span>Изображение</span>
                                    <input type="file" onChange={(e) => selectFiles(e, 'img')} />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" />
                                </div>
                            </div>
                            <InputFile title='Дополнительно' changeHandler={(e) => selectFiles(e, 'secondaryImg')} />
                            <Button
                                onClick={submitHandler}
                            >Сохранить изменения</Button>
                        </FormControl>
                    </>
                }
            </div>
            <div className="col s3 mt1">
                <Container>
                    {str}
                </Container>
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