import { $api } from "."
import { PATHS } from "../types/IServerData"



export const login = async (password: string) => {
    const { data } = await $api.post('auth/login', password)
    return data
}


export const check = () => {
    const saved = localStorage.getItem('isAuth')


    try {

        if (!saved) {
            localStorage.setItem("isAuth", "false")
            return false
        }
        console.log(saved);
        return !!saved
    } catch (error: unknown) {
        console.log(error);

        return false

    }
}

