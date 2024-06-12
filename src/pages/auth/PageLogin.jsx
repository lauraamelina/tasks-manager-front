import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/auth/auth.service'
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export default function PageLogin({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (email && password) {
            try {
                const result = await authService.login(email, password);
                onLogin(result);
                Swal.fire({
                    title: "Bienvenido",
                    text: "Inicio de sesión correcto",
                    icon: "success",
                    confirmButtonColor: "#0f3460",
                    willClose: () => {
                        navigate('/');
                    }
                });
            } catch (error) {
                toast.error(error.message, {
                    position: 'bottom-right',
                    autoClose: 5000,
                });
            }
        }
        setLoading(false)
    };

    return (
        <main className="login-container">
            <div className="login-box">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit} className='card'>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label htmlFor="floatingInput">Email</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <label htmlFor="floatingPassword">Contraseña</label>
                    </div>
                    {loading ?
                        <button className="btn btn-primary my-3"><CircularProgress /></button>
                        :
                        <button type="submit" className="btn btn-primary my-3">Ingresar</button>
                    }
                    <Link to={'/registro'} className='btn btn-secondary mb-3 text-decoration-none'>Registrarme</Link>
                </form>
            </div>
        </main>
    );
}