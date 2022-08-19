import React, { FC, useState } from 'react'
import { ITodoItem, ITodoListItem } from '../../types/props'

const TodoCard: FC<ITodoListItem> = (todo) => {
    const { text, checked, remove } = todo
    const [isCheck, setIsCheck] = useState(checked)
    const cls = isCheck ? "collection-item todos__card done" : "collection-item todos__card"

    return (
        <li className={cls}>
            <div>
                <label className='valign-wrapper'>
                    <input
                        type="checkbox"
                        checked={isCheck}
                        onChange={() => setIsCheck(prev => !prev)} />
                    <span ></span>
                </label>
            </div>
            <div>
                <b>{text}</b>
            </div>
            <button className='btn-large red lighten-1'
                onClick={() => remove(todo.numb)}
            >
                <i className="material-icons">
                    delete
                </i>
            </button>

        </li>
    )
}

export default TodoCard