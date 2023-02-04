import FocusLock from "react-focus-lock"
import React, { HTMLAttributes, useRef, useState } from "react"
import { Box, Button, ButtonGroup, FormControl, FormLabel, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Text, useDisclosure } from "@chakra-ui/react"
import { EditIcon } from "@chakra-ui/icons"
import { GiBiohazard } from "react-icons/gi"
import { OfferCardProps, OfferFormData } from "./OfferTypes"
// 1. Create a text input component


type TextInputProps = {
    id: string,
    label: string,
    defaultValue: string

} & HTMLAttributes<HTMLInputElement>
const TextInput = React.forwardRef((props: TextInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
        <FormControl>
            <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
            <Input ref={ref} {...props} />
        </FormControl>
    )
})
type DateInputProps = {
    onChange: () => void
} & TextInputProps
const DateInput = React.forwardRef((props: TextInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {

    return (
        <FormControl>
            <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
            <Input ref={ref}
                type={'date'}
                variant={'filled'}
                tabIndex={3}
                flexDir={'row-reverse'}
                justifyContent={'space-between'}
                gap={8}
                maxInlineSize={'full'}
                _focus={{ bgColor: 'blue.300' }}
                {...props}
            // isRequired
            />

        </FormControl>
    )
})
type EditFormProps = {
    initOffer: OfferFormData
    onCancel: () => void
    EditFn: OfferCardProps['offControl']['Edit']
}
// 2. Create the form
const EditForm = ({ initOffer: currentOffer, onCancel, EditFn }: EditFormProps) => {
    const [newOfferData, setOfferData] = useState<OfferFormData>(currentOffer)
    function HandleSubmit(e: React.FormEvent) {
        e.preventDefault()
        EditFn({ ...currentOffer, ...newOfferData })
        onCancel()
    }

    function ChangeHandler(key: keyof OfferFormData) {
        return (e: React.ChangeEvent<HTMLInputElement>) => setOfferData(prev => ({ ...prev, [key]: e.target.value }))
    }
    return (
        <form onSubmit={HandleSubmit}>


            <Stack spacing={4}>
                <TextInput
                    label={'Название'}
                    id='comp_name'
                    defaultValue={currentOffer.companyName || ""}
                    onChange={ChangeHandler('companyName')}
                />
                <TextInput
                    label='Номер договора'
                    id='offer_id'
                    defaultValue={currentOffer.offerId}
                    onChange={ChangeHandler('offerId')} />
                <DateInput
                    label='Дата закрытия'
                    id='date_ready'
                    defaultValue={currentOffer.dateReady}
                    onChange={ChangeHandler('dateReady')} />
                <TextInput
                    label='Комментарий'
                    id='offer_desc'
                    defaultValue={currentOffer.desc || ""}
                    onChange={ChangeHandler('desc')} />
                <ButtonGroup display='flex' justifyContent='flex-end'>
                    <Button variant='outline' onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button colorScheme='teal' type="submit">
                        Save
                    </Button>
                </ButtonGroup>
            </Stack>
        </form>
    )
}

// 3. Create the Popover
// Ensure you set `closeOnBlur` prop to false so it doesn't close on outside click
export const EditCardPopover = (offer: OfferFormData, onEdit: OfferCardProps['offControl']['Edit'], trigger?: React.ReactNode,) => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const firstFieldRef = React.useRef(null)

    return (
        <>

            <Popover
                isOpen={isOpen}
                initialFocusRef={firstFieldRef}
                onOpen={onOpen}
                onClose={onClose}
                placement='auto'
                closeOnBlur={true}
            >
                <PopoverTrigger>
                    {trigger}
                </PopoverTrigger>
                <PopoverContent p={5} textAlign={'center'}>
                    {/* <FocusLock returnFocus persistentFocus={false}> */}
                    <PopoverArrow />
                    <PopoverCloseButton size={'lg'} />
                    <PopoverHeader fontSize={20} fontWeight='semibold' textAlign={'center'}>
                        Изменить запись
                    </PopoverHeader>
                    <EditForm onCancel={onClose} initOffer={offer} EditFn={onEdit} />
                    {/* </FocusLock> */}
                </PopoverContent>
            </Popover>
        </>
    )
}

