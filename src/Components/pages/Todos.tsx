import { Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ITodoFormTypes, ITodoItem, TodoInputType as TdIType } from '../../types/props'
import { I } from '../Cards/I'
import { ListContainer } from '../Cards/ListContainer'
import TodoCard from '../Cards/TodoCard'
import { TagSelector } from '../Forms/TagSelector'
import { TodoForm } from '../Forms/TodoForm'
import { TodoContext } from '../../Context/TodoContext'

export const getFromLS = (): ITodoItem[] => {
    const saved = JSON.parse(localStorage.getItem('saved_todos') || '[]')
    return saved
}

export const saveToLS = (todos: ITodoItem[]): void => {
    const saved = JSON.stringify(todos)
    return localStorage.setItem('saved_todos', saved)
}




export const Todos = () => {

    const [formType, setFormType] = useState<ITodoFormTypes>({ type: TdIType.NOTES })
    const [todos, setTodos] = useState<ITodoItem[]>(getFromLS())


    const REVERSE = () => setTodos([...todos].reverse())
    const SortType = () => {
        const sorttype = (arr: ITodoItem[]) => [...arr].sort((a, b) => a.type.localeCompare(b.type))
        setTodos(prev => sorttype(prev))
    }
    const SortNumb = () => {
        const sortNumb = (arr: ITodoItem[]) => [...arr].sort((a, b) => a.numb - b.numb)
        setTodos(prev => sortNumb(prev))
    }
    const SortBoolean = () => {
        const bool = (el: boolean): number => el ? 1 : 0
        const sortBool = (arr: ITodoItem[]) => [...arr].sort((a, b) => (bool(a.checked) - bool(b.checked)))

        setTodos(prev => sortBool(prev))
    }

    const ADDTODO = (todo: ITodoItem) => (setTodos([todo, ...todos]))
    const REMOVE = (numb: number) => setTodos(prev => prev.filter(i => i.numb !== numb))
    useEffect(() => {
        saveToLS(todos)
    }, [todos])


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
                            boolsort={SortBoolean}
                        />
                        <hr />
                        <ListContainer>
                            {todos.map((todo, idx) => (
                                <TodoCard
                                    checked={todo.checked}
                                    numb={todo.numb}
                                    text={todo.text}
                                    key={todo.numb}
                                    rem={REMOVE}
                                    type={todo.type}
                                    idx={idx} />
                            ))}
                        </ListContainer>
                    </>
                    :
                    <div className='flex-row red-text center-text'>
                        <span className="material-icons inline">
                            cancel
                        </span>
                        <Text fontSize={'60'}>Заметок не наблюдено!!</Text>
                        <span className="material-icons inline">
                            cancel
                        </span>
                    </div>
                }
            </div>
        </TodoContext.Provider>
    )
}
