import { useEffect, useState } from 'react'
import { Stack, StackDivider, Tab, TabList, TabPanel, TabPanels, Tabs, } from '@chakra-ui/react'
import useOffersControl from '../../hooks/useOffersControl'
import { OfferForm } from '../OfferNotes/OfferForm'
import { ActiveOffersList } from '../OfferNotes/ActiveOffersList'
import { OfferFormData, OfferListData } from '../OfferNotes/OfferTypes'
import { WaitingOffersList } from '../OfferNotes/WaingOffersList'
import { ClosedOffersList } from '../OfferNotes/ClosedOffersList'



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
function save(key: string, offers: OfferListData[]) {
  return localStorage.setItem(key, JSON.stringify(offers))
}

function SelectOffer(offer_id: string, offers: OfferListData[]) {
  return offers.reduce((targetOffer, o) =>
    o.id === offer_id ? { ...targetOffer, ...o } : targetOffer, {} as OfferListData)
}

export const OfferNotesPage = () => {

  const [offers, offControl] = useOffersControl(init().ofs)
  const [waitingList, setWaitngList] = useState<OfferListData[]>(init().wofs)
  const [closedOffersList, setClosedOffersList] = useState<OfferListData[]>(init().cofs)


  function addOfferToList(offer: OfferFormData) { offControl.Add(offer) }

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
  function onEditWaitings(edit_offer_data: OfferListData) {
    setWaitngList(prev => prev.map(offer => offer.id === edit_offer_data.id ? { ...offer, ...edit_offer_data } : offer))
  }
  function MoveToCloseList(id: string) { MoveOffer(id, 'Closed') }
  function MoveToWaitList(id: string) { MoveOffer(id, 'onWaiting') }
  const DeleteClosedOffer = (id: string) => setClosedOffersList(prev => prev.filter(co => co.id !== id))

  function onDeleteWaiting(selId: string) { setWaitngList(prev => prev.filter(wo => wo.id !== selId)) }

  useEffect(() => {
    save('offers_active', offers)
    save('offers_waiting', waitingList)
    save('offers_closed', closedOffersList)
  }, [offers, waitingList, closedOffersList])

  const tabProps = {
    _focusWithin: { bgColor: 'blue.300' },
    bgColor: 'blue.100',
    textColor: 'blackAlpha.900',
    fontSize: 15,
    fontWeight: 'semibold',
    _hover: { bgColor: 'gray.400' },
    _selected: { bgColor: 'blue.500' }
  }


  return (
    <Stack align={'start'} px={8}>
      <OfferForm addOffer={addOfferToList} />
      <StackDivider borderColor={' black'} borderWidth={2} rounded={2} />

      <Tabs isFitted variant='enclosed'  >
        <TabList mb='1em' >
          <Tab {...tabProps}>договора в работе</Tab>
          <Tab {...tabProps}>лист ожидания</Tab>
          <Tab {...tabProps} >закрытые договора</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ActiveOffersList offList={offers} offControl={offControl} nextStep={MoveToWaitList} />
          </TabPanel>
          <TabPanel>
            <WaitingOffersList offersOnWaiting={waitingList} nextStep={MoveToCloseList} onDelete={onDeleteWaiting} onEdit={onEditWaitings} />
          </TabPanel>
          <TabPanel>
            <ClosedOffersList offersClosed={closedOffersList} onDelete={DeleteClosedOffer} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}


