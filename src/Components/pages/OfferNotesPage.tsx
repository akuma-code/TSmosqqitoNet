import React, { useEffect, Fragment, useState } from 'react'
import { Box, Stack, StackDivider, Tab, TabList, TabPanel, TabPanels, Tabs, } from '@chakra-ui/react'
import { useID } from '../../hooks/useID'
import useOffersControl from '../../hooks/useOffersControl'
import { OfferForm } from '../OfferNotes/OfferForm'
import { OffersCardList } from '../OfferNotes/OffersCardList'
import { OfferFormData, OfferListData } from '../OfferNotes/OfferTypes'
import { WaitingOffersList } from '../OfferNotes/WaingOffersList'
import { ClosedOffersList } from '../OfferNotes/ClosedOffersList'
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
  function init() {
    const ofs = localStorage.getItem('offers_active') || '[]'
    const wofs = localStorage.getItem('offers_waiting') || '[]'
    const cofs = localStorage.getItem('offers_closed') || '[]'
    const parsed = (offers: string) => {
      const p = JSON.parse(offers) as OfferListData[]
      return p
    }
    return {
      ofs: parsed(ofs),
      wofs: parsed(wofs),
      cofs: parsed(cofs),
    }
  }
  const [offers, offControl] = useOffersControl(init().ofs)
  const [waitingList, setWaitngList] = useState<OfferListData[]>(init().wofs)
  const [closedOffersList, setClosedOffersList] = useState<OfferListData[]>(init().cofs)
  function addOfferToList(offer: OfferFormData) { offControl.Add(offer) }

  function SelectOffer(offer_id: string, offers: OfferListData[]) {
    return offers.reduce((targetOffer, o) => o.id === offer_id ? { ...targetOffer, ...o } : targetOffer, {} as OfferListData)
  }
  function MoveOffer(id: string, target: 'onWaiting' | 'Closed') {
    if (target === 'onWaiting') {
      const of = offControl.getOffer(id)
      setWaitngList(prev => [...prev, of])
      offControl.Remove(of.id)
    }

    if (target === 'Closed') {
      const of = SelectOffer(id, waitingList)
      setClosedOffersList(prev => [...prev, of])
      setWaitngList(prev => prev.filter(o => o.id !== of.id))
    }
  }

  function MoveToCloseList(id: string) { MoveOffer(id, 'Closed') }
  function MoveToWaitList(id: string) { MoveOffer(id, 'onWaiting') }
  const DeleteClosedOffer = (id: string) => setClosedOffersList(prev => prev.filter(co => co.id !== id))

  function onDeleteWaiting(selId: string) { setWaitngList(prev => prev.filter(wo => wo.id !== selId)) }

  useEffect(() => {
    localStorage.setItem('offers_active', JSON.stringify(offers))
    localStorage.setItem('offers_waiting', JSON.stringify(waitingList))
    localStorage.setItem('offers_closed', JSON.stringify(closedOffersList))
  }, [offers, waitingList, closedOffersList])
  return (
    <Stack align={'start'} px={8}>
      <OfferForm addOffer={addOfferToList} />
      <StackDivider borderColor={' black'} borderWidth={2} rounded={2} />

      <Tabs isFitted variant='enclosed' w={'full'}>
        <TabList mb='1em'>
          <Tab>договора в работе</Tab>
          <Tab>лист ожидания</Tab>
          <Tab>закрытые договора</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <OffersCardList offList={offers} offControl={offControl} onMove={MoveToWaitList} />
          </TabPanel>
          <TabPanel>
            <WaitingOffersList offersOnWaiting={waitingList} onClose={MoveToCloseList} onDelete={onDeleteWaiting} />
          </TabPanel>
          <TabPanel>
            <ClosedOffersList offersClosed={closedOffersList} onDelete={DeleteClosedOffer} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}


