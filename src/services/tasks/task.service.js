import * as authService from './auth.services';

const URL = 'https://tasks-manager-naoi.onrender.com/';

// Función para obtener todas las tareas
async function getAllTasks() {
    try {
        const response = await fetch(URL + 'task', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authService.getToken()}`,
                'Content-Type': 'application/json'
            }
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
        const response = await fetch(URL + 'task', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authService.getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
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
        const response = await fetch(URL + `task/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authService.getToken()}`,
                'Content-Type': 'application/json'
            }
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
        const response = await fetch(URL + `task/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${authService.getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTaskData)
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
        const response = await fetch(URL + `task/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authService.getToken()}`,
                'Content-Type': 'application/json'
            }
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
        const response = await fetch(URL + `task/status/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${authService.getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
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
    changeTaskStatus
};
