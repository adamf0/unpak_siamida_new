import React from 'react';
import { classNames } from '@src/Utility';

const SidebarItemMenu = ({ title, icon, link, active }) => {
    return (
        <li>
            <a
                href={link}
                className={classNames('nav-link', active? ``:'collapsed')}
            >
                <i className={icon}></i>
                <span>{title}</span>
            </a>
        </li>
    );
};

export default SidebarItemMenu;
