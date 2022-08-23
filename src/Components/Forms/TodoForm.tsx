import React, { FC, useState } from 'react'
import { useRef } from 'react'
import { useCashToText } from '../../hooks/useCashToText'
import { ITodoFormProps, ITodoPayment, TodoInputType } from '../../types/props'


export type INote = {
    text: string,

}

export type INotesProps = INote[] | []
export type ICashProps = ITodoPayment[] | []

export const TodoForm: FC<ITodoFormProps> = (props) => {
    const inputfield = useRef<HTMLInputElement>(null)
    const { type, ADD } = props
    const [note, setNote] = useState<INote>({ text: "" })
    const [cash, setCash] = useState<ITodoPayment>({ sum: "", info: "" })
    const todoCash = useCashToText(cash)
    const ADDNOTE = (value: string) => setNote(prev => ({ ...prev, text: value }))
    const ADDCASH = (value: string, type: string) => setCash(prev => ({ ...prev, [type]: value }))
    const DATATYPE = {
        notes: note.text,
        cash: todoCash
    }
    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        ADD({ text: DATATYPE[type], numb: Date.now(), checked: false, type: type })
        inputfield.current && inputfield.current.focus()
        setNote({ text: "" })
        setCash({ sum: "", info: "" })

    }
    return (
        <>

            <form name='todoform'
                onSubmit={submitHandler}>
                {props.type === TodoInputType.NOTES &&
                    <div className='row  valign-wrapper'>
                        <div className='col s2 input-field'>
                            <button className='btn waves-effect waves-light w100 blue accent-2 round' formTarget='todoform' type='submit'>
                                <span>Добавить</span>
                                <i className="material-icons right">
                                    playlist_add
                                </i>

                            </button>
                        </div>
                        <div className="col s10 input-field">
                            <div className="col s9 ">
                                <label>Новая заметка
                                    <input placeholder="Добавить новую заметку" id="sum" type="text" className="validate"
                                        value={note.text}
                                        ref={inputfield}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => ADDNOTE(e.target.value)} />
                                </label>
                            </div>

                        </div>

                    </div>}
                {props.type === TodoInputType.CASH &&
                    <div className='row  valign-wrapper'>
                        <div className='col s2 input-field'>
                            <button className='btn waves-effect waves-light w100 blue accent-2' formTarget='todoform' type='submit'>
                                <span>Внести</span>
                                <i className="material-icons right">
                                    monetization_on
                                </i>

                            </button>
                        </div>
                        <div className="col s10 input-field">
                            <div className="col s4 ">
                                <label>Сумма
                                    <input placeholder="бабло" id="sum" type="text" className="validate"
                                        value={cash.sum}
                                        ref={inputfield}
                                        onChange={(e) => ADDCASH(e.target.value, 'sum')}
                                    />
                                </label>
                            </div>
                            <div className="col s8">
                                <label>Комментарий
                                    <input placeholder="За что или кого вносим" type="text" className="validate"
                                        value={cash.info}
                                        onChange={(e) => ADDCASH(e.target.value, 'info')}
                                    />
                                </label>
                            </div>
                        </div>

                    </div>}

            </form>
        </>
    )
}
