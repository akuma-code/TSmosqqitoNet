import React, { useEffect, useRef, useState } from 'react';
import { Button, FormControl, HStack, Input, InputGroup, InputLeftAddon, InputRightAddon, InputRightElement as InputLeftElement, InputRightElement, Menu, MenuButton, MenuItem, MenuList, Stack } from '@chakra-ui/react';
import { useID } from '../../hooks/useID';
import { OfferFormData } from './OfferTypes';

interface OfferFormProps {
    getOffer: (offer: OfferFormData) => void;
}



export const OfferForm: React.FC<OfferFormProps> = (props) => {

    const strID = useID;
    const [offer, setOffer] = useState({ offerId: "", companyName: "", dateReady: "", desc: "", id: strID(), companyTag: "ООО" } as OfferFormData);
    const firstInput = useRef<HTMLInputElement>(null)

    function changeOffer(field: keyof OfferFormData, value: string) { setOffer(prev => ({ ...prev, [field]: value })); }
    function HandleSubmit(e?: React.FormEvent) {
        console.log('offer added: ', offer);
        props.getOffer(offer);
        setOffer({ offerId: "", companyName: "", dateReady: "", desc: "", id: strID(), companyTag: offer.companyTag });

        if (!firstInput.current) return
        firstInput.current.focus()
    }


    return (

        <FormControl id='offer_form' onSubmit={HandleSubmit}>
            <HStack px={4} gap={8} mt={2}>
                <Input
                    placeholder='Offer ID'
                    id='offid'
                    ref={firstInput}
                    value={offer.offerId}
                    onChange={(e) => changeOffer('offerId', e.target.value)}
                    type={'text'}
                    required />
                <InputGroup zIndex={2} flexDirection={'row-reverse'}>

                    <Input
                        placeholder='Company Name'
                        id='offcomp'
                        value={offer.companyName}
                        onChange={(e) => changeOffer('companyName', e.target.value)}
                        type={'text'}
                        required={true} />
                    <InputLeftAddon
                        children={CustomSelect(changeOffer, offer.companyTag)}
                    />

                </InputGroup>

                <Input
                    placeholder='Date Ready'
                    id='offdate'
                    value={offer.dateReady}
                    onChange={(e) => changeOffer('dateReady', e.target.value)}
                    type={'date'} />
                <Input
                    placeholder='Description'
                    id='offdate'
                    value={offer.desc}
                    onChange={(e) => changeOffer('desc', e.target.value)}
                    type={'text'} />
                <Button type='submit'
                    onClick={e => HandleSubmit(e)}
                    colorScheme={'green'} p={8} mt={'10'} formTarget={'offer_form'} form={'offer_form'}></Button>
            </HStack>
        </FormControl>
    )
};


const CustomSelect = (changeOffer: (field: keyof OfferFormData, value: string) => void, tag: OfferFormData['companyTag']) => {




    return (
        <Menu >
            <MenuButton>{tag}</MenuButton>
            <MenuList>
                <MenuItem as='button' onClick={() => changeOffer('companyTag', 'ИП')}>ИП</MenuItem>
                <MenuItem as='button' onClick={() => changeOffer('companyTag', 'ООО')}>ООО</MenuItem>
            </MenuList>
        </Menu>)
}