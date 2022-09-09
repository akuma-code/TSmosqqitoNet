import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Nets } from './pages/Nets'
import { PageCreateModel } from './pages/PageCreateModel'
import { PageTesting } from './pages/PageTesting'
import { SkladPage } from './pages/SkladPage'
import { Todos } from './pages/Todos'

type AppRouterProps = {
    children?: React.ReactNode[] | string
}

export const AppRouter: FC<AppRouterProps> = () => {
    return (
        <Routes>
            <Route
                path='/nets'
                element={<Nets />}
            />
            <Route
                path='/test2'
                element={<PageCreateModel />}
            />
            <Route
                path="/todos"
                element={<Todos />}
            />
            <Route path='/test'
                element={<PageTesting />}
            />
            <Route path='/sklad'
                element={<SkladPage />}
            />
            <Route path='/'
                element={<Nets />}
            />
        </Routes>
    )
}
