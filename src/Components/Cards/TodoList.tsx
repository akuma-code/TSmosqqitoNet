import React, { FC } from 'react'
import { ITodoItem } from '../../types/props'
import TodoCard from './TodoCard'

type ITodoLIstProps = {
    items: ITodoItem[]
    children?: React.ReactNode
}

export const TodoList: FC<ITodoLIstProps> = ({ items }) => {

    return (
        <ul className='col w100'>
            {items.map(item => (
                <TodoCard
                    checked={item.checked}
                    numb={item.numb}
                    text={item.text}
                    key={item.numb}
                />
            ))}
        </ul>
    )
}
