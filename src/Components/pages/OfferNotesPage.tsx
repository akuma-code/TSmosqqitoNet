import React, { useEffect, Fragment, useState } from 'react'
import { Box, Stack, StackDivider, Tab, TabList, TabPanel, TabPanels, Tabs, } from '@chakra-ui/react'
import { useID } from '../../hooks/useID'
import useOffersControl from '../../hooks/useOffersControl'
import { OfferForm } from '../OfferNotes/OfferForm'
import { OffersCardList } from '../OfferNotes/OffersCardList'
import { OfferFormData, OfferListData } from '../OfferNotes/OfferTypes'
import { WaitingOffersList } from '../OfferNotes/WaingOffersList'
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
  const [waitingList, setWaitngList] = useState<OfferListData[]>([])
  const [closedOffersList, setClosedOffersList] = useState<OfferListData[]>([])
  function getOffer(offer: OfferFormData) {

    offControl.Add(offer)
  }


  return (
    <Stack align={'start'} px={8}>
      <OfferForm getOffer={getOffer} />
      <StackDivider borderColor={' black'} borderWidth={2} rounded={2} />

      <Tabs isFitted variant='enclosed' w={'full'}>
        <TabList mb='1em'>
          <Tab>договора в работе</Tab>
          <Tab>лист ожидания</Tab>
          <Tab>закрытые договора</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <OffersCardList offList={offers} offControl={offControl} />
          </TabPanel>
          <TabPanel>
            <WaitingOffersList offers={offers} />
          </TabPanel>
          <TabPanel>
            ClosedOffers
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}


