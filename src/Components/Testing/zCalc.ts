type ISide = 'top' | 'bot' | 'left' | 'right'
type IFrameType = 'rama' | 'imp' | 'stv-imp' | 'stv-rama'
type IFrameState = 'stv' | 'fix' | 'shtulp'
type IFrame = {
    top: IFrameType,
    bot: IFrameType,
    left: IFrameType,
    right: IFrameType,
    state: IFrameState
}

export interface IRamaType {
    frames: IFrame[]
    sizes?: {
        H_main: number,
        W_main: number,
    }[]
}
const RamaTypeF = {
    frames: [{
        top: 'rama',
        bot: 'rama',
        left: 'rama',
        right: 'rama',
        state: 'fix'
    }],
    sizes: [{
        H_main: 1000,
        W_main: 1000
    }]
    ,
}

type FFframes = {
    [side: string]: IFrameType[]
}

const frames = {
    bot: 'rama',
    top: 'rama',
    left: 'rama',
    right: 'imp',
    state: 'fix'
} as const

function toggleStv(frame: IFrame) {
    return {
        ...frame,
        bot: 'rama',
        top: 'rama',
        left: 'rama',
        right: 'rama',
        state: 'fix'
    }
}

const tt = toggleStv(frames)

type f = typeof frames


const RamaTypeFF = {
    frames: [
        {
            bot: 'rama',
            top: 'rama',
            left: 'rama',
            right: 'imp'
        },
        {
            bot: 'rama',
            top: 'rama',
            right: 'rama',
            left: 'imp'
        },
    ]
}


//* ([{top:''}])



interface INodeSides {
    top: Frame,
    bot: Frame,
    left: Frame,
    right: Frame
}
class Frame {
    type: IFrameType
    constructor(type: IFrameType) {
        this.type = type
    }
    convert(): IFrameType {

        if (this.type === 'rama') return 'imp'
        if (this.type === 'stv-rama') return 'stv-imp'
        return this.type
    }

}

class RamaType {
    top: Frame
    bot: Frame
    left: Frame
    right: Frame
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

class RamaNodeFactory {
    makeRamaNode() {
        const top = new Frame('rama')
        const bot = new Frame('rama')
        const left = new Frame('rama')
        const right = new Frame('rama')
        return new RamaType({ top, bot, left, right })
    }

    newNode(topB: IFrameType, botB: IFrameType, leftB: IFrameType, rightB: IFrameType) {
        const top = new Frame(topB)
        const bot = new Frame(botB)
        const left = new Frame(leftB)
        const right = new Frame(rightB)
        return new RamaType({ top, bot, left, right })
    }

    addNode(baseNode: RamaType, newNode: RamaType, side: ISide = 'right') {
        const CONSTRUCT = []

        CONSTRUCT.push(baseNode)

    }
}