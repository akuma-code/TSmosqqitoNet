import React, { FC, useContext, useEffect, useState } from 'react'
import { ITodoListItem } from '../../types/props'
import { TodoContext } from '../pages/Todos'
import { I } from './I'

const TodoCard: FC<ITodoListItem> = (todo) => {
    const TODO = useContext(TodoContext)

    const { text, checked, remove, numb, type } = todo
    const [isCheck, setIsCheck] = useState(checked)
    const cls = isCheck ? "done" : ""
    const liCls = ["collection-item", "todos__card", "s3"]

    const check = (numb: number) => TODO!.setTodos(TODO!.todos.map(t => t.numb === numb ? { ...t, checked: isCheck } : t))

    useEffect(() => {
        check(numb)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCheck])



    return (
        <li className={[cls, ...liCls].join(" ")}
            style={{ padding: ".3em .3em" }}
        >
            <div>

                <label
                    className='valign-wrapper pr-1'
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
                    <div >
                        {type === 'notes' && <span className="material-icons green-text">description </span>}
                        {type === 'cash' && <span className="material-icons red-text">attach_money</span>}
                    </div>
                }
                <b className={cls}>{text}</b>
            </div>
            <button className='btn red lighten-1'
                onClick={() => remove(numb)}
            >
                <I title='delete' />
            </button>

        </li >

    )
}

export default TodoCard