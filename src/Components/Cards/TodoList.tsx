/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Container, Heading, Text } from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import { ITodoItem, ITodoListItem } from '../../types/props'
import TodoCard from './TodoCard'

type ITodoLIstProps = {
    items: ITodoItem[],
    rem: (numb: number) => void
    reverse: () => void
    children?: React.ReactNode
}

export const TodoList: FC<ITodoLIstProps> = ({ items, rem }) => {


    if (items.length < 1) return (
        <Heading >
            {/* <span className="material-icons inline">
                cancel
            </span> */}
            <Text fontSize='60px'>Заметок не наблюдено!!</Text>
            {/* <span className="material-icons inline">
                cancel
            </span> */}
        </Heading>
    )
    return (
        <ol className='col w100 collection z-depth-3 todos__list'>
            {items.map((item, idx) => (
                <TodoCard
                    checked={item.checked}
                    numb={item.numb}
                    text={item.text}
                    key={item.numb}
                    rem={rem}
                    type={item.type}
                    idx={idx}
                />
            ))}
        </ol>
    )
}
