import React, { FC, useEffect, useState } from 'react'
import { ITodoListItem } from '../../types/props'
import { I } from './I'

const TodoCard: FC<ITodoListItem> = (todo) => {
    const { text, checked, remove, numb, children } = todo
    const [isCheck, setIsCheck] = useState(checked)
    const cls = isCheck ? "done" : ""
    const textCls = isCheck ? "done" : ""
    const liCls = ["collection-item", "todos__card", "s3"]




    return (


        <li className={[cls, ...liCls].join(" ")}
            style={{ padding: ".3em .3em" }}
        >
            <div>

                <label
                    className='valign-wrapper pr-1'
                    style={{ minWidth: "fit-content", borderRight: "1px solid black" }}>

                    <input
                        type="checkbox"
                        checked={isCheck}
                        onChange={() => setIsCheck(prev => !prev)} />
                    <span style={{ wordWrap: "break-word" }} className="pr1">
                        {/* {!isCheck && "Сделано!"} */}
                    </span>
                </label>
            </div >
            <div className='w100 px1'>
                {!isCheck &&
                    <div >
                        {children}
                    </div>
                }
                <b className={cls}>{text}</b>
            </div>
            <button className='btn red lighten-1'
                onClick={() => remove(numb)}
            >

                <I title='delete' />
            </button>

        </li >

    )
}

export default TodoCard