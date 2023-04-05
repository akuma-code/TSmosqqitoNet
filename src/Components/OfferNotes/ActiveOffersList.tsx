import React from 'react';
import { OffCardListProps, OffersDBApi } from './OfferTypes';
import { OfferCard } from "./OfferCard";
import { Flex, Grid, GridItem, Text } from '@chakra-ui/layout';
import { MdDeleteForever } from 'react-icons/md';
import { IconButton } from '@chakra-ui/react';

type ActiveOffersListProps = {
    actions?: OffersDBApi
} & OffCardListProps

export const ActiveOffersList: React.FC<ActiveOffersListProps> = (props) => {
    const { offList, nextStep, actions } = props;
    if (!offList || offList.length === 0) return <Text fontSize={'2xl'} fontWeight='bold' textAlign='center' w={'55vw'}>Договоров в работе нет!</Text>

    return (
        <Grid templateColumns={'repeat(8, 1fr)'} columnGap={'40px'} maxW={'70vw'} minW={'50vw'} >

            <GridItem colSpan={6}>
                <Flex flexDir={'column'} rowGap={2}>
                    {offList.map(o => <OfferCard offer={o} offControl={actions!} key={o.id} nextStep={() => nextStep!(o.id)} />
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
                            onClick={() => actions!.RemoveList('onActive')}
                        />
                        <Text fontSize={20}>Очистить список</Text>

                    </>
                }
            </GridItem>


        </Grid >
    );
};
