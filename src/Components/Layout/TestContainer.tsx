import { Layout, } from 'antd'
import React, { FC } from 'react'
import TextCard from '../Cards/TextCard';
import InputForm from '../Forms/InputForm';

const { Content, Sider } = Layout

const stl = {
    content: {},
    layout: {
        clsName: "d-flex flex-row justify-content-between mx-2"
    }
}

interface TestContainerProps {
    contentlist?: any[];
    form?: React.FC;
    children?: React.ReactNode
}

const TestContainer: FC<TestContainerProps> = ({ contentlist, children }) => {


    return (
        <Layout>
            <Layout className={stl?.layout?.clsName} >
                <Sider>
                    <InputForm />
                </Sider>
                <Content >
                    {contentlist?.map((item, idx: number) =>
                        <TextCard key={idx} text={item.text} title={item.title} />)}
                </Content>
                {children}
            </Layout>
        </Layout>
    )
}

export default TestContainer