import React, { useRef, useState } from 'react';
import { Alert, AlertIcon, Button, Center, FormControl, HStack, Input, InputGroup, InputLeftAddon, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { useID } from '../../hooks/useID';
import { OfferFormData } from './OfferTypes';

interface OfferFormProps {
    getOffer: (offer: OfferFormData) => void;
}



export const OfferForm: React.FC<OfferFormProps> = (props) => {

    const strID = useID;
    const [offer, setOffer] = useState<OfferFormData>({ companyTag: "ООО", id: strID() } as OfferFormData);
    const firstInput = useRef<HTMLInputElement>(null)
    const [isAlarm, setIsAlarm] = useState(false)
    function changeOffer(field: keyof OfferFormData, value: string) { setOffer(prev => ({ ...prev, [field]: value })); }
    function HighLightButton() {
        console.log("Введены не все данные!");
        setIsAlarm(prev => true)

        setTimeout(() => {
            setIsAlarm(prev => !prev)
        }, 4000)
    }

    function HandleSubmit(e?: React.FormEvent) {
        if (!offer.companyName || !offer.offerId || !offer.dateReady) return HighLightButton();

        props.getOffer(offer!);
        setOffer({ companyName: "", offerId: "", desc: "", companyTag: offer.companyTag } as OfferFormData);

        if (!firstInput.current) return
        firstInput.current.focus()
    }

    const changeTag = (tag: OfferFormData['companyTag']) => changeOffer('companyTag', tag)


    return (

        <FormControl id='offer_form' onSubmit={HandleSubmit} maxW={'80vw'} isRequired >
            {
                isAlarm &&
                <Alert status='error' pos={'absolute'} zIndex={4} h={20} maxW={"70vw"}>
                    <Center textAlign={'center'}
                        display='flex' justifyContent={'space-between'}
                    >
                        <AlertIcon mx={5} w={8} />
                        <Text fontSize={24}>Введены не все данные, пожалуйста, заполните все поля, бля!</Text>
                    </Center>
                </Alert>
            }
            <HStack px={4} gap={8} mt={2} >
                <Input
                    placeholder='Offer ID'
                    id='offid'
                    ref={firstInput}
                    value={offer.offerId}
                    onChange={(e) => changeOffer('offerId', e.target.value)}
                    type={'text'}
                    variant={'filled'}
                    required
                    tabIndex={1} />
                <InputGroup zIndex={2} flexDirection={'row'} gap={3}>
                    <InputLeftAddon
                        children={<TagSelect changeTag={changeTag} tag={offer!.companyTag || 'ООО'} />}
                        bgColor='#abf8e752'
                        border={0}
                        rounded='lg'
                        fontWeight={'extrabold'}
                        fontSize={18}
                        tabIndex={-1}
                    />
                    <Input
                        placeholder='Company Name'
                        id='offcomp'
                        value={offer.companyName}
                        onChange={(e) => changeOffer('companyName', e.target.value)}
                        type={'text'}
                        required={true}
                        variant={'filled'}
                        tabIndex={2}
                    />


                </InputGroup>

                <Input
                    placeholder='Date Ready'
                    id='offdate'
                    value={offer.dateReady}
                    onChange={(e) => changeOffer('dateReady', e.target.value)}
                    type={'date'}
                    variant={'filled'}
                    tabIndex={3}
                    flexDir={'row-reverse'}
                    justifyContent={'space-between'}
                    gap={4}
                    maxInlineSize={'fit-content'}
                    bgColor='red'
                />
                <Input
                    placeholder='Description'
                    id='offdate'
                    value={offer.desc}
                    onChange={(e) => changeOffer('desc', e.target.value)}
                    type={'text'}
                    variant={'filled'}
                    tabIndex={4} />
                <Button type='submit'
                    onClick={e => HandleSubmit(e)}
                    bgColor={isAlarm ? 'red' : 'green'}
                    colorScheme={'green'}
                    p={8}
                    mt={'10'}
                    formTarget={'offer_form'}
                    form={'offer_form'}
                    tabIndex={5}
                >Добавить
                </Button>
            </HStack>

        </FormControl>
    )
};

type TagSelectProps = {
    changeTag: (value: OfferFormData['companyTag']) => void,
    tag: OfferFormData['companyTag']
}
const TagSelect: React.FC<TagSelectProps> = (props) => {

    const { tag, changeTag } = props


    return (
        <Menu >
            <MenuButton

                bgColor={'transparent'}
                _active={{ bgColor: 'transparent' }}
                _focus={{ bgColor: 'transparent' }}
            >{tag}</MenuButton>
            <MenuList maxW={'fit-content'} minInlineSize={'fit-content'}>
                <MenuItem
                    _hover={{ bgColor: "lightblue" }}
                    _focus={{ bgColor: 'lightblue' }}
                    onClick={() => changeTag('ИП')}>ИП</MenuItem>
                <MenuItem
                    _hover={{ bgColor: "lightblue" }}
                    _focus={{ bgColor: 'lightblue' }}
                    onClick={() => changeTag('ООО')}>ООО</MenuItem>
            </MenuList>
        </Menu>)
}