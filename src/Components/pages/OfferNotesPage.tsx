import { Stack, StackDivider, Tab, TabList, TabPanel, TabPanels, Tabs, Text, } from '@chakra-ui/react'
import { OfferForm } from '../OfferNotes/OfferForm'
import { ActiveOffersList } from '../OfferNotes/ActiveOffersList'
import { OfferListData } from '../OfferNotes/OfferTypes'
import { WaitingOffersList } from '../OfferNotes/WaingOffersList'
import { ClosedOffersList } from '../OfferNotes/ClosedOffersList'
import useGlobalOffers from '../../hooks/useGlobalOffers'


export const OfferNotesPage = () => {

  const [globalOffers, setGO, isLoading, error] = useGlobalOffers()

  function addOfferToList(offer: OfferListData) {
    offer.status = 'onActive'
    setGO.Create(offer)
  }

  function MoveOffer(id: string, target: 'onWaiting' | 'onActive' | 'onClosed') { setGO.changeStatus(id, target) }

  function onEditWaitings(id: string, edit_offer_data: OfferListData) { setGO.Edit(id, edit_offer_data) }
  function MoveToCloseList(id: string) { MoveOffer(id, 'onClosed') }
  function MoveToWaitList(id: string) { MoveOffer(id, 'onWaiting') }
  function onDeleteWaiting(selId: string) { setGO.Remove(selId) }
  const DeleteClosedOffer = (id: string) => setGO.Remove(id)

  const tabProps = {
    _focusWithin: { bgColor: 'blue.300' },
    bgColor: 'blue.100',
    textColor: 'blackAlpha.900',
    fontSize: 15,
    fontWeight: 'semibold',
    _hover: { bgColor: 'gray.400' },
    _selected: { bgColor: 'blue.500' }
  }



  if (error) {
    return (<div>
      <Text fontSize={'3xl'}>{error}</Text>
    </div>)
  }

  return (
    <Stack align={'center'} px={8} maxW={'70vw'}>
      <OfferForm addOffer={addOfferToList} />
      <StackDivider borderColor={' black'} borderWidth={2} rounded={2} />
      {
        isLoading ?
          <Text fontSize={36}>loading....</Text>
          :
          <Tabs isFitted variant='enclosed'  >
            <TabList mb='1em' >
              <Tab {...tabProps}>договора в работе</Tab>
              <Tab {...tabProps}>лист ожидания</Tab>
              <Tab {...tabProps} >закрытые договора</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <ActiveOffersList offList={globalOffers.activeOffers}
                  nextStep={MoveToWaitList}
                  actions={setGO} />
              </TabPanel>
              <TabPanel>
                <WaitingOffersList offersOnWaiting={globalOffers.waitingOffers}
                  nextStep={MoveToCloseList}
                  onDelete={onDeleteWaiting}
                  onEdit={onEditWaitings}
                  actions={setGO}
                />
              </TabPanel>
              <TabPanel>
                <ClosedOffersList offersClosed={globalOffers.closedOffers}
                  onDelete={DeleteClosedOffer} />
              </TabPanel>
            </TabPanels>
          </Tabs>
      }
    </Stack>
  )
}


