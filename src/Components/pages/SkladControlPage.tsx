import React from 'react'




export const SkladControlPage = () => {




    return (
        <div>SkladControlPage</div>
    )
}



type BalkaType = 'rama' | 'imp' | 'stv-imp' | 'stv-rama'
type PositionType = 'top' | 'bot' | 'left' | 'right'

class GNode {
    top: BalkaType
    bot: BalkaType
    left: BalkaType
    right: BalkaType
    // addNode(pos:PositionType, newNode:GNode):GNode[]
    constructor(top: BalkaType, bot: BalkaType, left: BalkaType, right: BalkaType) {
        this.top = top
        this.bot = bot
        this.left = left
        this.right = right
    }

    addNode(pos: PositionType, newNode: GNode) {

    }
}

function createNode(top: BalkaType = 'rama', bot: BalkaType = 'rama', left: BalkaType = 'rama', right: BalkaType = 'rama') {
    return new GNode(top, bot, left, right)
}
