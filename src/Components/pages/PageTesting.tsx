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
    id?: number
    quant: string | Blob
    typeId: string
    shopId?: string
}

interface ITypeForm {
    id: number
    name: string | Blob
    img: string | Blob
    secondaryImg: string | Blob
    infos?: any[]
}

interface IShopForm {
    id?: number
    title?: string
    price: string | Blob
}

interface IFiles {
    img: {} & Blob
    secondaryImg: {} & Blob
}
export const PageTesting: FC = (): JSX.Element => {

    const [skladform, setSkladform] = useState<ISkladForm>({} as ISkladForm)
    const [shopform, setShopform] = useState<IShopForm>({} as IShopForm)
    const [typeform, setTypeform] = useState<ITypeForm>({} as ITypeForm)
    const [files, setFiles] = useState({} as IFiles)
    const [sklad, isLoading, error] = useFetchApi(PATHS.SKLAD)
    const [sklads, setSklads] = useState([] as ISklad[])
    const { host } = useContext(HostContext)

    const [active, setActive] = useState({} as ISklad)

    const selectItem = (skladItem: ISklad) => setActive(skladItem)
    const selectFiles = (e: any, type: string) => {
        const target = e.target
        setFiles(prev => ({ ...prev, [type]: target.files[0] }))
    }
    const isActive = (id: number) => (active.id === id)

    useEffect(() => {
        const sortedByTypeName = sklad.sort((a, b) => {
            const [nameA, nameB] = [getNumb(a.type?.name), getNumb(b.type?.name)]
            return nameA - nameB
        })
        setSklads(sortedByTypeName)
    }, [sklad])

    const submitHandler = () => {
        const form = new FormData();
        form.append('name', typeform.name)
        form.append('price', shopform.price)
        form.append('quant', skladform.quant)
        form.append('img', files.img)
        form.append('secondaryImg', files.secondaryImg)
        form.append('id', active.id.toString())
        form.append('typeId', active.type.id.toString())
        form.append('shopId', active.shop!.id.toString())

        editOGO(form)
    }
    if (error) return (
        <>
            <Text fontSize={'6xl'}>ERROR: {error}</Text>
        </>
    )

    return (
        <div className="row">
            <div className="col s2">
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
            <div className="col s9 mt1">
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