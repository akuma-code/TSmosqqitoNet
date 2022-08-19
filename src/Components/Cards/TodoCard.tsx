import React, { FC } from 'react'
import { ITodoItem } from '../../types/props'

const TodoCard: FC<ITodoItem> = (todo) => {
    const { text, checked } = todo

    return (
        <li className="collection-item row">
            <label>
                <input id="indeterminate-checkbox" type="checkbox" checked={checked} className='filled-in' />
            </label>
            <img src="images/yuna.jpg" alt="" className="circle" />
            {/* <span className="title">Title</span> */}
            <p>{text}
                <i className="material-icons">grade</i></p>
            <br />
        </li>
    )
}

export default TodoCard