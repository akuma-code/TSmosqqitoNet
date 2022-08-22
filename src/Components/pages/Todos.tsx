import React, { useEffect, useState } from 'react'
import { useSorting } from '../../hooks/useSorting'
import { ITodoFormTypes, ITodoItem, TodoInputType as TdIType } from '../../types/props'
import { I } from '../Cards/I'
import { ListContainer } from '../Cards/ListContainer'
import TodoCard from '../Cards/TodoCard'
import { TodoList } from '../Cards/TodoList'
import { SortSelector } from '../Forms/SortSelector'
import { TagSelector } from '../Forms/TagSelector'
import { TodoForm } from '../Forms/TodoForm'


export const getFromLS = (): ITodoItem[] => {
    const saved = JSON.parse(localStorage.getItem('saved_todos') || '[]')
    return saved
}

export const saveToLS = (todos: ITodoItem[]): void => {
    const saved = JSON.stringify(todos)
    return localStorage.setItem('saved_todos', saved)
}
export interface ITodoContext {
    todos: ITodoItem[],
    setTodos: (todos: ITodoItem[]) => void
    reverse?: (todos: ITodoItem[]) => void
}
export const TodoContext = React.createContext<ITodoContext | null>(null)


export const Todos = () => {

    const [formType, setFormType] = useState<ITodoFormTypes>({ type: TdIType.NOTES })
    const [isSORT, setIsSORT] = useState(false)
    const [todos, setTodos] = useState<ITodoItem[]>(getFromLS())
    const REVERSE = () => {
        setTodos(todos.reverse())
        setIsSORT(prev => !prev)
    }
    const SortType = () => {
        const sorttype = (arr: ITodoItem[]) => arr.sort((a, b) => a.type.localeCompare(b.type))
        setIsSORT(prev => !prev)
        setTodos(prev => sorttype(prev))
    }
    const SortNumb = () => {
        const sortNumb = (arr: ITodoItem[]) => arr.sort((a, b) => a.numb - b.numb)
        setIsSORT(prev => !prev)
        setTodos(prev => sortNumb(prev))
    }

    // const [sort_field, setSortField] = useState({ type: "type" })
    const ADDTODO = (todo: ITodoItem) => (setTodos([todo, ...todos]))
    const REMOVE = (numb: number) => setTodos(prev => prev.filter(i => i.numb !== numb))
    // const getSort = (type: string) => setSortField({ type: type })
    // const sorted = useSorting(todos, sort_field.type)
    useEffect(() => {
        saveToLS(todos)
    }, [todos, isSORT])


    return (
        <TodoContext.Provider
            value={{ todos, setTodos }}
        >
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

                {todos.length >= 1 ?
                    <>
                        <TagSelector
                            reverse={REVERSE}
                            typesort={SortType}
                            numbsort={SortNumb}
                        />
                        <hr />
                        <ListContainer>
                            {todos.map(todo => (
                                <TodoCard
                                    checked={todo.checked}
                                    numb={todo.numb}
                                    text={todo.text}
                                    key={todo.numb}
                                    remove={REMOVE}
                                    type={todo.type} />
                            ))}
                        </ListContainer></>
                    :
                    <div className='flex-row red-text center-text'>
                        <span className="material-icons inline">
                            cancel
                        </span>
                        <h3>Заметок не наблюдено!!</h3>
                        <span className="material-icons inline">
                            cancel
                        </span>
                    </div>
                }
            </div>
        </TodoContext.Provider>
    )
}
