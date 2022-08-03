import React from 'react'

import { ICardProps } from '../../types/props'

const cardStyle = {
    border: "1px solid black",
    padding: "2px 2px",
    width: "20vw"
}

export default function NetCard(props: ICardProps): JSX.Element {
    return (
        <div style={cardStyle} {...props}>
            <div>TEXT</div>
        </div>
    )
}
