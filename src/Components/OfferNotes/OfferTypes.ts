
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
}
export interface OfferCardProps {
    offer: OfferListData
}