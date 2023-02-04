import React from 'react';
import { OffCardListProps, OfferListData } from './OfferTypes';
import { OfferCard } from "./OfferCard";
import { Box, Center, Flex, Grid, GridItem, List, ListItem, SimpleGrid, Text } from '@chakra-ui/layout';
import { ListContainer } from '../Cards/ListContainer';
import { useID } from '../../hooks/useID';
import { MdDeleteForever, MdDeleteOutline } from 'react-icons/md';
import { Button, IconButton } from '@chakra-ui/react';
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
        <Grid templateColumns={'repeat(8, 1fr)'} columnGap={'40px'} maxW={'70vw'} alignContent='center' mx={'auto'}>

            <GridItem colSpan={6}>
                <Flex flexDir={'column'} rowGap={2}>
                    {/* <OfferCard offer={initOffer} offControl={offControl} key={initOffer.id} /> */}
                    {offList.map(o => <OfferCard offer={o} offControl={offControl} key={o.id} />
                    )}
                </Flex>
            </GridItem>
            <GridItem colSpan={2} justifyItems='center' alignContent={'center'}>
                <IconButton
                    size={'lg'}
                    variant={'outline'}
                    colorScheme={'red'}
                    padding={0}
                    aria-label='delete'
                    fontSize={28}
                    icon={<MdDeleteForever />}
                    onClick={offControl.clearOffers}
                />
                <Text fontSize={20}>Удалить все</Text>
            </GridItem>


        </Grid>
    );
};
