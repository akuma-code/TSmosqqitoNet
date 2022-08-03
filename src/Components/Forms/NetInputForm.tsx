import React, { useState } from 'react'
import { INetInputProps, INetListProps, ISizes } from '../../types/props'






export const NetInputForm: React.FC<INetInputProps> = ({ ADD }) => {

    const [size, setSize] = useState<ISizes>({ w: "", h: "" })

    const [isSimple, setIsSimple] = useState(false)


    const changeSize = (e: React.ChangeEvent<HTMLInputElement>, s: 'w' | 'h') => {
        const newSize = parseInt(e.target.value || '0', 10)
        setSize({ ...size, [s]: newSize })
    }
    const submitHandler = (e: React.FormEvent): void => {
        e.preventDefault()
        if (size.w === '' || size.h === '') return alert("Один из размеров не введен!")
        const newnet: INetListProps = { w: size.w || "0", h: size.h || "0", id: Date.now(), isSimple: isSimple }
        console.log('newnet', newnet)
        ADD(newnet)
        setSize({ w: '', h: '' })
    }
    return (
        <form
            className='row form__net'
            name='netinput'
            onSubmit={submitHandler}
        >
            <div className="col s2 center ">
                <div className="switch input-field">
                    <label className='black-text'>
                        <input
                            type="checkbox"
                            className='black-text'
                            onChange={() => { setIsSimple(!isSimple) }}
                        ></input>
                        <span className="lever"></span>
                        {isSimple ? "Простая" : "SKF"}
                    </label>
                </div>
            </div>
            <div className="input-field col s2 ">
                <i className="material-icons prefix center" style={{ transform: "rotate(270deg)" }}>expand</i>
                <label htmlFor="sizew">Ширина</label>
                <input
                    value={size.w}
                    id="sizew"
                    type="number"
                    className="validate center"
                    onChange={(e) => { changeSize(e, 'w') }} />
            </div>
            <div className="input-field col s2 ">
                <i className="material-icons prefix center" >expand</i>
                <label htmlFor="sizeh">Высота</label>
                <input
                    value={size.h}
                    id="sizeh"
                    type="number"
                    className="validate center"
                    onChange={(e) => { changeSize(e, 'h') }} />
            </div>

            <div className="col s3 center input-field ">
                <button formTarget='netinput' className='btn btn-large blue lighten-1'>Расчитать</button>
            </div>


        </form >

    )
}

