import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdOutlineSettingsApplications } from 'react-icons/md'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react'
import { HOSTURL } from '../../types/IServerData'
import axios from 'axios'


type Props = {}
class ServerSettings {
    host_url: string
    constructor(path: string) {
        this.host_url = path
    }
}
export const SettingsModal = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const options = {
        host_url: localStorage.getItem('server_url') || "",
    } as const
    return (
        <div>
            <MdOutlineSettingsApplications fontSize={40} onClick={onOpen} cursor={'pointer'} />


            <Modal onClose={onClose} isOpen={isOpen} size={'xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Настройки</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <SettingsTable server_options={options} />
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={onClose}>Закрыть</button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}
interface TableProps {
    server_options: ServerSettings
    // [key: string]: string
}
const SettingsTable: React.FC<TableProps> = ({ server_options }) => {

    const { host_url } = server_options


    function onChangeUrl(path: string) {
        const saved = localStorage.getItem('server_url')
        if (saved === path) console.log(saved);

        localStorage.setItem('server_url', path)
    }
    return (
        <TableContainer>
            <Table variant='striped' colorScheme='blue' size={'xl'}>
                {/* <TableCaption>settings</TableCaption> */}
                <Thead>
                    <Tr>
                        <Th>параметр</Th>
                        <Th>значение</Th>
                        <Th>описание</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>Host Url</Td>
                        <Td>
                            <UrlMenuButton saved_path={host_url} onChangeFn={onChangeUrl} />
                        </Td>
                        <Td>{host_url}</Td>
                    </Tr>

                </Tbody>
                <Tfoot>

                </Tfoot>
            </Table>
        </TableContainer>
    )
}

const UrlMenuButton: React.FC<{ saved_path: string, onChangeFn: (p: string) => void }> = ({ saved_path, onChangeFn }) => {
    const { isOpen, onOpen, onClose } = useDisclosure({ isOpen: false })
    const UA = [HOSTURL.CKO3, HOSTURL.WORK, HOSTURL.HOME]
    const SA = ['http://akumapc:5000', 'http://prodnyan:5000', 'http://cko3:5000']
    const [path, setPath] = useState<string>(saved_path || "http://akumapc:5000")
    const changeFn = (value: string | string[]) => {
        if (Array.isArray(value)) {
            return console.log(value);
        }
        if (typeof value === 'string') {
            setPath(value)
            onChangeFn(value)
        }
        onClose()
    }

    const text = (url: string) => {
        if (url === 'http://akumapc:5000') return 'Дом'
        if (url === 'http://prodnyan:5000') return 'Дев Сервер'
        if (url === 'http://cko3:5000') return 'Сервак на работе'
    }
    return (
        <Menu closeOnSelect={true} >
            <MenuButton as={Button} colorScheme='blue' variant={'link'}>
                {text(path)}
            </MenuButton>
            <MenuList minWidth='240px'>

                <MenuOptionGroup title='host url' type='radio' onChange={changeFn} defaultValue={HOSTURL.CKO3}>
                    <MenuItemOption value={HOSTURL.HOME}>Дом (akumaPC:5000)</MenuItemOption>
                    <MenuItemOption value={HOSTURL.CKO3}>Сервак на работе (cko3:5000) </MenuItemOption>
                    <MenuItemOption value={HOSTURL.WORK}>Работа (prodnyan:5000) </MenuItemOption>
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    )
}