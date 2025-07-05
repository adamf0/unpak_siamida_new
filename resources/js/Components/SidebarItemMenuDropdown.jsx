import React, { useRef, useEffect, useState } from 'react';
import { classNames } from '@src/Utility';

const SidebarItemMenuDropdown = ({ title, icon, active, children }) => {
    const [open, setOpen] = useState(active);

    return (
        <li className="nav-item">
            <a
                href="#"
                className={classNames("nav-link", open? "":"collapsed")}
                onClick={()=>setOpen(!open)}
            >
                <i className={icon}></i>
                <span>{title}</span>
                <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
                className={"nav-content"}
            >
                {open && children}
            </ul>
        </li>
    );
};

export default SidebarItemMenuDropdown;
