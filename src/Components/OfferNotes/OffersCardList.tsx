import React from 'react';
import { OffCardListProps } from './OfferTypes';
import { OfferCard } from "./OfferCard";
import { Flex, Grid, GridItem, Text } from '@chakra-ui/layout';
import { useID } from '../../hooks/useID';
import { MdDeleteForever } from 'react-icons/md';
import { IconButton } from '@chakra-ui/react';
const _id = useID

export const OffersCardList: React.FC<OffCardListProps> = (props) => {
    const { offList, offControl } = props;




    return (
        <Grid templateColumns={'repeat(8, 1fr)'} columnGap={'40px'} maxW={'70vw'} minW={'50vw'} >

            <GridItem colSpan={6}>
                <Flex flexDir={'column'} rowGap={2}>
                    {offList.map(o => <OfferCard offer={o} offControl={offControl} key={o.id} />
                    )}
                </Flex>
            </GridItem>
            <GridItem colSpan={2} alignItems='start' justifyContent={'start'} display={'flex'} gap={4}>
                {offList.length >= 1 &&
                    <>
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
                    </>}
            </GridItem>


        </Grid >
    );
};
