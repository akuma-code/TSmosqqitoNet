import React, { useState } from 'react'

type TypeHandler = {
    on: () => void,
    off: () => void,
    toggle: () => void,
}

export const useToggle = (): [flag: boolean, handler: TypeHandler] => {
    const [toggleFlag, setToggle] = useState(false)
    const toggleFunc = () => setToggle(state => !state)
    const setOn = () => setToggle(true)
    const setOf = () => setToggle(false)

    const flagHandler = {
        toggle: toggleFunc,
        on: setOn,
        off: setOf
    }

    return [toggleFlag, flagHandler]
}