import FocusLock from "react-focus-lock"
import React from "react"
import { Box, Button, ButtonGroup, FormControl, FormLabel, IconButton, Input, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger, Stack, Text, useDisclosure } from "@chakra-ui/react"
import { EditIcon } from "@chakra-ui/icons"
import { GiBiohazard } from "react-icons/gi"
import { OfferFormData } from "./OfferTypes"
// 1. Create a text input component


type TextInputProps = {
    id: string,
    label: string,
    defaultValue: string

}
const TextInput = React.forwardRef((props: TextInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
        <FormControl>
            <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
            <Input ref={ref} {...props} />
        </FormControl>
    )
})
type EditFormProps = {
    firstFieldRef: React.MutableRefObject<HTMLInputElement | null>,
    editOfferData: OfferFormData
    onCancel: () => void
}
// 2. Create the form
const EditForm = ({ firstFieldRef, onCancel, editOfferData }: EditFormProps) => {
    return (
        <Stack spacing={4}>
            <TextInput
                label='First name'
                id='first-name'
                ref={firstFieldRef}
                defaultValue='John'
            />
            <TextInput
                label='Last name'
                id='last-name'
                defaultValue='Smith' />
            <ButtonGroup display='flex' justifyContent='flex-end'>
                <Button variant='outline' onClick={onCancel}>
                    Cancel
                </Button>
                <Button isDisabled colorScheme='teal'>
                    Save
                </Button>
            </ButtonGroup>
        </Stack>
    )
}

// 3. Create the Popover
// Ensure you set `closeOnBlur` prop to false so it doesn't close on outside click
export const EditCardPopover = (offer: OfferFormData, trigger?: React.ReactNode) => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const firstFieldRef = React.useRef(null)

    return (
        <>

            <Popover
                isOpen={isOpen}
                initialFocusRef={firstFieldRef}
                onOpen={onOpen}
                onClose={onClose}
                placement='right'
                closeOnBlur={false}
            >
                <PopoverTrigger>
                    {trigger}
                    {/* <Button variant={'outline'}>Edit card</Button> */}
                </PopoverTrigger>
                <PopoverContent p={5}>
                    <FocusLock returnFocus persistentFocus={false}>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <EditForm firstFieldRef={firstFieldRef} onCancel={onClose} editOfferData={offer} />
                    </FocusLock>
                </PopoverContent>
            </Popover>
        </>
    )
}

