import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/auth/auth.service'
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export default function PageRegister() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (username && password && name) {
            try {
                const result = await authService.register({ email: username, password, name });
                console.log(result)
                Swal.fire({
                    title: "Bienvenido ",
                    text: "Registro correcto",
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
                <h2>Registro</h2>
                <form onSubmit={handleSubmit} className='card'>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <label htmlFor="floatingInput">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="name" className="form-control" id="floatingname" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} required />
                        <label htmlFor="floatingname">Nombre</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <label htmlFor="floatingPassword">Contraseña</label>
                    </div>
                    {loading ?
                        <button className="btn btn-primary my-3"><CircularProgress /></button>
                        :
                        <button type="submit" className="btn btn-primary my-3">Registrarme</button>
                    }
                    <Link to={'/login'} className='btn btn-secondary mb-3 text-decoration-none'>Iniciar Sesión</Link>
                </form>
            </div>
        </main>
    );
}