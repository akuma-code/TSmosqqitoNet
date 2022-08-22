import React, { FC } from 'react'

export interface IconProps {
    title: string
    clsI?: string
    children?: React.ReactNode
    className?: string
    rest?: any[]
}

export const I: FC<IconProps> = ({ title, clsI, ...rest }) => {
    const CLS = ["material-icons"]
    if (clsI) CLS.push(clsI)
    return (
        <i className={CLS.join(" ")}
            {...rest}>{title}</i>
    )
}
