import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { Todos } from './pages/Todos'

type AppRouterProps = {
    children?: React.ReactNode[] | string
}

export const AppRouter: FC<AppRouterProps> = () => {
    return (
        <Routes>
            <Route
                path='/nets'
                element={<HomePage />}
            />
            <Route
                path="/todos"
                element={<Todos />}
            />
        </Routes>
    )
}
