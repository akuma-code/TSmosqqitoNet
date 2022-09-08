import React, { useContext } from "react";
import { ITodoItem } from "../types/props";

export interface ITodoContext {
    todos: ITodoItem[],
    setTodos: (todos: ITodoItem[]) => void
    reverse?: (todos: ITodoItem[]) => void
}
export const TodoContext = React.createContext<ITodoContext | null>(null)


export function useTodoContext() {
    const context = useContext(TodoContext)
    if (!context) {
        throw new Error('Хук используется вне провайдера контекста!')
    }
    return { context } as const
}

