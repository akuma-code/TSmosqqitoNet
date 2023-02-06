import React from 'react'
import { OfferListData } from './OfferTypes'
import { WaitingTable } from './WaitingTable'

export type WaitingOffersListProps = {
    offers: OfferListData[]
}

const init = [
    {
        "companyName": "Google",
        "companyTag": "ИП",
        "dateReady": "2023-02-14",
        "offerId": "23/01/25/05-21П",
        "desc": "описание и все такое",
        "id": "3e6e",
        "isDocResieved": true,
        "isDocSigned": true,
        "isRequested": true
    },
    {
        "companyName": "Рога и Копыта",
        "companyTag": "ООО",
        "dateReady": "2023-02-10",
        "offerId": "23/01/25/02-21П",
        "desc": "описание и все такое",
        "id": "a332",
        "isDocResieved": true,
        "isDocSigned": true,
        "isRequested": true
    }
] as OfferListData[]

export const WaitingOffersList: React.FC<WaitingOffersListProps> = ({ offers }) => {


    return (
        <div>
            <WaitingTable offers={init} />
        </div>
    )
}