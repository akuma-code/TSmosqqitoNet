import React, { FC, useContext, useState } from 'react'
import { ITodoItem } from '../../types/props'
import { I } from '../Cards/I'
import { saveToLS, TodoContext } from '../pages/Todos'

interface TagSelectorProps {
    fields?: string[]
    reverse: () => void
    typesort: () => void
    numbsort: () => void
    children?: React.ReactNode
}

const btnCls = 'chip  btn waves-effect waves-light '

export const TagSelector: FC<TagSelectorProps> = ({ reverse, typesort, numbsort, children }) => {
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
            <button className={btnCls + " ml1"}
                onClick={typesort}
            >
                По Типу
            </button>
            <button className={btnCls + "ml1"}
                onClick={numbsort}
            >
                По дате
            </button>
            {children}
        </div>
    )
}
