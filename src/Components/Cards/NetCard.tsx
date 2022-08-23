import React, { useEffect, useState } from 'react'
import { useCalcNet } from '../../hooks/useCalcNet'

import { INetCardProps } from '../../types/props'
import { I } from './I'



const NetCard: React.FC<INetCardProps> = (props) => {
    const { h, isSimple, w } = props
    const [calcedNet, setCalcedNet] = useState({ W: 0, H: 0 })
    const [isSKF, setIsSKF] = useState(!isSimple)
    const { simple, skf } = useCalcNet(w, h)
    const toggle = () => setIsSKF(!isSKF)

    useEffect(() => {
        isSKF ? setCalcedNet(skf) : setCalcedNet(simple)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSKF])

    return (
        <div className="my1 form__list grey lighten-2 z-depth-3 px1">
            <div>
                <button
                    style={{ width: "100px" }}

                    className={`btn  pb1  ${isSKF ? "deep-orange darken-2" : "blue-grey darken-4"} `}
                    onClick={() => toggle()}
                >
                    {isSKF ? "SKF" : "Простая"}
                </button>
                {isSKF && <i className="material-icons">grid_4x4</i>}
                {isSKF && <I title='grid_4x4' />}
                {!isSKF && <i className="material-icons large-text">grid_3x3</i>}
                <button

                    className='btn mx1 cyan lighten-4 black-text'
                    onClick={() => toggle()}
                >
                    <b>{calcedNet.W} мм x {calcedNet.H} мм</b>
                </button>

            </div>
            <div className='flex-row'>
                <div className='flex-col'>
                    <span className='center'> Световой проем: </span>
                    <b className='center'> {w} мм x {h} мм</b>
                </div>
                <button className="material-icons red-text mx1 "
                    onClick={() => props.remove(props.id)}
                >delete</button>

            </div>


        </div>
    )
}


export default NetCard