import React from 'react';
import { Button, Heading, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { OfferCardProps } from './OfferTypes';
import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react'
import { OffProgressBar } from './OffProgressBar';
import { I } from '../Cards/I';

export const OfferCard: React.FC<OfferCardProps> = ({ offer, checkFN }) => {


    return (
        <Card key={offer.id} bg={'gray.600'} flexDir={'column'} margin={4} maxWidth={'40vw'} rounded={'md'}>

            <CardHeader pos={'relative'}>
                <Heading size={'md'} flexDir={'column'} display={'flex'} textAlign={'center'}>
                    <span>{offer.offerId}</span>
                    <span>{offer.companyTag} "{offer.companyName}"</span>
                </Heading>
                <Menu colorScheme={'gray'} >
                    <MenuButton pos={'absolute'} top={1} right={1}
                        height={'3em'} width={'3em'}
                    ><I title='developer_board' /></MenuButton>
                    <MenuList>

                        <MenuItem>Delete</MenuItem>
                        <MenuDivider />
                    </MenuList>
                </Menu>

            </CardHeader>
            <CardBody textColor={'whiteAlpha.800'} flexDir={'column'} display={'flex'} gap={2} textAlign={'center'}>
                <Text fontSize={'lg'}>Дата отгрузки: {offer.dateReady}</Text>
                {offer.desc &&
                    <Text fontSize={'lg'}>Комментарий: {offer.desc}</Text>}
            </CardBody>
            <CardFooter bgColor={'green.600'} width={'100%'}>
                <OffProgressBar>
                    <Button
                        height={'100%'}
                        border={'2px solid'}
                        variant={'outline'}
                    >BTN1
                    </Button>
                    <Button height={'100%'}
                        border={'2px solid'}
                        variant={'outline'}
                    >BTN
                    </Button>
                    <Button height={'100%'}
                        border={'2px solid'}
                        variant={'outline'}
                    >BTN1
                    </Button>
                    <Button height={'100%'}
                        border={'2px solid'}
                        variant={'outline'}
                    >BTN1
                    </Button>
                </OffProgressBar>
            </CardFooter>
        </Card>
    );
};

// const cbxgrp = <CheckboxGroup
// // defaultValue={[]}
// >
//     <Stack textShadow={'lg'} fontWeight='bold' >
//         <Checkbox icon={<div className='bg-red' />} isChecked={offer.isRequested} onChange={() => checkFN(offer.id!, 'isRequested')}>Закрывающие запрошены</Checkbox>
//         <Checkbox isChecked={offer.isDocSigned} onChange={() => checkFN(offer.id!, 'isDocSigned')} >Договор подписан</Checkbox>
//         <Checkbox isChecked={offer.isDocResieved} onChange={() => checkFN(offer.id!, 'isDocResieved')} >Документы в офисе</Checkbox>
//     </Stack>
// </CheckboxGroup>  