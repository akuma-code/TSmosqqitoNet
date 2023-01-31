import React from 'react';
import { OffCardListProps } from './OfferTypes';
import { OfferCard } from "./OfferCard";

export const OffersCardList: React.FC<OffCardListProps> = (props) => {
    const { offList } = props;

    return (
        <div>
            {offList.map(o => <OfferCard offer={o} key={o.id} />
            )}
        </div>
    );
};
