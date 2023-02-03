import React, { useEffect, Fragment } from 'react'
import { Box, Stack, StackDivider, } from '@chakra-ui/react'
import { useID } from '../../hooks/useID'
import useOffersControl from '../../hooks/useOffersControl'
import { OfferForm } from '../OfferNotes/OfferForm'
import { OffersCardList } from '../OfferNotes/OffersCardList'
import { OfferFormData, OfferListData } from '../OfferNotes/OfferTypes'
const _id = useID

const mockOffer: OfferListData = {
  id: _id(),
  offerId: "23/01/25/02-21П",
  companyName: "Рога И Копыта",
  companyTag: "ООО",
  dateReady: "2023-02-10",
  desc: ""
}
const initOffer = {
  companyName: "Рога И Копыта",
  companyTag: 'ООО',
  dateReady: "2023-02-10",
  offerId: "23/01/25/02-21П",
  desc: "описание и все такое",
  id: _id(),
  isDocResieved: false,
  isDocSigned: false,
  isRequested: false
} as OfferListData

export type OfferNotesPageProps = {

}

export const OfferNotesPage = (props: OfferNotesPageProps) => {

  const [offers, offControl] = useOffersControl([])

  function getOffer(offer: OfferFormData) {

    offControl.Add(offer)
  }


  return (
    <Stack pl={4}>
      <OfferForm getOffer={getOffer} />
      <StackDivider borderColor={' black'} borderWidth={2} rounded={2} />
      <OffersCardList offList={offers} offControl={offControl} />
    </Stack>
  )
}


