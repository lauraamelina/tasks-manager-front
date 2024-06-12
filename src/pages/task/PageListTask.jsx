import React, { useState, useEffect } from 'react';
import TodoList from '../../components/list/TodoList';
import * as taskService from '../../services/tasks/task.service';
import * as authService from '../../services/auth/auth.service';
import { CircularProgress } from '@mui/material';
import { getAllStates } from '../../services/states/state.service';
import { Link } from 'react-router-dom';
import { changeTaskStatus } from '../../services/tasks/task.service';

export default function PageListTask() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingTaskId, setLoadingTaskId] = useState(null); // Nuevo estado
    const [user] = useState(authService.getUser());
    const [states, setStates] = useState([]);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            getAllStates().then(res => setStates(res.data)),
            taskService.getAllTasksByUser(user?.id).then(res => setTasks(res.data))
        ]).then(() => setLoading(false));
        // eslint-disable-next-line
    }, []);

    const handleStatusChange = async (taskId, newStatus) => {
        setLoadingTaskId(taskId);
        try {
            await changeTaskStatus(taskId, newStatus);
            const updatedTasks = await taskService.getAllTasksByUser(user?.id);
            setTasks(updatedTasks.data);
        } catch (error) {
            console.error('Error changing task status:', error);
            // Maneja el error (e.g., muestra una notificación de error)
        } finally {
            setLoadingTaskId(null); // Resetea el estado de carga específica
        }
    };

    return (
        <main>
            <h1>Task Manager</h1>
            <h2 className='fs-5'>Lista de tareas</h2>
            {tasks.length === 0 && !loading &&
                (<div>
                    <p>No hay tareas</p>
                    <Link to={'/add'} className='btn btn-primary'>Agregar tarea</Link>
                </div>)
            }
            {loading ? <CircularProgress className='mt-5' /> :
                (<div className="card">
                    <TodoList
                        tasks={tasks}
                        states={states}
                        handleStatusChange={handleStatusChange}
                        loadingTaskId={loadingTaskId}
                    />
                </div>)
            }
        </main>
    );
}
