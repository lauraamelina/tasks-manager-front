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


// Función para obtener todas las tareas
async function getAllTasks() {
    try {
        const response = await fetchWithAuth(URL + 'task', {
            method: 'GET',
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al obtener las tareas');
        }
    } catch (error) {
        console.error('Hubo un problema:', error);
        throw error;
    }
}

// Función para obtener todas las tareas por el user_id
async function getAllTasksByUser(idUser) {
    try {
        const response = await fetchWithAuth(`${URL}task/user/${idUser}`, {
            method: 'GET',
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al obtener las tareas');
        }
    } catch (error) {
        console.error('Hubo un problema:', error);
        throw error;
    }
}

// Función para crear una nueva tarea
async function createTask(taskData) {
    try {
        const response = await fetchWithAuth(URL + 'task', {
            method: 'POST',
            body: JSON.stringify(taskData),
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al crear la tarea');
        }
    } catch (error) {
        console.error('Hubo un problema:', error);
        throw error;
    }
}

// Función para obtener una tarea por su ID
async function getTaskById(id) {
    try {
        const response = await fetchWithAuth(URL + `task/${id}`, {
            method: 'GET',
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al obtener la tarea');
        }
    } catch (error) {
        console.error('Hubo un problema:', error);
        throw error;
    }
}

// Función para actualizar la información de una tarea
async function updateTask(id, updatedTaskData) {
    try {
        const response = await fetchWithAuth(URL + `task/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedTaskData),
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al actualizar la tarea');
        }
    } catch (error) {
        console.error('Hubo un problema:', error);
        throw error;
    }
}

// Función para eliminar una tarea
async function deleteTask(id) {
    try {
        const response = await fetchWithAuth(URL + `task/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al eliminar la tarea');
        }
    } catch (error) {
        console.error('Hubo un problema:', error);
        throw error;
    }
}

// Función para cambiar el estado de una tarea
async function changeTaskStatus(id, newStatus) {
    try {
        const response = await fetchWithAuth(URL + `task/status/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ status_id: newStatus }),
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al cambiar el estado de la tarea');
        }
    } catch (error) {
        console.error('Hubo un problema:', error);
        throw error;
    }
}

export {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    changeTaskStatus,
    getAllTasksByUser,
};
