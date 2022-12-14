import React, { FC } from 'react'
import { Text } from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { useAuth } from '../hooks/useAuth'
import { Login } from './Modal/Login'

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
                    {checkAuth() && <li>
                        <a href="/todos" style={{ fontSize: "2.3rem" }}>
                            <span className="material-icons mr1">checklist</span>Заметки
                        </a>
                    </li>
                    }
                    <li>
                        <a href="/sklad" style={{ fontSize: "2.3rem" }}>
                            <span className="material-icons mr1">next_week</span>Складские остатки
                        </a>
                    </li>
                    {checkAuth() &&
                        <li>
                            <a href="/test">
                                <PlusSquareIcon fontSize={'5xl'} background='grey' />
                            </a>
                        </li>
                    }
                </ul>
                <div className="right">
                    <Login />
                    {/* <Text fontSize={'4xl'} style={{ marginRight: "2rem" }}>Сетки да Заметки</Text> */}
                </div>
            </div>
        </nav>
    )
}

export default NavBar