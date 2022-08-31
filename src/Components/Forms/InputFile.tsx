import React, { ChangeEvent, HTMLInputTypeAttribute } from 'react'

interface InputFileProps {
    title?: string

    changeHandler?(e: ChangeEvent<HTMLInputElement>): void
    // children?: React.ReactNode
}

export const InputFile: React.FC<InputFileProps> = ({ title, changeHandler }) => {
    return (
        <div className="file-field input-field">
            <div className="btn">
                <span>{title}</span>
                <input type="file" onChange={changeHandler} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
        </div>
    )
}
