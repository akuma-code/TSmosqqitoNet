import { useState } from "react";
import { OfferListData } from "../Components/OfferNotes/OfferTypes";

export const useSortedOffers = (listOffers: OfferListData[], header: 'name' | 'offerId' | 'dateReady' | 'note') => {
    const [offers, setOffers] = useState<OfferListData[]>(listOffers)

    const sortedOffers = {
        nameAsc() { setOffers(prev => [...prev].sort((a, b) => a.companyName.localeCompare(b.companyName))) },
        nameDesc() { setOffers(prev => [...prev].sort((a, b) => b.companyName.localeCompare(a.companyName))) },
        offerIdAsc() { setOffers(prev => [...prev].sort((a, b) => a.offerId.localeCompare(b.offerId))) },
        offerIdDesc() { setOffers(prev => [...prev].sort((a, b) => b.offerId.localeCompare(a.offerId))) },
        dateReadyAsc() {
            const datams = (offer: OfferListData) => new Date(offer.dateReady).getMilliseconds()
            setOffers(prev => [...prev].sort((a, b) => datams(a) - datams(b)))
        },
        dateReadyDesc() {
            const datams = (offer: OfferListData) => new Date(offer.dateReady).getMilliseconds()
            setOffers(prev => [...prev].sort((a, b) => datams(b) - datams(a)))
        },
    }
}