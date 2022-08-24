import axios from "axios"

export const $api = axios.create({
    baseURL: 'http://localhost:5000'
})

export const fetchSklad = async () => {
    const { data } = await $api.get('api/sklad')

    return data
}