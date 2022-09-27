import React, { useState, useContext } from 'react'
import { HostContext } from '../App'


export const useAuth = () => {

    const context = useContext(HostContext)
    if (!context) {
        throw new Error('Хук используется вне провайдера контекста!')
    }

    const { isAuth, setAuth } = context
    return { isAuth, setAuth } as const

}