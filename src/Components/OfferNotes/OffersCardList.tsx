import React from 'react';
import { OffCardListProps, OfferListData } from './OfferTypes';
import { OfferCard } from "./OfferCard";
import { Box, Center, Flex, List, ListItem } from '@chakra-ui/layout';
import { ListContainer } from '../Cards/ListContainer';
import { useID } from '../../hooks/useID';
const _id = useID
const initOffer = {
    companyName: "Рога И Копыта",
    companyTag: 'ООО',
    dateReady: "2023-02-10",
    offerId: "23/01/25/02-21П",
    desc: "описание и все такое",
    id: _id(),
    isDocResieved: false,
    isDocSigned: false,
    isRequested: false
} as OfferListData
export const OffersCardList: React.FC<OffCardListProps> = (props) => {
    const { offList, offControl } = props;




    return (
        <Flex flexDir={'column'} rowGap={2}>
            <OfferCard offer={initOffer} offControl={offControl} key={initOffer.id} />
            {offList.map(o => <OfferCard offer={o} offControl={offControl} />
            )}
        </Flex>
    );
};
