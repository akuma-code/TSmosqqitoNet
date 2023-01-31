import React from 'react';
import { Heading, Text } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { OfferCardProps } from './OfferTypes';
import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react'

export const OfferCard: React.FC<OfferCardProps> = ({ offer, checkFN }) => {


    return (<Card key={offer.id} bg={'gray.600'} flexDir={'row'} margin={4}>

        <CardHeader>
            <Heading size={'lg'} flexDir={'column'} display={'flex'}>
                <span>{offer.offerId}</span>
                <span>{offer.companyTag} "{offer.companyName}"</span>
            </Heading>
        </CardHeader>
        <CardBody textColor={'whiteAlpha.800'} flexDir={'column'} display={'flex'} gap={4} textAlign={'center'}>
            <Text fontSize={'lg'}>Дата отгрузки: {offer.dateReady}</Text>
            {offer.desc && <Text fontSize={'lg'}>Комментарий: {offer.desc}</Text>}
        </CardBody>
        <CardFooter>
            <CheckboxGroup
            // defaultValue={[]}
            >
                {/* <Stack textShadow={'lg'} fontWeight='bold' > */}
                <Checkbox icon={<div className='bg-red' />} isChecked={offer.isRequested} onChange={() => checkFN(offer.id!, 'isRequested')}>Закрывающие запрошены</Checkbox>
                <Checkbox isChecked={offer.isDocSigned} onChange={() => checkFN(offer.id!, 'isDocSigned')} >Договор подписан</Checkbox>
                <Checkbox isChecked={offer.isDocResieved} onChange={() => checkFN(offer.id!, 'isDocResieved')} >Документы в офисе</Checkbox>
                {/* </Stack> */}
            </CheckboxGroup>
        </CardFooter>
    </Card>);
};
