import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react'

export interface ModalWrapProps {
    children?: React.ReactNode
    isOpen: boolean
    onClose: () => void

}
export const ModalWrap: React.FC<ModalWrapProps> = ({ isOpen, onClose, children }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Редактировать изделие</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='whatsapp'>Accept</Button>
                    <Button colorScheme='blue' mx={4} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
