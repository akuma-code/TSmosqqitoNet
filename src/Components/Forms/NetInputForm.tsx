import React, { useState } from 'react'
import { INetInputProps, INetListProps, ISizes } from '../../types/props'






export const NetInputForm: React.FC<INetInputProps> = ({ value = { w: "0", h: "0" }, ADD }) => {

    const [size, setSize] = useState<ISizes>({ w: "", h: "" })
    const [typeNet, setTypeNet] = useState<string>("skf")



    const changeSize = (e: React.ChangeEvent<HTMLInputElement>, s: 'w' | 'h') => {
        const newSize = parseInt(e.target.value || '0', 10)
        setSize({ ...size, [s]: newSize })
    }
    const changeType = (value: string) => {
        setTypeNet(value)
    }
    const submitHandler = (): void => {
        const newnet: INetListProps = { w: size.w || "0", h: size.h || "0", type: typeNet || "skf" }
        console.log('newnet', newnet)
        ADD(newnet)
    }
    return (
        <form className='row form__net' name='netinput'>

            <div className="input-field col s2 ">
                <i className="material-icons prefix center" style={{ transform: "rotate(270deg)" }}>expand</i>
                <label htmlFor="sizew">Ширина</label>
                <input
                    id="sizew"
                    type="number"
                    className="validate center" />
            </div>
            <div className="input-field col s2 ">
                <i className="material-icons prefix center" >expand</i>
                <label htmlFor="sizeh">Высота</label>
                <input
                    id="sizeh"
                    type="number"
                    className="validate center" />
            </div>
            <div className="col s3 center ">
                <div className="switch input-field">
                    <label className='black-text'>
                        SKF
                        <input type="checkbox" className='black-text'></input>
                        <span className="lever  blue darken-3 red-text"></span>
                        SIMPLE
                    </label>
                </div>
            </div>
            <div className="row s1 center input-field ">
                <button form='netinput' className='btn btn-large'>SUBMIT</button>
            </div>


        </form >

    )
}

