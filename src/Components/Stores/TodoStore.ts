type ITodoStoreItem = {
    text?: string,
    checked?: boolean,
    numb?: number
}


export class TodoStore {
    todo: ITodoStoreItem[]
    constructor() {
        this.todo = []
    }



}