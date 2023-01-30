import React, { useState } from 'react'
import { Box, Button, FormControl, HStack, Input } from '@chakra-ui/react'
import { useID } from '../../hooks/useID'
import { useLocStorage } from '../../hooks/useLocStorage'


type OfferNotesPageProps = {

}

export const OfferNotesPage = (props: OfferNotesPageProps) => {

  const [offerList, setOfferList] = useState([])
  function handleSubmit(offer: OfferFormData) {


  }

  return (
    <Box>
      <OfferForm onSubmit={handleSubmit} />
    </Box>
  )
}

type OfferFormData = {
  id?: string
  offerId: string
  clientFIO: string
  dateReady: string
  desc?: string
}

interface OfferFormProps {
  onSubmit: (offer: OfferFormData) => void
}
const OfferForm: React.FC<OfferFormProps> = (props) => {
  const [offer, setOffer] = useState({ offerId: "", clientFIO: "", dateReady: "", desc: "", id: "" } as OfferFormData)
  function changeOffer(field: keyof OfferFormData, value: string) {
    const strID = useID
    setOffer(prev => ({ ...prev, [field]: value }))
    if (offer.id === "") setOffer(prev => ({ ...prev, id: strID() }))
  }
  function HandleSubmit() {
    console.log('form submitted', offer)
    props.onSubmit(offer)
    setOffer({ offerId: "", clientFIO: "", dateReady: "", desc: "", id: "" })
  }
  return <FormControl>
    <HStack px={4} gap={8} mt={2}>
      <Input
        placeholder='Offer ID'
        id='offid'
        value={offer.offerId}
        onChange={(e) => changeOffer('offerId', e.target.value)}
        type={'text'} />
      <Input
        placeholder='Client FIO'
        id='offclient'
        value={offer.clientFIO}
        onChange={(e) => changeOffer('clientFIO', e.target.value)}
        type={'text'} />
      <Input
        placeholder='Date Ready'
        id='offdate'
        value={offer.dateReady}
        onChange={(e) => changeOffer('dateReady', e.target.value)}
        type={'date'} />
      <Input
        placeholder='Commentary'
        id='offdate'
        value={offer.desc}
        onChange={(e) => changeOffer('desc', e.target.value)}
        type={'text'} />
      <Button type='submit' onClick={HandleSubmit}
        colorScheme={'green'} p={8} mt={'10'}>Add Offer</Button>
    </HStack>
  </FormControl>
}
