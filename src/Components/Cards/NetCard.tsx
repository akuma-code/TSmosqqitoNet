import React from 'react'
import { Card } from 'antd'
import { ICardProps } from '../../types/props'

const cardStyle = {
    border: "1px solid black",
    padding: "2px 2px",
    width: "20vw"
}

export default function NetCard(props: ICardProps): JSX.Element {
    return (
        <Card style={cardStyle} {...props}>
            <div>TEXT</div>
        </Card>
    )
}
