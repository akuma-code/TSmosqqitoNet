import React, { FC, useState } from 'react'
import { I } from '../Cards/I'

interface TagSelectorProps {
    reverse: () => void
    typesort: () => void
    numbsort: () => void
    boolsort: () => void
    children?: React.ReactNode
}

const btnCls = 'chip  btn waves-effect waves-light  blue accent-1 ml1 txt-bold'

export const TagSelector: FC<TagSelectorProps> = ({ reverse, typesort, numbsort, boolsort }) => {
    // const reverse = () => TODO!.setTodos(TODO!.todos.reverse())
    const [isASC, setIsASC] = useState(true)
    const toggleASC = (): void => {
        setIsASC(!isASC)
        reverse()
    }
    const rotate = isASC ? "rotate(0deg)" : "rotate(180deg)"
    return (
        <div className='mt1 valign-wrapper tags_selector'>
            <div>
                <button className='btn-floating  blue accent-4 mx1'
                    onClick={toggleASC}
                    style={{ transition: "all .3s", transform: rotate }}
                >
                    <I title='swap_vert'
                        clsI='' />
                </button>
                <button className={btnCls}
                    onClick={typesort}
                >
                    По типу
                </button>
                <button className={btnCls}
                    onClick={numbsort}
                >
                    По времени
                </button>
                <button className={btnCls}
                    onClick={boolsort}
                >
                    По сделанному
                </button>
            </div>
            <div className='valign-wrapper flex-row'>
                {/* <I title='view_list' /> */}
                <h4 className="material-icons" >view_list</h4>
                <h5 className='pr3'>Панель сортировки</h5>
            </div>
        </div>
    )
}
