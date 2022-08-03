import React, { useEffect, useState } from 'react'
import { useCalcNet } from '../../hooks/useCalcNet'

import { INetCardProps } from '../../types/props'



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
        <div className="my1 form__list">
            <div>
                <button
                    style={{ width: "100px" }}

                    className={`btn  pb1 ${isSKF ? "deep-orange darken-2" : "blue-grey darken-4"} `}
                    onClick={() => toggle()}
                >
                    {isSKF ? "SKF" : "Простая"}
                </button>
                <button

                    className='btn mx1 cyan lighten-4 black-text'
                    onClick={() => toggle()}
                >
                    {calcedNet.W} x {calcedNet.H}
                </button>

            </div>

            <div>
                Световой: {w} мм x {h} мм
                <button className="material-icons red-text mx1 "
                    onClick={() => props.remove(props.id)}
                >delete</button>
            </div>


        </div>
    )
}


export default NetCard