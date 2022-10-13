export const FRAME = (w: number, h: number, left?: number, right?: number) => {
    const F = {
        frames: [
            {
                id: 1,
                bot: "rama",
                left: "rama",
                top: 'rama',
                right: "rama",
                posNumb: 1,
                state: "fix",
                frameSize: { w: w, h: h }
            }
        ],
        size: {
            H: h,
            W: w,
        }
    }


    const FF = {
        frames: [
            {
                id: 1,
                title: "left",
                bot: "rama",
                left: "rama",
                top: 'rama',
                right: "rama",
                posNumb: 1,
                state: "fix",
                frameSize: {
                    h: h,
                    w: left || w / 2,
                }
            },
            {
                id: 2,
                title: "right",
                bot: "rama",
                left: "rama",
                top: 'rama',
                right: "rama",
                posNumb: 2,
                state: "fix",
                frameSize: {
                    h: h,
                    w: left ? w - left : w / 2,
                }
            },
        ],
        size:
        {
            H: h,
            W: w,
        }
    }

    return { F, FF } as const

}



export const fixframeF = {
    id: 1,
    bot: "rama",
    left: "rama",
    top: 'rama',
    right: "rama",
    posNumb: 1,
    state: "fix",
} as const
export const stvframeF = {
    id: 1,
    bot: "stv_rama",
    left: "shtulp_imp",
    top: 'stv_rama',
    right: "stv_rama",
    posNumb: 1,
    state: "stv",
} as const
export const shtulpframeF = {
    id: 1,
    bot: "stv_rama",
    left: "shtulp_imp",
    top: 'stv_rama',
    right: "stv_rama",
    posNumb: 1,
    state: "shtulp",
} as const