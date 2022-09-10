import { Box, Button, ButtonGroup, Center, Heading, HStack, Image, Spinner, VStack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { HostContext } from '../../App';
import { CustomInput } from '../pages/CustomInput';
import { CustomFileInput } from "../pages/CustomFileInput";
import { AddedValues } from '../pages/PageTesting';

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


    const { inputFileHandler, resetHandler, submitHandler } = handlers
    // active: AddedValues,
    // setActive: () => void,
    // selectFiles: (e: any, type: string) => void,
    // editableSubmitHandler: () => void,
    // resetHandler: () => void

    const { host } = useContext(HostContext);

    return (<Box border={'1rem groove #0c99eb'}
        padding='2rem'
        borderRadius={'2rem'}
        marginRight={4}
        bgGradient={'linear(to-l, #087cc9, #bda7e0)'}
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
                    {/* <div className='file-field '>
                <div className="btn ">
                   <i className="material-icons left">edit</i> загрузить
                    <input type="file" onChange={(e) => selectFiles(e, 'file_main')} />
                </div>

            </div> */}
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

                    <CustomInput active={item} value={item!.typename_new || item!.typename} field='typename'
                        changeHandler={(e) => setItem((prev: any) => ({ ...prev, typename_new: e.target.value }))} />
                    <CustomInput active={item} value={`${item.price_new || item.price}`} field='price' desc=' руб.'
                        changeHandler={(e) => setItem((prev: any) => ({ ...prev, price_new: parseInt(e.target.value) }))} />
                    <CustomInput active={item} value={`${item.quant_new || item.quant}`} field='quant' desc=" шт."
                        changeHandler={(e) => setItem((prev: any) => ({ ...prev, quant_new: parseInt(e.target.value) }))} />
                    <ButtonGroup dir='horisontal'>
                        <Button onClick={submitHandler}
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

                </VStack>
            </>}


    </Box>)
}
