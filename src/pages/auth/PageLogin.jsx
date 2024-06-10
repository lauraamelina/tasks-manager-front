import React, { useState } from 'react'

export default function PageLogin({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'user' && password === 'password') {
            onLogin();
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <main className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className='card'>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="btn">Login</button>
                </form>
            </div>
        </main>
    );
}