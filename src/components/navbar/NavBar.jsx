import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHouse, faListUl, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';
import { Link } from 'react-router-dom';

export default function NavBar() {
    const [activeIndex, setActiveIndex] = useState(0);

    const menuItems = [
        { icon: faHouse, tooltip: 'Inicio', to: '/' },
        { icon: faPlus, tooltip: 'Agregar Tarea', to: '/add' },
        { icon: faListUl, tooltip: 'Lista de Tareas', to: '/list' },
        { icon: faUser, tooltip: 'Perfil', to: '/perfil' },
        { icon: faRightFromBracket, tooltip: 'Cerrar Sesión', to: '/' },
    ];

    return (
        <nav className="sidebar-navigation">
            <ul>
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className={index === activeIndex ? 'active' : ''}
                        onClick={() => setActiveIndex(index)}
                    >
                        <Link to={item.to}>
                            <FontAwesomeIcon icon={item.icon} />
                            <span className="tooltip">{item.tooltip}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
