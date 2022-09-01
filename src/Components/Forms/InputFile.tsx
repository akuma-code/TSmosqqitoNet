import React, { ChangeEvent, HTMLInputTypeAttribute } from 'react'

interface InputFileProps {
    title?: string
    value: any
    changeHandler?(e: ChangeEvent<HTMLInputElement>): void
    // children?: React.ReactNode
}

export const InputFile: React.FC<InputFileProps> = ({ title, changeHandler, value }) => {
    return (
        <div className="file-field input-field">
            <div className="btn">
                <span>{title}</span>
                <input type="file" onChange={changeHandler} value={value} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
        </div>
    )
}
