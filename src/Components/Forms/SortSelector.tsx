import React, { FC, useEffect, useState } from 'react'

type SortSelectorProps = {
    sort: (type: string) => void
    children?: React.ReactNode
}

export const SortSelector: FC<SortSelectorProps> = ({ sort }) => {

    const [sort_field, setSortField] = useState({ type: "" })
    useEffect(() => {
        sort(sort_field.type)


    }, [sort_field.type])

    return (
        <div className="flex-row input-field">
            <span className='pr1'
            >
                Сортировка
            </span>
            <select
                defaultValue='type'
                className='browser-default'
                onChange={(e) => { setSortField(prev => ({ ...prev, type: e.target.value })) }}
            >

                <option value="" disabled>выбрать...</option>
                <option value="checked">По сделаному</option>
                <option value="numb">Сначала последние</option>
                <option value="type">По типу</option>
            </select>
        </div>


    )
}
