import { Button, FormControl, Heading, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { IFiles, IWarehouse, IWarehouseForm } from '../../types/WarehouseTypes';

type ActiveItemFormProps = {
    active: IWarehouse,
    whform: IWarehouseForm,
    selectFiles: (e: React.SyntheticEvent<HTMLInputElement>, type: string) => void
    files: IFiles,
    submitHandler: () => void
    onChangeForm: (e: React.ChangeEvent<HTMLInputElement>, k: string) => void
    children?: React.ReactNode
}

export const ActiveItemForm: React.FC<ActiveItemFormProps> = (props) => {

    const { active, whform, selectFiles, files, submitHandler, onChangeForm } = props

    return (
        <>
            <Heading textAlign={'center'}>
                ID Склада: {active.id || "###"}
            </Heading>

            <FormControl className='col '
                id='form'
            >
                <Input
                    variant='filled'
                    placeholder='ТИП'
                    // defaultValue={active.typename}
                    value={whform.typename}
                    borderWidth={1}
                    borderStyle='double'
                    onChange={(e) => onChangeForm(e, 'typename')}
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
                        onChange={(e) => onChangeForm(e, 'price')} />
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
                        onChange={(e) => onChangeForm(e, 'quant')} />
                    <InputRightElement pointerEvents={'none'} children={'шт.'} />
                </InputGroup>
                <div className="file-field input-field">
                    <div className="btn">
                        <span>Изображение</span>
                        <input type="file" onChange={(e) => selectFiles(e, 'file_main')} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" value={files.src_main} />
                    </div>
                </div>
                <div className="file-field input-field">
                    <div className="btn">
                        <span>Доп</span>
                        <input type="file" onChange={(e) => selectFiles(e, 'file_sec')} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" value={files.src_second} />
                    </div>
                </div>
                <Button
                    onClick={submitHandler}
                    form='form'
                >Сохранить изменения</Button>
            </FormControl>
        </>)
}
