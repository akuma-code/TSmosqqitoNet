import React, { useState } from 'react'
import { useRef } from 'react'
import { INetInputProps, ISizes } from '../../types/props'
import { I } from '../Cards/I'

export type newNetType = {
    w: string,
    h: string,
    id: number,
    isSimple: boolean,
    isForbidden: boolean
}




export const NetInputForm: React.FC<INetInputProps> = ({ ADD }) => {
    const fieldW = useRef<HTMLInputElement | null>(null)
    const [size, setSize] = useState<ISizes>({ w: "", h: "" })

    const [isSimple, setIsSimple] = useState(false)


    const changeSize = (e: React.ChangeEvent<HTMLInputElement>, s: 'w' | 'h') => {
        const newSize = parseInt(e.target.value || '0', 10)
        setSize(size => ({ ...size, [s]: newSize }))
    }
    const submitHandler = (e: React.FormEvent): void => {
        e.preventDefault()
        if (size.w === '' || size.h === '') return alert("Один из размеров не введен!")

        const newnet: newNetType = { w: size.w || "0", h: size.h || "0", id: Date.now(), isSimple: isSimple, isForbidden: true }
        ADD(newnet)
        fieldW.current && fieldW.current.focus()
        setSize({ w: '', h: '' })
    }
    return (
        <form
            className='row form__net'
            name='netinput'
            onSubmit={submitHandler}
        >
            <div className="col s3 center ">
                <div className="switch input-field valign-wrapper">
                    <label className='black-text align-center'>
                        <input
                            type="checkbox"
                            className='black-text'
                            onChange={() => { setIsSimple(prev => !prev) }}
                        />
                        {isSimple ? <I title='grid_3x3' /> : <I title='grid_4x4' />}
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
                    ref={fieldW}
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
                <button formTarget='netinput' className='btn btn-large blue lighten-1'>Рассчитать</button>
            </div>


        </form >

    )
}

