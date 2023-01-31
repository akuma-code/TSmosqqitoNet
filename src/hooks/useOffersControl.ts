import { useState } from 'react'
import { OfferListData } from '../Components/OfferNotes/OfferTypes'


const useOffersControl = (initState = [] as OfferListData[]) => {
    const [offers, setOffers] = useState<OfferListData[]>(initState)
    const offerActions = {
        Add(offer: OfferListData) { setOffers(prev => [offer, ...prev]) },

        Remove(id: string) { setOffers(prev => prev.filter(o => o.id !== id)) },

        clearOffers() { setOffers(prev => []) },

        Edit(edit_offer_data: OfferListData) {
            setOffers(prev => prev.map(offer => offer.id === edit_offer_data.id ? { ...offer, ...edit_offer_data } : offer))
        },

        toggleCheck(id: string, field: keyof OfferListData) {
            if (!id) return
            setOffers(prev => prev.map(o => o.id === id ? { ...o, [field]: !o[field] } : o))
        }
    }

    return [offers, offerActions] as const
}

export default useOffersControl