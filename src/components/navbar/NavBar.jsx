import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHouse, faListUl, faUser, faRightFromBracket, faUserPlus, } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth/auth.service';
import Swal from 'sweetalert2';

export default function NavBar({ authenticated, setAuthenticated }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate()

    const handleLogout = () => {
        logout();
        setAuthenticated(false)
        Swal.fire({
            title: "Sesión cerrada correctamente",
            text: "Tu sesión se ha cerrado correctamente. ¡Hasta pronto!",
            icon: "success",
            confirmButtonColor: "#0f3460",
            willClose: () => {
                navigate('/login');
            }
        });
    };

    const menuItems = authenticated ? [
        { icon: faHouse, tooltip: 'Inicio', to: '/' },
        { icon: faPlus, tooltip: 'Agregar Tarea', to: '/add' },
        { icon: faListUl, tooltip: 'Lista de Tareas', to: '/list' },
        { icon: faUser, tooltip: 'Perfil', to: '/perfil' },
        { icon: faRightFromBracket, tooltip: 'Cerrar Sesión', onClick: handleLogout },
    ] : [
        { icon: faHouse, tooltip: 'Inicio', to: '/' },
        { icon: faUser, tooltip: 'Iniciar Sesión', to: '/login' },
        { icon: faUserPlus, tooltip: 'Registrarse', to: '/registro' },
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
                        {item.onClick ? (
                            <Link onClick={item.onClick}>
                                <FontAwesomeIcon icon={item.icon} />
                                <span className="tooltip">{item.tooltip}</span>
                            </Link>
                        ) : (
                            <Link to={item.to}>
                                <FontAwesomeIcon icon={item.icon} />
                                <span className="tooltip">{item.tooltip}</span>
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};
