import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Grid, HStack, Input, InputGroup, InputLeftAddon, Menu, MenuButton, MenuItem, MenuItemOption, MenuList, MenuOptionGroup, Text } from '@chakra-ui/react';
import { useID } from '../../hooks/useID';
import { OfferFormData } from './OfferTypes';
import { Alarma } from './Alarma';

interface OfferFormProps {
    getOffer: (offer: OfferFormData) => void;
}



export const OfferForm: React.FC<OfferFormProps> = (props) => {

    const strID = useID;
    const [offer, setOffer] = useState<OfferFormData>({ companyTag: "ООО", id: strID() } as OfferFormData);
    const firstInput = useRef<HTMLInputElement>(null)
    const [isAlarm, setIsAlarm] = useState(false)
    function toggleAlarm() { setIsAlarm(prev => !prev) }
    function changeOffer(field: keyof OfferFormData, value: string) { setOffer(prev => ({ ...prev, [field]: value })); }


    function HighLightButton() {
        console.log("Введены не все данные!");
        if (isAlarm) return
        setIsAlarm(prev => true)

        setTimeout(() => {
            setIsAlarm(prev => false)
        }, 4000)
    }

    function HandleSubmit(e?: React.FormEvent) {
        e?.preventDefault()
        if (!offer.companyName || !offer.offerId) return HighLightButton();

        props.getOffer(offer!);
        setOffer({ companyName: "", offerId: "", desc: "", companyTag: offer.companyTag, dateReady: offer.dateReady } as OfferFormData);

        if (!firstInput.current) return
        firstInput.current.focus()
    }

    const changeTag = (tag: OfferFormData['companyTag']) => changeOffer('companyTag', tag)
    const alertText = `Введены не все данные, пожалуйста, заполните все поля, бля!`

    return (
        <form id='offer_form' onSubmit={HandleSubmit} name='offer'>


            <FormControl maxW={'80vw'} label='Новый договор'>
                {
                    isAlarm && Alarma(alertText, toggleAlarm)
                }
                <Grid px={4} gap={8} mt={2} templateColumns={'repeat(5, 1fr)'} justifyItems='center'>
                    <InputGroup zIndex={2} gap={3}>

                        <InputLeftAddon
                            children={<TagSelect changeTag={changeTag} tag={offer.companyTag || 'ООО'} />}
                            bgColor='transparent'
                            border={0}
                            rounded='lg'
                            fontWeight={'extrabold'}
                            fontSize={18}
                        // tabIndex={0}
                        />
                        <Box display={'flex'} flexDir={'column'} minInlineSize={'fit-content'}>
                            <Input
                                id='offcomp'
                                ref={firstInput}
                                value={offer.companyName}
                                onChange={(e) => changeOffer('companyName', e.target.value)}
                                type={'text'}
                                variant={'filled'}
                                tabIndex={1}
                                isRequired
                                _focusVisible={{ bg: "#3182ce", borderColor: "#3182ce" }}
                            />

                            <FormLabel>Название компании</FormLabel>
                        </Box>
                    </InputGroup>
                    <InputGroup flexDir={'column'} w='70%'>
                        <Input
                            placeholder=''
                            id='offid'
                            value={offer.offerId}
                            onChange={(e) => changeOffer('offerId', e.target.value)}
                            type={'text'}
                            variant={'filled'}
                            isRequired
                            tabIndex={2}
                            _focus={{ bgColor: 'blue.300' }} />
                        <FormLabel >Номер договора</FormLabel>
                    </InputGroup>


                    <InputGroup flexDir={'column'} _focus={{ bgColor: 'blue.300' }}>
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
                            gap={8}
                            maxInlineSize={'full'}
                            _focus={{ bgColor: 'blue.300' }}
                        // isRequired
                        />
                        <FormLabel>Дата отгрузки</FormLabel>
                    </InputGroup>
                    <InputGroup flexDir={'column'}>
                        <Input
                            placeholder=''
                            id='offdate'
                            value={offer.desc}
                            onChange={(e) => changeOffer('desc', e.target.value)}
                            type={'text'}
                            variant={'filled'}
                            tabIndex={4}
                            _focus={{ bgColor: 'blue.300' }} />
                        <FormLabel>Описание</FormLabel>
                    </InputGroup>



                    <Button type='submit'
                        // onClick={e => HandleSubmit(e)}
                        bgColor={isAlarm ? 'red' : 'blue'}
                        colorScheme={'blue'}
                        p={8}
                        mt={'2'}
                        formTarget={'offer_form'}
                        form={'offer_form'}
                        w={'fit-content'}
                        tabIndex={5}
                    >Добавить
                    </Button>
                </Grid>

            </FormControl>
        </form>
    )
};

type TagSelectProps = {
    changeTag: (value: OfferFormData['companyTag']) => void,
    tag: OfferFormData['companyTag']
}
const TagSelect: React.FC<TagSelectProps> = (props) => {

    const { tag, changeTag } = props


    return (
        <Menu  >
            <MenuButton tabIndex={-1} autoFocus={false} as={Button}
                bgColor={'blue.300'}
                _active={{ bgColor: 'transparent' }}
                _focus={{ bgColor: 'transparent' }}
                _hover={{ bgColor: "blue.300" }}
                border={'2px solid black'}
            >{tag}</MenuButton>
            <MenuList minW={'fit-content'}  >
                <MenuOptionGroup defaultValue='ООО' type='radio'
                >
                    <MenuItemOption
                        _hover={{ bgColor: "blue.300" }}
                        _focus={{ bgColor: 'blue.300' }}
                        value='ООО'
                        onClick={() => changeTag('ООО')}
                    >ООО
                    </MenuItemOption>
                    <MenuItemOption
                        _hover={{ bgColor: "blue.300" }}
                        _focus={{ bgColor: 'blue.300' }}
                        value='ИП'
                        onClick={() => changeTag('ИП')}
                    >ИП
                    </MenuItemOption>
                </MenuOptionGroup>
                {/* <MenuItem
                    _hover={{ bgColor: "lightblue" }}
                    _focus={{ bgColor: 'lightblue' }}
                    onClick={() => changeTag('ИП')}>ИП</MenuItem>
                <MenuItem
                    _hover={{ bgColor: "lightblue" }}
                    _focus={{ bgColor: 'lightblue' }}
                    onClick={() => changeTag('ООО')}>ООО</MenuItem> */}

            </MenuList>
        </Menu>)
}


