import { useState } from 'react'
import { OfferListData } from '../Components/OfferNotes/OfferTypes'
import { useID } from './useID'

const _id = useID
const useOffersControl = (initState = [] as OfferListData[]) => {
    const [offers, setOffers] = useState<OfferListData[]>(initState)
    const offerActions = {
        Add(offer: OfferListData) {
            if (!offer.id) offer.id = _id()
            setOffers(prev => [offer, ...prev])
        },

        Remove(id: string) { setOffers(prev => prev.filter(o => o.id !== id)) },

        clearOffers() { setOffers(prev => []) },

        Edit(edit_offer_data: OfferListData) {
            setOffers(prev => prev.map(offer => offer.id === edit_offer_data.id ? { ...offer, ...edit_offer_data } : offer))
        },

        toggleCheck(id: string, field: keyof OfferListData) {
            console.log(id, field);

            if (!id) return
            setOffers(prev => prev.map(o => o.id === id ? { ...o, [field]: !o[field] } : o))
        },

        getOffer(offer_id: string) {
            return offers.reduce((targetOffer, o) => o.id === offer_id ? { ...targetOffer, ...o } : targetOffer, {} as OfferListData)
        }
    }

    return [offers, offerActions] as const
}

export default useOffersControl