type ITodoStoreItem = {
    text?: string,
    checked?: boolean,
    numb?: number
}[]

interface ITodoStore {
    todos?: ITodoStoreItem

}
export class TodoStore {


    get todos(): ITodoStoreItem {
        return this._todos
    }
    set todos(value: ITodoStoreItem) {
        this._todos = value
    }

}