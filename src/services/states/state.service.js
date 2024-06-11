import * as authService from '../auth/auth.service';

const URL = 'https://tasks-manager-naoi.onrender.com/';

// Función para realizar una solicitud con autenticación
async function fetchWithAuth(url, options = {}) {
    const token = authService.getToken();
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 403) {
        authService.logout();
        window.location.href = '/login';
        throw new Error('Token expired');
    }

    return response;
}

// Función para obtener todos los estaods
async function getAllStates() {
    try {
        const response = await fetchWithAuth(URL + 'status', {
            method: 'GET',
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al obtener los estados');
        }
    } catch (error) {
        console.error('Hubo un problema:', error);
        throw error;
    }
}

// Función para obtener todos los estados por el id
async function getStatesById(id) {
    try {
        const response = await fetchWithAuth(`${URL}status/${id}`, {
            method: 'GET',
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al obtener el estado');
        }
    } catch (error) {
        console.error('Hubo un problema:', error);
        throw error;
    }
}


export {
    getAllStates,
    getStatesById
};
