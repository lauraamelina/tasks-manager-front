const URL = 'https://tasks-manager-naoi.onrender.com/'

async function login(email, password) {
    return fetch(URL + 'users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    }).then(async res => {
        if (res.status === 200) {
            return res.json()
        } throw new Error('Error de autenticación: el correo o la contraseña son incorrectas')
    })
}

async function register(user) {
    return fetch(URL + 'users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(res => {
        if (res.status === 201) {
            res.json()
        } else {
            throw new Error('Error de autenticación: la cuenta ya existe')
        }
    })
}

function getToken() {
    return localStorage.getItem('token')
}


function setToken(token) {
    const tokenExpiration = new Date().getTime() + (60 * 60 * 1000);
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', tokenExpiration);
}

function getUser() {
    return JSON.parse(localStorage.getItem('user'))
}

function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
}

function deleteUser() {
    localStorage.removeItem('user')
}

function deleteToken() {
    localStorage.removeItem('token')
}

function isAuth() {
    if (getToken() && getUser()) {
        return true
    }
}

function logout() {
    deleteUser()
    deleteToken()
}

function isTokenExpired() {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (!tokenExpiration) {
        return true;
    }
    return new Date().getTime() > tokenExpiration;
}



export {
    login,
    register,
    getToken,
    setToken,
    getUser,
    setUser,
    isAuth,
    logout,
    isTokenExpired
}