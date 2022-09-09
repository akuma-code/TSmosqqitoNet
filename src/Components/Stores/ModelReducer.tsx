export const InitialState = {
    models: [
        { type: 'ok1', price: 4500, quant: 5, id: 1 },
        { type: 'ok2', price: 5100, quant: 4, id: 2 },
        { type: 'ok3', price: 10000, quant: 11, id: 3 },
    ]
}
export type ACTION_TYPE =
    | { type: 'add', payload: any }
    | { type: 'remove', payload: number }

export type Init = typeof InitialState
export const InitializeModels = () => InitialState

export const modelReducer = (state: Init, action: ACTION_TYPE): Init => {
    switch (action.type) {
        case 'add':
            return {
                models: [...state.models, action.payload]
            }
        case 'remove':
            return {
                models: state.models.filter((model) => model.id !== action.payload)
            }
        default:
            return state



    }

}