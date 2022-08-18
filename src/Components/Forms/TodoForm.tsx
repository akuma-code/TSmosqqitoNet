import React, { FC, useState } from 'react'
import { ITodoFormProps, ITodoFormTypes, ITodoPayment, TodoInputType } from '../../types/props'

const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('form submitted')
}
export type INote = {
    text: string,
    numb?: number
}

export type INotesProps = INote[] | []
export type ICashProps = ITodoPayment[] | []

export const TodoForm: FC<ITodoFormProps> = ({ type }: ITodoFormTypes, getData) => {

    const [note, setNote] = useState<INote>({ text: "" })
    const [cash, setCash] = useState<ITodoPayment>({ sum: "", info: "" })
    const ADDNOTE = (value: string) => setNote(prev => ({ ...prev, text: value }))

    const ADDCASH = (value: string, type: string) => {

        setCash(prev => ({ ...prev, [type]: value }))
    }
    // const ADDCASH=(newcash:ITodoPayment, field:'sum'|'ínfo')=>setCash(cash.map(c => c.numb === newcash.numb ?({...c, [field]:newcash[field]}):c))

    return (
        <>

            <form name='todoform'
                onSubmit={submitHandler}>
                {type === TodoInputType.NOTES &&
                    <div className='row  valign-wrapper'>
                        <div className='col s2 input-field'>
                            <button className='btn waves-effect waves-light w100' formTarget='todoform' type='submit'>
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
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => ADDNOTE(e.target.value)} />
                                </label>
                            </div>

                        </div>

                    </div>}
                {type === TodoInputType.CASH &&
                    <div className='row  valign-wrapper'>
                        <div className='col s2 input-field'>
                            <button className='btn waves-effect waves-light w100' formTarget='todoform' type='submit'>
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
                                        onChange={(e) => ADDCASH(e.target.value, 'sum')}
                                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, cash: e.target.value }))} 
                                    />
                                </label>
                            </div>
                            <div className="col s8">
                                <label>Комментарий
                                    <input placeholder="За что или кого вносим" type="text" className="validate"
                                        value={cash.info}
                                        onChange={(e) => ADDCASH(e.target.value, 'info')}
                                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, info: e.target.value }))}
                                    />
                                </label>
                            </div>
                        </div>

                    </div>}

            </form>
        </>
    )
}
