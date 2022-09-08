import React, { FC, useEffect, useState } from 'react'
import { useTodoContext } from '../../Context/TodoContext'
import { ITodoListItem } from '../../types/props'

import { I } from './I'

const TodoCard: FC<ITodoListItem> = (todo) => {

    const { context } = useTodoContext()
    const TODO = context
    const { text, checked, rem, numb, type } = todo
    const [isCheck, setIsCheck] = useState(checked)
    const cls = isCheck ? "done" : ""
    const liCls = "collection-item   todos__card s3"
    const zebraColor = (type === 'notes') ? "grey lighten-1" : "blue accent-1"

    const check = (numb: number) => TODO!.setTodos(TODO!.todos.map(t => t.numb === numb ? { ...t, checked: isCheck } : t))

    useEffect(() => {
        check(numb)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCheck])



    return (
        <li className={[cls, zebraColor, liCls].join(" ")}
            style={{ padding: ".3em .3em" }}
        >
            <div>

                <label
                    className='valign-wrapper ml2'
                    style={{ minWidth: "fit-content", borderRight: "1px solid black" }}>

                    <input
                        type="checkbox"
                        checked={isCheck}
                        onChange={() => setIsCheck(prev => !prev)} />
                    <span style={{ wordWrap: "break-word" }} className="pr1">
                        {/* {!isCheck && "Сделано!"} */}
                    </span>
                </label>
            </div >
            <div className='w100 px1'>
                {!isCheck &&
                    <div className='icon-wrapper rounded'>
                        {type === 'notes' && <span className="material-icons green-text">description </span>}
                        {type === 'cash' && <span className="material-icons red-text">attach_money</span>}
                    </div>
                }
                <b className={cls}>{text}</b>
            </div>
            <button className='btn red lighten-1'
                onClick={() => rem(numb)}
            >
                <I title='delete' />
            </button>
            <hr />
        </li >

    )
}

export default TodoCard