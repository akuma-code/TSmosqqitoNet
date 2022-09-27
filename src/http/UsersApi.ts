import { $api } from "."

export const setPassword = (password: string) => {
    try {
        localStorage.setItem('auth_pass', password)
    } catch (error) {
        console.log(error);
    }
}


export const login = (pass: string) => {
    try {
        const saved = localStorage.getItem('auth_pass')
        if (pass === saved) localStorage.setItem('isAuth', "true")
        else localStorage.setItem('isAuth', "false")

    } catch (e) {
        console.log(e);

    }
}


export const check = () => {
    try {
        const isAuth = JSON.parse(localStorage.getItem('isAuth') || "false") as boolean
        return isAuth
    } catch (error: unknown) {
        console.log(error);

    }
}