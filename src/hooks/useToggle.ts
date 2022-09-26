import { useState } from 'react'

export type IToggleFuncs = {
    on: () => void,
    off: () => void,
    toggle: () => void,
}

type TuppleToggle = [
    toggleFlag: boolean,
    flagHandler: IToggleFuncs
]
/**
 * возвращает boolean-стейт и хэндлер с методами on, off, toggle
 * @param {boolean} initial  начальное значение
 * @returns {TuppleToggle} [flag, setFlag]
 */
export const useToggle = (initial: boolean = false): TuppleToggle => {
    const [toggleFlag, setToggleFlag] = useState(initial)
    const setToggle = () => setToggleFlag(state => !state)
    const setOn = () => setToggleFlag(true)
    const setOf = () => setToggleFlag(false)

    const flagHandler = {
        toggle: setToggle,
        on: setOn,
        off: setOf
    }

    return [toggleFlag, flagHandler]
}