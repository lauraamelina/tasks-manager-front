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

export {
    login
}