type ITodoStoreItem = {
    text?: string,
    checked?: boolean,
    numb?: number
}

interface ITodoStore {
    todos?: ITodoStoreItem

}
export class TodoStore {
    todo: ITodoStoreItem[]
    constructor() {
        this.todo = []
    }



}