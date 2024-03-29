import { OfferApiActions } from "../../hooks/useGlobalOffers"

export type OfferFormData = {
    id: string
    offerId: string
    companyName: string
    companyTag: 'ООО' | 'АО' | 'ИП'
    dateReady: string
    desc?: string
}
export type OfferListData = {
    isDocRequested?: boolean
    isDocSigned?: boolean
    isDocResieved?: boolean
    status?: 'onActive' | 'onWaiting' | 'onClosed'
} & OfferFormData

export interface OffCardListProps {
    offList: OfferListData[]
    offControl?: {
        Add: (new_offer_data: OfferListData) => void,
        Remove: (id: string) => void,
        clearOffers: () => void,
        Edit: (new_offer_data: OfferFormData) => void,
        toggleCheck: (id: string, field: keyof OfferListData) => void
        getOffer: (id: string) => OfferListData
    }
    nextStep?: (id: string) => void
}

export interface OffersDBApi {
    Create: (offer: OfferListData) => void
    CreateList: (offers: OfferListData[]) => void
    Remove: (id: string) => void
    RemoveList: (status: OfferListData['status']) => void
    Edit: (id: string, new_offer_data: OfferListData) => void
    ClearOffers: () => void
    update: () => Promise<void>
    getOffer: (id: string) => void
    toggleCheck: (offer: OfferListData, field: keyof OfferListData) => void
    changeStatus: (id: string, newStatus: OfferListData['status']) => void
}
export interface OfferCardProps {
    offer: OfferListData
    offControl?: OffersDBApi

    nextStep?: (id: string) => void
    // checkFN: (id: string, field: keyof OfferListData) => void
}