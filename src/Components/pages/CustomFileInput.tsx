import React, { HTMLAttributes } from 'react';

type CustomFileInputProps = {
    children?: React.ReactNode
    selectFile: (e: React.ChangeEvent<HTMLInputElement>) => void
} & HTMLAttributes<HTMLInputElement>

export const CustomFileInput: React.FC<CustomFileInputProps> = ({ selectFile, children }): JSX.Element => {


    return (
        <div className='file-field flex-row no-wrap' style={{ width: "fit-content" }}>
            <div className="btn btn-custom__file">
                <div className='flex-row-between no-wrap'>
                    {children}
                    <input type="file" onChange={selectFile} />
                </div>
            </div>
        </div>
    )
};
