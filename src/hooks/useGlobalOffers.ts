import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { OfferListData } from '../Components/OfferNotes/OfferTypes'
import { OffersApi } from '../http/OffersApi'
import { useID } from './useID'


export type OffersListType = {
    activeOffers: OfferListData[],
    waitingOffers: OfferListData[],
    closedOffers: OfferListData[]
}
const _id = useID
const split_data = <T extends OfferListData>(data: T[]) => {
    const offersList = {
        activeOffers: [...data].filter(o => o.status! === 'onActive') as OfferListData[],
        waitingOffers: [...data].filter(o => o.status! === 'onWaiting') as OfferListData[],
        closedOffers: [...data].filter(o => o.status! === 'onClosed') as OfferListData[],
    }
    return offersList
}
export interface OfferApiActions extends ReturnType<typeof useGlobalOffers> { }

const useGlobalOffers = () => {
    // const [offers, setOffers] = useState<OfferListData[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [list, setList] = useState<OffersListType>({} as OffersListType)

    const update = async () => await OffersApi.getAll().then(data => setList(prev => ({ ...prev, ...split_data(data) })))

    const offerActions = {
        Create(offer: OfferListData) {
            OffersApi.create(offer).then(update)
            // update()
        },
        CreateList(offers: OfferListData[]) {
            console.log('offers in list', offers)
            const list = OffersApi.createList(offers)
            return list
        },

        Remove(id: string) {
            OffersApi.remove(id).then(update)
        },

        ClearOffers() { OffersApi.removeAll().then(update) },

        Edit(id: string, edit_offer_data: OfferListData) {
            OffersApi.edit(id, edit_offer_data).then(update)
        },

        RemoveList(status: OfferListData['status']) {
            OffersApi.removeList(status)
        },

        getOffer(offer_id: string) {
            const offer = OffersApi.getOne(offer_id)
            return offer
        },
        toggleCheck(offer: OfferListData, field: keyof OfferListData) {
            const currentState = offer[field] || false
            OffersApi.edit(offer.id, { ...offer, [field]: !currentState }).then(update)
        },
        changeStatus(id: string, newStatus: OfferListData['status']) {
            OffersApi.edit(id, { status: newStatus! }).then(update)
        },
        update
    }


    useEffect(() => {
        setIsLoading(true);
        (async () => {
            try {
                await update()

                setIsLoading(false)
            } catch (e: unknown) {
                const error = e as AxiosError
                console.log('fetchApiData ERROR!', error)
                setError(error.message)
            } finally {

                setIsLoading(false)
            }
        })()

    }, [])


    return [list, offerActions, isLoading, error] as const
}

export default useGlobalOffers