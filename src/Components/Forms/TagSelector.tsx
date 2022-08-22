import React, { FC, useContext, useState } from 'react'
import { ITodoItem } from '../../types/props'
import { I } from '../Cards/I'
import { saveToLS, TodoContext } from '../pages/Todos'

interface TagSelectorProps {
    fields?: string[]
    reverse: () => void
    children?: React.ReactNode
}

const btnCls = 'chip  btn waves-effect waves-light '

export const TagSelector: FC<TagSelectorProps> = ({ reverse, children }) => {
    // const reverse = () => TODO!.setTodos(TODO!.todos.reverse())
    const [isASC, setIsASC] = useState(true)
    const toggleASC = (): void => {
        setIsASC(!isASC)
        reverse()
    }

    return (
        <div className='mt1 valign-wrapper'>

            <button className='btn-floating  mx1'
                onClick={toggleASC}
            >
                <I title={isASC ? 'arrow_upward' : 'arrow_downward'}
                    clsI='' />
            </button>
            <button className={btnCls + " ml1"} disabled
            >
                По Типу
            </button>
            <button className={btnCls + "ml1"} disabled
            >
                По дате
            </button>
            {children}
        </div>
    )
}
