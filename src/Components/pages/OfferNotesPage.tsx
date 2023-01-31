import React, { useEffect, Fragment } from 'react'
import { Box, Stack, StackDivider, } from '@chakra-ui/react'
import { useID } from '../../hooks/useID'
import useOffersControl from '../../hooks/useOffersControl'
import { OfferForm } from '../OfferNotes/OfferForm'
import { OffersCardList } from '../OfferNotes/OffersCardList'
import { OfferFormData, OfferListData } from '../OfferNotes/OfferTypes'
const _ID = useID

const mockOffer: OfferListData = {
  id: _ID(),
  offerId: "23/01/25/02-21П",
  companyName: "Рога И Копыта",
  companyTag: "ООО",
  dateReady: "2023-02-10",
  desc: ""
}


export type OfferNotesPageProps = {

}

export const OfferNotesPage = (props: OfferNotesPageProps) => {

  const [offers, offControl] = useOffersControl([])

  function getOffer(offer: OfferFormData) {

    offControl.Add(offer)
  }


  return (
    <Stack >
      <OfferForm getOffer={getOffer} />
      <StackDivider borderColor={'blue.700'} borderWidth={4} rounded={2} />
      <OffersCardList offList={offers} />
    </Stack>
  )
}


