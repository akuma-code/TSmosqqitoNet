import React, { useState, useEffect, useContext, HTMLAttributes, FC } from 'react'

export const useLocalStateArray = (key: string) => {
    const [savedItems, setSavedItems] = useState<any[] | []>([])
    if (!localStorage.getItem(key)) return localStorage.setItem(key, '[]')


    const saved = JSON.parse(localStorage.getItem(key) || '[]')

    setSavedItems(saved)

    const saveToLS = (items: any[]) => localStorage.setItem(key, JSON.stringify(items))



    return [savedItems, setSavedItems] as const
}