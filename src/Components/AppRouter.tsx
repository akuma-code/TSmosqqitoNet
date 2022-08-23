import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Nets } from './pages/Nets'
import { PageTesting } from './pages/PageTesting'
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
                path="/todos"
                element={<Todos />}
            />
            <Route path='/test'
                element={<PageTesting />}
            />
            <Route path='/'
                element={<Nets />}
            />
        </Routes>
    )
}
