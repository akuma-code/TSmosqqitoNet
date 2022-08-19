import { ITodoPayment } from "../types/props";

export const useCashToText = (cashItem: ITodoPayment) => {
    const text = (sum: string | number, info: string): string => `Внести ${sum} руб. ===> ${info}`
    return text(cashItem.sum, cashItem.info)
}