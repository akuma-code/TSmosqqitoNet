import React from 'react'
import { Button, Form, Input } from 'antd';

const InputForm: React.FC = () => {


    return (
        <Form
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 2 }}
            style={{ background: "#b35802", minHeight: "20vh", display: "flex", flexDirection: "column", justifyContent: "around", alignItems: "start" }}
        >
            <Form.Item label="WIDTH">
                <Input placeholder="Ширина" />
            </Form.Item>
            <Form.Item label="HEIGHT">
                <Input placeholder="Высота" />
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default InputForm