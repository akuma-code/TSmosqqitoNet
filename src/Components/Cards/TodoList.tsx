/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react'
import { ITodoItem, ITodoListItem } from '../../types/props'
import TodoCard from './TodoCard'

type ITodoLIstProps = {
    items: ITodoItem[],
    remove: (numb: number) => void
    children?: React.ReactNode
}

export const TodoList: FC<ITodoLIstProps> = ({ items, remove }) => {


    if (items.length < 1) return (
        <div className='flex-row red-text center-text'>
            <span className="material-icons inline">
                cancel
            </span>
            <h3>Заметок не наблюдено!!</h3>
            <span className="material-icons inline">
                cancel
            </span>
        </div>
    )
    return (
        <ol className='col w100 collection z-depth-3 todos__list'>
            {items.map((item, idx) => (

                <TodoCard
                    checked={item.checked}
                    numb={item.numb}
                    text={item.text}
                    key={item.numb}
                    remove={remove}
                >
                    {item.type === 'notes' &&
                        <span className="material-icons green-text">description </span>
                    }
                    {item.type === 'cash' &&
                        <span className="material-icons red-text">attach_money</span>
                    }

                </TodoCard>

            ))}
        </ol>
    )
}
