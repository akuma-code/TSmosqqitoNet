import React from 'react';
import { OffCardListProps, OfferListData } from './OfferTypes';
import { OfferCard } from "./OfferCard";
import { Box, List, ListItem } from '@chakra-ui/layout';
import { ListContainer } from '../Cards/ListContainer';
import { useID } from '../../hooks/useID';
const _id = useID
export const OffersCardList: React.FC<OffCardListProps> = (props) => {
    const { offList, offControl } = props;
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
    return (
        <List >
            <OfferCard offer={initOffer} offControl={offControl} />
            {offList.map(o => <ListItem key={o.id}> <OfferCard offer={o} offControl={offControl} /></ListItem>
            )}
        </List>
    );
};
