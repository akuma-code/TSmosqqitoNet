import { ToastId, useToast, UseToastOptions } from '@chakra-ui/react'
import React, { useRef } from 'react'



export const ToastReadyOffer = (desc: string) => {
    const toast = useToast()
    const options = {
        title: 'Offer ready',
        description: desc,
        status: 'success',
        duration: 5000,
        isClosable: true,
        variant: 'solid'
    } as UseToastOptions

    const To = React.useRef<ToastId>()
    To.current = toast(options)
    return To
}

function ClosingToastExample() {
    const toast = useToast()
    const toastIdRef = React.useRef<ToastId>()

    function close() {
        if (toastIdRef.current) {
            toast.close(toastIdRef.current)
        }
    }

    function closeAll() {
        // you may optionally pass an object of positions to exclusively close
        // keeping other positions opened
        // e.g. `{ positions: ['bottom'] }`
        toast.closeAll()
    }

    function addToast() {
        toastIdRef.current = toast({ description: 'some text' })
    }

    return toastIdRef
}