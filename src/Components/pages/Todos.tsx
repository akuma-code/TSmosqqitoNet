import React, { useEffect, useState } from 'react'
import { ITodoFormTypes, ITodoItem, TodoInputType as TdIType } from '../../types/props'
import { TodoList } from '../Cards/TodoList'
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

    const ADDTODO = (todo: ITodoItem) => (setTodos([todo, ...todos]))
    const REMOVE = (numb: number) => setTodos(prev => prev.filter(i => i.numb !== numb))


    useEffect(() => {
        saveToLS(todos)
    }, [todos])
    return (
        <div className='container'>
            <div className='mt1 valign-wrapper'>
                <div className="chip  btn waves-effect waves-light ml1"
                    onClick={() => setFormType(prev => ({ ...prev, type: TdIType.NOTES }))}
                >
                    <i className="material-icons left">
                        post_add
                    </i>
                    <i>
                        Заметки
                    </i>
                </div>
                <div className="chip btn waves-effect waves-light mx1"
                    onClick={() => setFormType(prev => ({ ...prev, type: TdIType.CASH }))}
                >
                    <i className="material-icons left">
                        monetization_on
                    </i>
                    <i>
                        Внести
                    </i>
                </div>
            </div>
            <TodoForm type={formType.type} ADD={ADDTODO} />

            <TodoList items={todos} remove={REMOVE} />
        </div>
    )
}
