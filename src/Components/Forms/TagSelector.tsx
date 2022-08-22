import React, { FC, useState } from 'react'
import { I } from '../Cards/I'

interface TagSelectorProps {
    fields?: string[]
    children?: React.ReactNode
}


export const TagSelector: FC<TagSelectorProps> = ({ fields, children }) => {
    const [tags, setTags] = useState(children)
    const btnCls = 'chip  btn waves-effect waves-light '

    return (
        <div className='mt1 valign-wrapper'>

            <button className='btn-floating  mx1'>
                <I title='arrow_upward' clsI='' />
            </button>
            <button className={btnCls + " ml1"}
            >
                По Типу
            </button>
            <button className={btnCls + "ml1"}
            >
                По дате
            </button>
            {children}
        </div>
    )
}
