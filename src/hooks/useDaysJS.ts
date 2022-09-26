import dayjs from "dayjs";


export function useDaysJS() {
    const today = dayjs()
    const daysLeft = (dateReady: string) => date(dateReady).diff(today, 'days')
    const HoursLeft = (dateReady: string) => date(dateReady).diff(today, 'hours')
    const date = (dateReady: string) => dayjs(dateReady)
    const localDate = (dateReady: string) => dayjs(dateReady, 'DD MMMM YYYY', 'ru').format('DD MMMM')
    return { today, date, daysLeft, HoursLeft, localDate } as const
}