import React, { useEffect, useState } from 'react'
import InputTask from '../../components/input/InputTask'
import { getAllStates } from '../../services/states/state.service'
import { createTask } from '../../services/tasks/task.service'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function PageAddTask() {
    const navigate = useNavigate()
    const [states, setStates] = useState([])

    useEffect(() => {
        getAllStates()
            .then(res => setStates(res.data))
    }, [])

    const handleAddTask = async (task) => {
        try {
            const response = await createTask(task);
            if (response.status === true) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Tarea creada exitosamente!',
                    showCancelButton: true,
                    confirmButtonColor: '#0f3460',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Crear otra nueva tarea',
                    cancelButtonText: 'Ir a tareas',
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.close();
                    } else {
                        navigate('/list')
                    }
                });
            }
        } catch (error) {
            toast.error(error.message, {
                position: 'bottom-right',
                autoClose: 5000,
            });
        }
    };

    return (
        <main>
            <h1>Task Manager</h1>
            <h2 className='fs-5'>Agregar nueva tarea</h2>
            <div className="card">
                <InputTask states={states} handleAddTask={handleAddTask} />
            </div>
        </main>
    )
}