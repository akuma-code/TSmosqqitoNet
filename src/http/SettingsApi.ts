import { $api } from "."

export const ResetSkladModels = async () => {
    const { data } = await $api.post("api/settings/reset_models")
    return data
}

export const getHostUrl = async () => {
    const { data } = await $api.get("api/settings/edit?param=host_url")
    global.alert(`server url: ${data}`)
    return data
}