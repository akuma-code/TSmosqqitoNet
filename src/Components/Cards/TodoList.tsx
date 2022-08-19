/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react'
import { ITodoItem } from '../../types/props'
import TodoCard from './TodoCard'

type ITodoLIstProps = {
    items: ITodoItem[]
    children?: React.ReactNode
}

export const TodoList: FC<ITodoLIstProps> = ({ items }) => {
    const getFromLS = (): ITodoItem[] => {
        const saved = JSON.parse(localStorage.getItem('saved_todos') || '[]')
        return saved
    }
    const saveToLS = (todos: ITodoItem[]) => {
        const saved = JSON.stringify(todos)
        return localStorage.setItem('saved_todos', saved)
    }

    const [list, setList] = useState(getFromLS())
    useEffect(() => {
        setList(items)
        saveToLS(items)
    }, [items])

    const REM = (numb: number) => setList(list.filter(i => i.numb !== numb))
    if (list.length < 1) return (<h1>EMPTY!</h1>)
    return (
        <ol className='col w100 collection todos__list'>
            {list.map(item => (
                <TodoCard
                    checked={item.checked}
                    numb={item.numb}
                    text={item.text}
                    key={item.numb}
                    remove={() => REM(item.numb)}
                />
            ))}
        </ol>
    )
}
