import React, { HTMLAttributes } from 'react'
import {
    Editable,
    EditableInput,
    EditablePreview,
    useEditableControls,
    Icon,
    Input,
    ButtonGroup,
    IconButton,
    Flex,
    Button,
    HStack,
} from '@chakra-ui/react'
import { TiDatabase } from 'react-icons/ti'
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import { AiFillEdit } from 'react-icons/ai'

export type CustomInputProps = {
    children?: React.ReactNode
    props?: any

} & HTMLAttributes<HTMLInputElement>
export function EditableControls(props: any): JSX.Element {
    const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
        <ButtonGroup justifyContent='space-between' size='sm'>
            <Button
                {...getSubmitButtonProps()}
                as={IconButton}
                icon={<CheckIcon fontSize={'xl'} />}
            />
            <Button
                {...getCancelButtonProps()}
                as={IconButton}
                icon={<CloseIcon fontSize={'xl'} />}
            />
        </ButtonGroup>
    ) : (
        <Flex >
            <Button
                {...getEditButtonProps()}
                as={IconButton}
                size='sm'
                icon={<EditIcon as={AiFillEdit}
                    fontSize={'xl'} />}
            />
        </Flex>
    )
}
export const CustomInput: React.FC<CustomInputProps> = ({ children, props }) => {




    return (
        <Editable
            width={'90%'}
            textAlign='center'
            fontSize='2xl'
            isPreviewFocusable={false}
            value={props.active.typename}



        >
            <HStack justifyContent='flex-start'>

                <EditablePreview as={Button} minW={'30%'} colorScheme={'green'} bg={'rebeccapurple'} />
                <Input bg={'cyan'}
                    as={EditableInput}
                    onChange={(e) => props.setActive((prev: any) => ({ ...prev, typename: e.target.value }))}
                />
                <EditableControls />
            </HStack>
        </Editable>
    )
}
