import React from 'react';
import './sidebar-item.css';

export default function SidebarItem({title , Icon , src}) {
    return (
        <div className="sidebar__item d__flex align__center">
            {src && <img className="sidebar__avatar" src={src} alt="Icon"/>}
            {Icon && <Icon className="sidebar__icon" />}
            <p className="sidebar__item_title">{title && title}</p>
        </div>
    )
}
