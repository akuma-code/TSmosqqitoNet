import React, { useState, useEffect, useContext, HTMLAttributes, FC } from 'react'
import { OfferListData } from '../Components/OfferNotes/OfferTypes'


const useOffersControl = (initState = [] as OfferListData[]) => {
    const [offers, setOffers] = useState<OfferListData[]>(initState)
    const offerActions = {
        Add(offer: OfferListData) { setOffers(prev => [offer, ...prev]) },

        Remove(id: string) { setOffers(prev => prev.filter(o => o.id !== id)) },

        clearOffers() { setOffers(prev => []) },

        edit(edit_offer_data: OfferListData) {
            setOffers(prev => prev.map(offer => offer.id === edit_offer_data.id ? { ...offer, ...edit_offer_data } : offer))
        }
    }

    return [offers, offerActions] as const
}

export default useOffersControl