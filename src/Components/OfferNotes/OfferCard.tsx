import React from 'react';
import { Heading, Text } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { OfferCardProps } from './OfferTypes';


export const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
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

        </CardFooter>
    </Card>);
};
