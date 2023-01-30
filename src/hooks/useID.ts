import { v4 } from 'uuid'

export const useID = () => {
    const strID = v4().split('-').slice(1, 2).join("")

    return strID
}