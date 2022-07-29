import React, { FC } from 'react'
import { Layout } from 'antd'
import { AntInputForm } from '../Forms/AntInputForm';
import { test } from '../../Components/DataMapper'
const { Sider, Content } = Layout;
type HomePageProps = {
    children?: React.ReactNode[] | string
}


export const HomePage: FC<HomePageProps> = () => {
    test()
    return (
        <Content style={{ padding: '0 50px' }} >

            <AntInputForm />
            <Layout style={{ padding: '24px 0' }}>
                <Sider width={200} style={{ float: "left" }}>
                </Sider>
                <Content style={{ padding: '0 150px', minHeight: 280, float: "left" }}><AntInputForm /></Content>
            </Layout>
        </Content>
    )
}
