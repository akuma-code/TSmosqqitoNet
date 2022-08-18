import React, { useState } from 'react'
import { ITodoFormTypes, ITodoNote, TodoInputType as TdIType } from '../../types/props'
import { TodoForm } from '../Forms/TodoForm'

export const Todos = () => {

    const [formType, setFormType] = useState<ITodoFormTypes>({ type: TdIType.NOTES })
    const [formList, setFormList] = useState([])
    // const getData=(data:string | { sum: string, info: string })=>  setFormList(prev => [...prev, data]) 

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
            <TodoForm type={formType.type} />
        </div>
    )
}
