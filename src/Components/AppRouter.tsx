import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Nets } from './pages/Nets'
import { OfferNotesPage } from './pages/OfferNotesPage'
import { PageTesting } from './pages/PageTesting'
import { SkladPage } from './pages/SkladPage'
import { Todos } from './pages/Todos'


type AppRouterProps = {
    children?: React.ReactNode[] | string
}

export const AppRouter: FC<AppRouterProps> = () => {

    const authRoutes = [
        {
            path: '/nets',
            element: <Nets />
        }, {
            path: "/todos",
            element: <Todos />
        }, {
            path: '/test',
            element: <PageTesting />
        }, {
            path: '/offers',
            element: <OfferNotesPage />
        },
    ];

    const publicRoutes = [
        {
            path: '/sklad',
            element: <SkladPage />
        },
    ]


    const checkAuth = () => {

        const ls = localStorage.getItem('isAuth') || 'false'
        const isAuth = JSON.parse(ls)
        return JSON.parse(isAuth)
    }
    return (

        <Routes>
            {
                checkAuth() && authRoutes.map((r, idx) => (
                    <Route {...r} key={idx} />
                ))
            }
            {
                publicRoutes.map((r, idx) => (
                    <Route {...r} key={idx} />
                ))
            }

            <Route index element={<SkladPage />}
            />
        </Routes>
    )
}


/* <Route
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
            /> */