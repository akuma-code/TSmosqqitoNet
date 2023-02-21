import FocusLock from "react-focus-lock"
import React, { HTMLAttributes, useRef, useState, useMemo } from "react"
import { Box, Button, ButtonGroup, Flex, FormControl, FormLabel, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Text, Tooltip, useDisclosure } from "@chakra-ui/react"
import { EditIcon } from "@chakra-ui/icons"
import { GiBiohazard } from "react-icons/gi"
import { OfferCardProps, OfferFormData, OfferListData, OffersDBApi } from "./OfferTypes"
import { IconType } from "react-icons/lib"
import { GrDocumentMissing, GrDocumentVerified } from "react-icons/gr"
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
    currentOfferData: OfferListData
    onCancel: () => void
    EditFn: OffersDBApi['Edit']
}
// 2. Create the form
const EditForm = ({ currentOfferData, onCancel, EditFn }: EditFormProps) => {
    const [newOfferData, setOfferData] = useState<OfferListData>(currentOfferData)
    function HandleSubmit(e: React.FormEvent) {
        e.preventDefault()
        EditFn(currentOfferData.id, newOfferData)
        onCancel()
    }

    function ChangeHandler(key: keyof OfferFormData) {
        return (e: React.ChangeEvent<HTMLInputElement>) => setOfferData(prev => ({ ...prev, [key]: e.target.value }))
    }

    return (
        <form onSubmit={HandleSubmit} >


            <Stack spacing={4} p={4}>
                <TextInput
                    label={'Название'}
                    id='comp_name'
                    defaultValue={currentOfferData.companyName || ""}
                    onChange={ChangeHandler('companyName')}
                />
                <TextInput
                    label='Номер договора'
                    id='offer_id'
                    defaultValue={currentOfferData.offerId}
                    onChange={ChangeHandler('offerId')} />
                <TextInput
                    label='Комментарий'
                    id='offer_desc'
                    defaultValue={currentOfferData.desc || ""}
                    onChange={ChangeHandler('desc')} />
                <DateInput
                    label='Дата закрытия'
                    id='date_ready'
                    defaultValue={currentOfferData.dateReady}
                    onChange={ChangeHandler('dateReady')} />
                <ButtonGroup display={'flex'} alignContent='stretch' w={'full'}>
                    {/* {!currentOfferData.isDocSigned &&
                        <CheckButton
                            text={["подписан", "договор не подписан",]}
                            isCheck={currentOfferData.isDocSigned!}
                            IconOnCheck={GrDocumentVerified}
                            IconOnUncheck={GrDocumentMissing}
                            onClick={ToggleHandler('isDocSigned')}
                        />} */}
                </ButtonGroup>
                <ButtonGroup display='flex' justifyContent='flex-end'>
                    <Button variant='outline' onClick={onCancel}>
                        Отменить
                    </Button>
                    <Button colorScheme='teal' type="submit">
                        Сохранить
                    </Button>
                </ButtonGroup>
            </Stack>
        </form>
    )
}

// 3. Create the Popover
// Ensure you set `closeOnBlur` prop to false so it doesn't close on outside click
type EditCardProps = {
    offer: OfferFormData,
    onEdit: OffersDBApi['Edit']
    children?: React.ReactNode
}
export const EditPopover: React.FC<EditCardProps> = ({ offer, onEdit, children }) => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const firstFieldRef = React.useRef(null)

    return (
        <>

            <Popover isLazy
                isOpen={isOpen}
                initialFocusRef={firstFieldRef}
                onOpen={onOpen}
                onClose={onClose}
                placement='auto'
                closeOnBlur={true}
            >
                <PopoverTrigger>
                    {children}
                </PopoverTrigger>

                <PopoverContent textAlign={'center'}>
                    {/* <FocusLock returnFocus persistentFocus={false}> */}
                    <PopoverArrow />
                    <PopoverCloseButton size={'lg'} />
                    <PopoverHeader fontSize={20} fontWeight='semibold' textAlign={'center'}>
                        Изменить запись
                    </PopoverHeader>
                    <EditForm onCancel={onClose} currentOfferData={offer} EditFn={onEdit} />
                    {/* </FocusLock> */}
                </PopoverContent>
            </Popover>
        </>
    )
}

type CheckButtonProps = {
    text: string[],
    IconOnCheck: IconType,
    IconOnUncheck: IconType,
    isCheck: boolean
    onClick: () => void
}

const CheckButton: React.FC<CheckButtonProps> = ({ text, IconOnCheck, IconOnUncheck, isCheck, onClick }) => {
    const BTN = useMemo(() => (
        <Button size={'md'} onClick={onClick} w='full'
            colorScheme={isCheck ? 'green' : 'red'}
            variant={isCheck ? 'solid' : 'outline'}
        >
            <Flex justifyContent={'space-between'} width='full' alignItems={'center'} >
                {isCheck ?
                    <Text>{text[0]}</Text>
                    :
                    <Text> {text[1]}</Text>
                }
                {isCheck ?
                    <IconOnCheck fontSize={20} />
                    :
                    <IconOnUncheck fontSize={20} />
                }
            </Flex>
        </Button>
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ), [text, isCheck])
    return (
        BTN
    )
}