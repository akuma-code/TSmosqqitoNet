import React, { useMemo } from 'react'
import { ITodoItem, TodoInputType } from '../types/props'
interface SFTYPES {
    numb(arr: ITodoItem[]): ITodoItem[] | []
    type(arr: ITodoItem[]): ITodoItem[] | any
    checked(arr: ITodoItem[]): ITodoItem[] | any
}
type sort_types = string | 'numb' | 'type' | 'checked'
const SORTFUNC = (sort: sort_types) => {
    const func = {
        numb: (arr: ITodoItem[]) => ([...arr].sort((a, b) => a.numb - b.numb)),
        type: (arr: ITodoItem[]) => ([...arr].sort((a, b) => a.type.localeCompare(b.type))),
        checked: (arr: ITodoItem[]) => {
            const y: ITodoItem[] = [];
            const n: ITodoItem[] = [];
            arr.map(item => item.checked === true ? y.push(item) : n.push(item))
            return [...n, ...y]
        }
    }

}
export const useSorting = (todos: ITodoItem[], sort_field: sort_types) => {





    return

    // switch(sort_field) {
    //     case ('numb'): {
    //         return [...todos].sort((a, b) => b.numb - a.numb)
    //         // console.log("todos:", todos);
    //     }
    //     case ('type'): {

    //         // todos.map(t => t.checked === true ? ch.push(t) : unch.push(t))

    //         return [...todos].sort((a, b) => a.type.localeCompare(b.type))

    //     }
    //     case ('checked'): {
    //         const ch: ITodoItem[] = []
    //         const unch: ITodoItem[] = []
    //         todos.map(i => i.checked === false ? unch.push(i) : ch.push(i))
    //         const sorted: ITodoItem[] = [...unch, ...ch]
    //         return sorted
    //     }
    //     default: return todos
    // 


}



