import React, { useState, useEffect, useContext, HTMLAttributes, FC } from 'react'
import { OfferListData } from '../Components/pages/OfferNotesPage'


const useOffersControl = () => {
    const [offers, setOffers] = useState<OfferListData[]>([] as OfferListData[])
    const offerActions = {
        Add(offer: OfferListData) { setOffers(prev => [offer, ...prev]) },

        Remove(id: string) { setOffers(prev => prev.filter(o => o.id !== id)) },

        clearOffers() { setOffers(prev => []) },

        edit(id: string, edit_offer_data: OfferListData) {
            setOffers(prev => prev.map(offer => offer.id === id ? { ...offer, ...edit_offer_data } : offer))
        }
    }

    function saveToLs() {
        localStorage.setItem('offersList', JSON.stringify(offers))
    }
    function clearLs() {
        localStorage.removeItem('offersList')
    }

    return [offers, offerActions] as const
}

export default useOffersControl