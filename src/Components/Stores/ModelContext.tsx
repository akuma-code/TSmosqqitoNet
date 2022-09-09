import React, { createContext, useReducer } from 'react'

import { modelReducer, InitialState, Init } from './ModelReducer'
type Props = {
    children?: React.ReactNode
}
export const ModelContext = createContext<Init | any>(null)

export const ModelProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(modelReducer, InitialState)

    return (
        <ModelContext.Provider value={[state, dispatch]}>
            {children}
        </ModelContext.Provider>
    )
}