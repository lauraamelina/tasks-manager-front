import * as authService from '../auth/auth.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = 'https://tasks-manager-naoi.onrender.com/';

// Función para realizar una solicitud con autenticación
async function fetchWithAuth(url, options = {}) {
    const token = authService.getToken();
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
    };

    try {
        const response = await fetch(url, { ...options, headers });

        if (response.status === 403) {
            authService.logout();
            toast.error('Inicio de sesión vencido. Por favor, inicie sesión nuevamente.', {
                position: 'bottom-right',
                autoClose: 5000,
            });
            setTimeout(() => {
                window.location.href = '/login';
            }, 1000);
        }

        return response;
    } catch (error) {
        toast.error('Inicio de sesión vencido. Por favor, inicie sesión nuevamente.', {
            position: 'bottom-right',
            autoClose: 5000,
        });
    }
}

// Función para obtener todos los estaods
async function getAllStates() {
    try {
        const response = await fetchWithAuth(URL + 'status', {
            method: 'GET',
        });

        if (response.ok) {
            return response.json();
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
