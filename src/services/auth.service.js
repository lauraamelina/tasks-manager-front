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
        if (res.status === 200) {
            res.json()
        } else {
            throw new Error('Error de autenticación: la cuenta ya existe')
        }
    })
}

export {
    login,
    register
}