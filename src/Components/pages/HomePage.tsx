import React, { FC, useEffect } from 'react'
import { Layout } from 'antd'
import { AntInputForm } from '../Forms/AntInputForm';
import { fetchData } from '../../Components/DataMapper'
import { IFetchDataType } from '../../types/DataTypes';
import { NetInputForm } from '../Forms/NetInputForm';
const { Content } = Layout;
type HomePageProps = {
    children?: React.ReactNode[] | string
}


export const HomePage: FC<HomePageProps> = () => {
    const fetch_options = { type: IFetchDataType.MAP }




    useEffect(() => {
        const fetched = async () => await fetchData('api/sklad', fetch_options).then(console.log)
        fetched()

    })

    return (
        <Content style={{ padding: '0 50px' }} >
            <div>AAAAAAAAAAAAAA</div>
            <NetInputForm />

        </Content>
    )
}
