import React, { FC } from 'react'

type NavBarProps = {
    children?: React.ReactNode
}

const NavBar: FC<NavBarProps> = () => {
    return (
        <nav>
            <div className="nav-wrapper">
                {/* <a href='/nets' className="brand-logo right">Сетки и Тудушка</a> */}
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li><a href="/nets">Сетки</a></li>
                    <li><a href="/todos">Заметки</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar