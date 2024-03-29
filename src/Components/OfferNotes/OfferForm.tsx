import React, { useRef, useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import { useID } from '../../hooks/useID';
import { OfferFormData, OfferListData } from './OfferTypes';
import { Alarma } from './Alarma';
import { TagSelect } from './TagSelect';
const _id = useID
interface OfferFormProps {
    addOffer: (offer: OfferFormData) => void;
}

const initOffer = {
    companyName: "",
    companyTag: 'ООО',
    dateReady: "",
    offerId: "",
    desc: "",
    id: _id(),
    isDocResieved: false,
    isDocSigned: false,
    isDocRequested: false
} as OfferListData

export const OfferForm: React.FC<OfferFormProps> = (props) => {

    const [offer, setOffer] = useState<OfferFormData>(initOffer);
    const firstInput = useRef<HTMLInputElement>(null)
    const [isAlarm, setIsAlarm] = useState(false)
    function toggleAlarm() { setIsAlarm(prev => !prev) }
    function changeOffer(field: keyof OfferFormData, value: string) { setOffer(prev => ({ ...prev, [field]: value })); }




    function HandleSubmit(e?: React.FormEvent) {
        e?.preventDefault()

        props.addOffer(offer!);
        setOffer({ ...initOffer, companyTag: offer.companyTag, id: _id() } as OfferFormData);

        if (!firstInput.current) return
        firstInput.current.focus()
    }

    const changeTag = (tag: OfferFormData['companyTag']) => changeOffer('companyTag', tag)
    const alertText = `Введены не все данные, пожалуйста, заполните все поля, бля!`

    return (
        <form id='offer_form' onSubmit={HandleSubmit} name='offer'>


            <FormControl maxW={'80vw'} label='Новый договор' minW={'30vw'}>
                {
                    isAlarm && Alarma(alertText, toggleAlarm)
                }
                <Grid
                    gap={4}
                    mt={2}
                    templateColumns={'repeat(8, 1fr)'}
                    justifyItems='center'
                    alignItems={'center'}
                >
                    <GridItem colSpan={2} alignItems={'self-start'}>
                        <InputGroup zIndex={2}  >
                            <Flex alignItems={'center'} justifyItems={'center'} justifyContent='space-between' gap={3}>
                                <InputLeftAddon
                                    children={
                                        <TagSelect changeTag={changeTag} tag={offer.companyTag || 'ООО'} />
                                    }
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
                            </Flex>
                        </InputGroup>

                    </GridItem>

                    <GridItem colSpan={2} mx='auto'>
                        <InputGroup flexDir={'column'} >
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
                    </GridItem>


                    <GridItem colSpan={2}>
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
                    </GridItem>

                    <GridItem colSpan={1}>
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
                    </GridItem>


                </Grid>

            </FormControl>
        </form>
    )
};


