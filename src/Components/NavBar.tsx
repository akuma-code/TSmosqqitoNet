import React, { FC } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { MdBackupTable, MdOutlineSettingsApplications } from "react-icons/md";
import { useAuth } from '../hooks/useAuth'
import { Login } from './Modal/Login'
import { SettingsModal } from './Modal/SettingsModal';

type NavBarProps = {
    children?: React.ReactNode
}

const NavBar: FC<NavBarProps> = () => {

    const checkAuth = () => {
        const isAuth = localStorage.getItem('isAuth') || "false"
        return JSON.parse(isAuth)
    }
    return (
        <nav>
            <div className="nav-wrapper  blue accent-2 z-depth-2"
            >
                <ul className="left hide-on-med-and-down"
                >
                    {
                        checkAuth() &&
                        <li className='ml1'><a href="/nets" style={{ fontSize: "2.3rem" }}>
                            <span className="material-icons mr1">border_clear</span>Сетки</a>
                        </li>
                    }
                    {checkAuth() &&
                        <li>
                            <a href="/todos" style={{ fontSize: "2.3rem" }}>
                                <span className="material-icons mr1">checklist</span>Заметки
                            </a>
                        </li>
                    }
                    {checkAuth() &&
                        <li>
                            <a href="/offers" style={{ fontSize: "2.3rem" }}>
                                <span className="material-icons mr1">description</span>ЮрДоговора
                            </a>
                        </li>
                    }
                    <li>
                        <a href="/sklad" style={{ fontSize: "2.3rem" }}>
                            <span className="material-icons mr1">next_week</span>Складские остатки
                        </a>
                    </li>
                    {checkAuth() &&
                        <li className='valign-wrapper mt1'>
                            <a href="/test" >
                                <MdBackupTable fontSize={40} color={'black'} />
                            </a>
                        </li>
                    }

                </ul>
                <Flex flexDir={'row'}
                    pt={4}
                    justifyContent={'flex-end'}
                    gap={3}
                >

                    <SettingsModal />
                    <Login />
                </Flex>
            </div>
        </nav>
    )
}

export default NavBar