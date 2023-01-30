import React, { useState, useEffect, useContext, HTMLAttributes, FC } from 'react'

export const useLocStorage = <T>(offers: T, key: string) => {
    const [saved, setSaved] = useState<typeof offers>()

    useEffect(() => {
        setSaved(JSON.parse(localStorage.getItem(key) || ""))
        if (!saved) return
    }, [])

    const strOffers = JSON.stringify(offers)



    return saved
}