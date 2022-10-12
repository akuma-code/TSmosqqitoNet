import React from 'react'




export const SkladControlPage = () => {




    return (
        <div>SkladControlPage</div>
    )
}

type ISide = 'top' | 'bot' | 'left' | 'right'


type BalkaType = 'rama' | 'imp' | 'stv-imp' | 'stv-rama'



interface INodeSides {
    top: Balka,
    bot: Balka,
    left: Balka,
    right: Balka
}
class Balka {
    type: BalkaType
    constructor(type: BalkaType) {
        this.type = type
    }
    convert(): BalkaType {

        if (this.type === 'rama') return 'imp'
        if (this.type === 'stv-rama') return 'stv-imp'
        return this.type
    }

}

class Node {
    top: Balka
    bot: Balka
    left: Balka
    right: Balka
    constructor(sides: INodeSides) {
        this.top = sides.top
        this.bot = sides.bot
        this.left = sides.left
        this.right = sides.right
    }

    get info() {
        const info = { top: this.top, left: this.left, bot: this.bot, right: this.right }
        return info
    }

    connect(side: ISide) {
        return this[side].convert()
    }
}

class NodeFactory {
    makeRamaNode() {
        const top = new Balka('rama')
        const bot = new Balka('rama')
        const left = new Balka('rama')
        const right = new Balka('rama')
        return new Node({ top, bot, left, right })
    }

    newNode(topB: BalkaType, botB: BalkaType, leftB: BalkaType, rightB: BalkaType) {
        const top = new Balka(topB)
        const bot = new Balka(botB)
        const left = new Balka(leftB)
        const right = new Balka(rightB)
        return new Node({ top, bot, left, right })
    }

    addNode(baseNode: Node, newNode: Node, side: ISide = 'right') {
        const CONSTRUCT = []

        CONSTRUCT.push(baseNode)

    }
}