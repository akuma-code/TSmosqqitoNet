import React, { useEffect, useState } from 'react'
import { useCalcNet } from '../../hooks/useCalcNet'

import { INetCardProps } from '../../types/props'
import { I } from './I'



const NetCard: React.FC<INetCardProps & { isForbidden?: boolean }> = (props) => {
    const { h, isSimple, w } = props
    const [isSKF, setIsSKF] = useState(!isSimple)
    const { simple, skf } = useCalcNet(w, h)
    const initial = isSKF ? skf : simple
    const [calcedNet, setCalcedNet] = useState(initial)
    const [forb, setIsForb] = useState(calcedNet.isForbidden)


    const toggle = () => setIsSKF(!isSKF)

    useEffect(() => {
        isSKF ? setCalcedNet(skf) : setCalcedNet(simple)
        isSKF ? setIsForb(skf.isForbidden) : setIsForb(simple.isForbidden)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSKF])

    const isForbCls = forb ? "red darken-5" : "grey lighten-2"
    return (
        <div className={`form__list z-depth-3 px1 ${isForbCls}`} >
            <div className='flex-row'>
                <button className={`btn  pb1  z-depth-2 ${isSKF ? "deep-orange darken-2" : "blue-grey darken-4"} `}
                    style={{ width: "100px" }}
                    onClick={() => toggle()}
                >
                    {isSKF ? "SKF" : "Простая"}
                </button>

                <span className='px1'>
                    {forb && <I title='dangerous' className='red-text text-darken-4 I-wrapper white' />}
                    {!forb && isSKF && <I title='grid_4x4' wrapped className='deep-red-text text-darken-2' />}
                    {!forb && !isSKF && <I title='grid_3x3' wrapped className='blue-text text-darken-4' />}
                </span>
                <button className={`btn    ${isSKF ? "blue accent-2" : "blue-grey darken-4"} `}
                    onClick={() => toggle()}
                >
                    <b className={forb ? "red-text" : "white-text"}>{calcedNet.W} мм x {calcedNet.H} мм</b>
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