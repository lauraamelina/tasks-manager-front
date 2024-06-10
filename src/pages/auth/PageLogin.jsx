import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/auth/auth.service'
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';

export default function PageLogin({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        setLoading(true)
        if (username && password) {
            try {
                const result = await authService.login(username, password);
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
                setError(error.message);
            }
        } else {
            setError('Invalid username or password');
        }
        setLoading(false)
    };

    return (
        <main className="login-container">
            <div className="login-box">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit} className='card'>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <label htmlFor="floatingInput">Email</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <label htmlFor="floatingPassword">Contraseña</label>
                    </div>
                    {error &&
                        <div className="alert alert-danger mt-3" role="alert">
                            {error}
                        </div>
                    }
                    {loading ?
                        <button className="btn btn-primary my-3"><CircularProgress /></button>
                        :
                        <button type="submit" className="btn btn-primary my-3">Ingresar</button>
                    }
                    <Link to={'/register'} className='btn btn-secondary mb-3 text-decoration-none'>Registrarme</Link>
                </form>
            </div>
        </main>
    );
}