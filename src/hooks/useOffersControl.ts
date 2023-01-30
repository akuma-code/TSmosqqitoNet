import React, { useState, useEffect, useContext, HTMLAttributes, FC } from 'react'
import { OfferListData } from '../Components/pages/OfferNotesPage'


const useOffersControl = () => {
    const [offers, setOffers] = useState<OfferListData[]>([] as OfferListData[])
    function Add(offer: OfferListData) {
        setOffers(prev => [offer, ...prev])
    }
    function Remove(id: string) {
        setOffers(prev => prev.filter(o => o.id !== id))
    }
    function clearOffers() {
        setOffers(prev => [])
    }
    function edit(id: string, edit_offer_data: OfferListData) {
        setOffers(prev => prev.map(offer => offer.id === id ? { ...offer, ...edit_offer_data } : offer))
    }
    function saveToLs() {
        localStorage.setItem('offersList', JSON.stringify(offers))
    }
    function clearLs() {
        localStorage.removeItem('offersList')
    }

    return [offers, { Add, Remove, clearOffers, edit, saveToLs, clearLs }] as const
}

export default useOffersControl