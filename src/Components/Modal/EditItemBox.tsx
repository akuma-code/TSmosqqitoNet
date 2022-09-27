import { Box, Button, ButtonGroup, Center, Heading, HStack, Image, Spinner, VStack } from '@chakra-ui/react';
import React, { useContext, useCallback } from 'react';
import { HostContext } from '../../App';
import { CustomInput } from '../pages/CustomInput';
import { CustomFileInput } from "../pages/CustomFileInput";
import { AddedValues, NUM } from '../pages/PageTesting';
import { StrNum } from '../../types/WarehouseTypes';

export interface EditItemBoxProps {
    item: AddedValues
    setItem(prev: any): void
    handlers: {
        inputFileHandler: (e: React.ChangeEvent<HTMLInputElement>, type: string) => void
        submitHandler: () => void
        resetHandler: () => void
    }
}

export const EditItemBox: React.FC<EditItemBoxProps> = ({ item, setItem, handlers }): JSX.Element => {

    const change = (field: string, value: StrNum) => setItem((prev: any) =>
        ({ ...prev, [field]: (field === 'typename_new') ? value : NUM(value) }))
    const { inputFileHandler, resetHandler, submitHandler } = handlers




    const { host } = useContext(HostContext);

    return (
        <Box
            // border={'1rem groove #0c99eb'}
            padding='2rem'
            borderRadius={'lg'}
            // marginRight={4}
            bgGradient={'linear(to-r, #087cc9, #bda7e0)'}
        >


            <Heading size={'lg'}>Тип: {item!.typename || "Не выбран!"}</Heading>
            {item.typename &&
                <>
                    <HStack className=' my1' justifyContent={'space-between'}>
                        <Image

                            border='2px solid grey'
                            alt='No IMAGE'
                            borderRadius={'lg'}
                            maxHeight={'5em'}
                            src={`${host}${item!.img_main || 'noimage.jpg'}`} />

                        <CustomFileInput selectFile={(e) => inputFileHandler(e, 'file_main')}>
                            <div className='flex-row-between wrap-normal'><i className="material-icons">edit</i> загрузить</div>
                        </CustomFileInput>
                    </HStack>
                    <HStack className='my1' justifyContent={'space-between'}>
                        <Image
                            border='2px solid grey'
                            alt='No IMAGE'
                            borderRadius={'lg'}
                            maxHeight={'4em'}
                            src={`${host}${item!.img_sec || 'noimage.jpg'}`} />
                        <CustomFileInput selectFile={(e) => inputFileHandler(e, 'file_sec')}>
                            <div className='flex-row-between wrap-normal'><i className="material-icons">edit</i> загрузить</div>
                        </CustomFileInput>
                    </HStack>


                    <VStack justifyContent={'space-between'}>

                        <CustomInput
                            active={item}
                            value={item!.typename_new || item!.typename}
                            field='typename'
                            changeHandler={e => change('typename_new', e.target.value)}
                        />
                        <CustomInput active={item} value={`${item.price_new || item.price}`} field='price' desc=' руб.'
                            changeHandler={e => change('price_new', e.target.value)} />
                        <CustomInput active={item} value={`${item.quant_new || item.quant}`} field='quant' desc=" шт."
                            changeHandler={e => change('quant_new', e.target.value)} />
                        <ButtonGroup dir='horisontal' spacing={20}>
                            <Button onClick={submitHandler}
                                colorScheme='green'
                            >
                                Подтвердить
                            </Button>
                            <Button onClick={resetHandler}
                                colorScheme='red'
                            >
                                Отмена
                            </Button>
                        </ButtonGroup>

                    </VStack>
                </>}


        </Box>)
}
