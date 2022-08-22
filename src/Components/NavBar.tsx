import React, { FC } from 'react'

type NavBarProps = {
    children?: React.ReactNode
}

const NavBar: FC<NavBarProps> = () => {
    return (
        <nav>
            <div className="nav-wrapper  blue accent-2 z-depth-2"
            >
                <ul className="left hide-on-med-and-down"
                >
                    <li className='ml1'><a href="/nets" style={{ fontSize: "2.3rem" }}><span className="material-icons mr1">border_clear</span>Сетки</a> </li>
                    <li><a href="/todos" style={{ fontSize: "2.3rem" }}><span className="material-icons mr1">checklist</span>Заметки</a></li>
                </ul>
                <div className="right">
                    <h5 style={{ marginRight: "2rem" }}>Сетки да Заметки</h5>
                </div>
            </div>
        </nav>
    )
}

export default NavBar