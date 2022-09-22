import React, { HTMLAttributes } from 'react'
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

export type ModalWrapProps = {
    children?: React.ReactNode
    isOpen: boolean
    onClose: () => void
    title?: string
} & HTMLAttributes<HTMLDivElement>
export const ModalWrap: React.FC<ModalWrapProps> = ({ isOpen, onClose, children, ...modalOpts }) => {
    const { title } = modalOpts
    return (
        <Modal isOpen={isOpen} onClose={onClose} {...modalOpts} scrollBehavior='outside'>
            <ModalOverlay />
            <ModalContent bgColor={'#5378a5'} >
                {title &&
                    <ModalHeader
                        bgColor={'#7c8b9e'}
                        textAlign='center' fontSize={'2xl'}
                        boxShadow={'base'}
                        borderRadius={'lg'}
                        border={'2px solid #fff'}
                    >
                        {title}
                    </ModalHeader>
                }
                <ModalCloseButton size={'lg'} />
                <ModalBody padding={0} border={'2px solid #fff'} borderRadius='lg'>
                    {children}
                </ModalBody>
                {/* <ModalFooter>
                    <Button colorScheme='whatsapp'>Accept</Button>
                    <Button colorScheme='blue' mx={4} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter> */}
            </ModalContent>
        </Modal>
    )
}
