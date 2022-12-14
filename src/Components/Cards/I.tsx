import React, { FC, HTMLAttributes } from 'react'

export type IconProps = {
    title: string
    clsI?: string
    children?: React.ReactNode
    className?: string
    rest?: any[]
    wrapped?: boolean
} & HTMLAttributes<HTMLDivElement>

export const I: FC<IconProps> = ({ title, clsI, className, wrapped, rest }) => {
    const CLS = ["material-icons "]
    if (clsI) CLS.push(clsI)
    if (className) CLS.push(className)
    if (wrapped) return (
        <span className="I-wrapper">
            <i className={CLS.join(" ")}
                {...rest}>{title}</i>
        </span>
    )
    return (
        <i className={CLS.join(" ")}
            {...rest}>{title}</i>
    )
}
