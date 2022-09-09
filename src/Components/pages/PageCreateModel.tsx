import React, { useReducer } from 'react'
import { InitialState, modelReducer } from '../Stores/ModelReducer'

export interface CreateModelProps {
    children?: React.ReactNode
}

export const PageCreateModel: React.FC<CreateModelProps> = () => {
    const [state, dispatch] = useReducer(modelReducer, InitialState)



    return (
        <>
            {state.models.map(m =>
                <div key={m.id} className="green card my1 flex-row" style={{ width: "30vw" }}>

                    <span>Название: {m.type}</span><br />
                    <span>Цена: {m.price} руб.</span><br />
                    <span>На складе: {m.quant} шт.</span><br />
                    <button className='btn'
                        onClick={() => dispatch({ type: 'remove', payload: m.id })}
                    >Remove</button>
                </div>

            )}

            <button className='btn'
                onClick={() => dispatch({ type: 'add', payload: { type: 'aaaa', quant: 4, price: 100, id: Math.random() } })}
            >ADD</button>

        </>
    )
}
