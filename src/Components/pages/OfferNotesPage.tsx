import { useEffect, useState } from 'react'
import { Stack, StackDivider, Tab, TabList, TabPanel, TabPanels, Tabs, Text, } from '@chakra-ui/react'
import useOffersControl from '../../hooks/useOffersControl'
import { OfferForm } from '../OfferNotes/OfferForm'
import { ActiveOffersList } from '../OfferNotes/ActiveOffersList'
import { OfferFormData, OfferListData } from '../OfferNotes/OfferTypes'
import { WaitingOffersList } from '../OfferNotes/WaingOffersList'
import { ClosedOffersList } from '../OfferNotes/ClosedOffersList'
import useGlobalOffers from '../../hooks/useGlobalOffers'
import { OffersApi } from '../../http/OffersApi'

async function FetchDBOffers() {
  const get_db = async () => await OffersApi.getAll()
  const dbo = await get_db().then(data => {

    const offersList = {
      activeOffers: [...data].filter(o => o.status! === 'onActive') as OfferListData[],
      waitingOffers: [...data].filter(o => o.status! === 'onWaiting') as OfferListData[],
      closedOffers: [...data].filter(o => o.status! === 'onClosed') as OfferListData[],
    }

    return offersList
  })

  return dbo
}

function init() {
  const ofs = localStorage.getItem('offers_active') || '[]'
  const wofs = localStorage.getItem('offers_waiting') || '[]'
  const cofs = localStorage.getItem('offers_closed') || '[]'
  // const dbofs = FetchDBOffers()
  const parsed = (offers: string) => {
    if (!offers) return []
    try {
      const p = JSON.parse(offers) as OfferListData[]
      return p
    } catch (error: any) {
      console.log('error: ', error.message)
    }

  }
  // const get_db = async () => await OffersApi.getAll()
  // get_db().then(data => {

  //   const offersList = {
  //     activeOffers: [...data].filter(o => o.status! === 'onActive') as OfferListData[],
  //     waitingOffers: [...data].filter(o => o.status! === 'onWaiting') as OfferListData[],
  //     closedOffers: [...data].filter(o => o.status! === 'onClosed') as OfferListData[],
  //   }

  //   console.log('offersList', offersList)
  //   return dbofs.push(offersList)

  // })
  // console.log(dbofs);
  return {
    ofs: parsed(ofs),
    // wofs: dbofs.waitingOffers,
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

  const [globalOffers, setGO, isLoading, error] = useGlobalOffers()
  const [offers, offControl] = useOffersControl(globalOffers.activeOffers)
  const [waitingList, setWaitngList] = useState<OfferListData[]>(globalOffers.waitingOffers)
  const [closedOffersList, setClosedOffersList] = useState<OfferListData[]>(globalOffers.closedOffers)

  function addOfferToList(offer: OfferListData) {
    offControl.Add(offer)
    offer.status = 'onActive'
    setGO.Create(offer)
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
  function onEditWaitings(edit_offer_data: OfferListData) {
    setWaitngList(prev => prev.map(offer => offer.id === edit_offer_data.id ? { ...offer, ...edit_offer_data } : offer))
  }
  function MoveToCloseList(id: string) { MoveOffer(id, 'Closed') }
  function MoveToWaitList(id: string) { MoveOffer(id, 'onWaiting') }
  const DeleteClosedOffer = (id: string) => setClosedOffersList(prev => prev.filter(co => co.id !== id))

  function onDeleteWaiting(selId: string) { setWaitngList(prev => prev.filter(wo => wo.id !== selId)) }
  const CopyOffer = async (offer: OfferListData) => {
    const of = await setGO.getOffer(offer.id)
    if (of) setGO.Remove(offer.id)
    setGO.Create(offer)

  }
  useEffect(() => {
    offers && save('offers_active', offers)
    waitingList && save('offers_waiting', waitingList)
    closedOffersList && save('offers_closed', closedOffersList)
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

  useEffect(() => {
    // setGO.CreateList(waitingList)

  }, [])

  return (
    <Stack align={'center'} px={8} maxW={'70vw'}>
      <OfferForm addOffer={addOfferToList} />
      <StackDivider borderColor={' black'} borderWidth={2} rounded={2} />
      {isLoading ? <Text>loading....</Text>
        :


        <Tabs isFitted variant='enclosed'  >
          <TabList mb='1em' >
            <Tab {...tabProps}>договора в работе</Tab>
            <Tab {...tabProps}>лист ожидания</Tab>
            <Tab {...tabProps} >закрытые договора</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <ActiveOffersList offList={globalOffers.activeOffers} offControl={offControl} nextStep={MoveToWaitList} actions={setGO} />
            </TabPanel>
            <TabPanel>
              <WaitingOffersList offersOnWaiting={globalOffers.waitingOffers}
                nextStep={MoveToCloseList}
                onDelete={onDeleteWaiting}
                onEdit={onEditWaitings}
              />
            </TabPanel>
            <TabPanel>
              <ClosedOffersList offersClosed={globalOffers.closedOffers} onDelete={DeleteClosedOffer} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      }
    </Stack>
  )
}


