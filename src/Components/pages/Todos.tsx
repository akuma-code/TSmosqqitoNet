import React, { useEffect, useState } from 'react'
import { useSorting } from '../../hooks/useSorting'
import { ITodoFormTypes, ITodoItem, TodoInputType as TdIType } from '../../types/props'
import { I } from '../Cards/I'
import { TodoList } from '../Cards/TodoList'
import { SortSelector } from '../Forms/SortSelector'
import { TagSelector } from '../Forms/TagSelector'
import { TodoForm } from '../Forms/TodoForm'


const getFromLS = (): ITodoItem[] => {
    const saved = JSON.parse(localStorage.getItem('saved_todos') || '[]')
    return saved
}

const saveToLS = (todos: ITodoItem[]) => {
    const saved = JSON.stringify(todos)
    return localStorage.setItem('saved_todos', saved)
}



export const Todos = () => {

    const [formType, setFormType] = useState<ITodoFormTypes>({ type: TdIType.NOTES })
    const [todos, setTodos] = useState<ITodoItem[]>(getFromLS())
    const [sort_field, setSortField] = useState({ type: "type" })
    const ADDTODO = (todo: ITodoItem) => (setTodos([todo, ...todos]))
    const REMOVE = (numb: number) => setTodos(prev => prev.filter(i => i.numb !== numb))
    const getSort = (type: string) => setSortField({ type: type })
    // const sorted = useSorting(todos, sort_field.type)
    useEffect(() => {
        saveToLS(todos)
    }, [todos])
    return (
        <div className='container'>
            <div className='mt1 valign-wrapper'>
                <div className="chip  btn waves-effect waves-light ml1"
                    onClick={() => setFormType(prev => ({ ...prev, type: TdIType.NOTES }))}
                >

                    <I title='post_add' clsI='left' />

                    <i>
                        Заметки
                    </i>
                </div>
                <div className="chip btn waves-effect waves-light mx1"
                    onClick={() => setFormType(prev => ({ ...prev, type: TdIType.CASH }))}
                >
                    <I title='monetization_on' clsI='left' />
                    <i>
                        Внести
                    </i>
                </div>
            </div>
            <TodoForm type={formType.type} ADD={ADDTODO} />
            <TagSelector >

            </TagSelector>

            {/* <SortSelector sort={getSort} /> */}
            <hr />
            <TodoList items={todos} remove={REMOVE} />
        </div>
    )
}
