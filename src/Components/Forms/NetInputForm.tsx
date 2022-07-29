import { Form, Input, Select } from 'antd'
import React, { useState } from 'react'

type ISizes = {
    w: string | number
    h: string | number
}
type INetType = 'skf' | 'simple'
type NetTypeProps = {
    value?: INetType
    onChange?: (value: INetType) => void
}
type INetInputProps = {
    value?: ISizes
    onChange?: (value: ISizes) => void
}


export const NetInputForm: React.FC<INetInputProps> = ({ value = { w: 0, h: 0 }, onChange }) => {
    const [size, setSize] = useState<ISizes>({ w: "", h: "" })
    const [typeNet, setTypeNet] = useState<any>({ value: "skf" })



    const changeSize = (e: React.ChangeEvent<HTMLInputElement>, s: 'w' | 'h') => {
        const newSize = parseInt(e.target.value || '0', 10)
        setSize({ ...size, [s]: newSize })
    }
    const changeType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTypeNet({ ...typeNet, value: e.target.value })
    }
    const submitHandler = () => {
        console.log(size)
    }
    return (
        <Form
            onFinish={submitHandler}
        >
            <Form.Item>
                <Input value={value.w || size.w}
                    onChange={(e) => changeSize(e, 'w')}
                    placeholder='w'
                />
            </Form.Item>
            <Form.Item>
                <Input value={value.h || size.h}
                    onChange={(e) => changeSize(e, 'h')}
                    placeholder='h'
                />
            </Form.Item>

            <Select
                value={typeNet}
                onChange={changeType}
            >
                <Select.Option value='skf'>skf</Select.Option>
                <Select.Option value='simple'>simple</Select.Option>
            </Select>

        </Form>
    )
}

