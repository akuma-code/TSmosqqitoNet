
export type OfferFormData = {
    id?: string
    offerId: string
    companyName: string
    companyTag: 'ООО' | 'АО' | 'ИП'
    dateReady: string
    desc?: string
}
export type OfferListData = {
    isRequested?: boolean
    isDocSigned?: boolean
    isDocResieved?: boolean
} & OfferFormData

export interface OffCardListProps {
    offList: OfferListData[]
    offControl: {
        Add: (new_offer_data: OfferListData) => void,
        Remove: (id: string) => void,
        clearOffers: () => void,
        Edit: (new_offer_data: OfferListData) => void,
        toggleCheck: (id: string, field: keyof OfferListData) => void
    }
}
export interface OfferCardProps {
    offer: OfferListData
    offControl: OffCardListProps['offControl']
    // checkFN: (id: string, field: keyof OfferListData) => void
}