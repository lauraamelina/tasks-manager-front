import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as taskService from '../../services/tasks/task.service'
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import CardTaskById from "../../components/task/CardTaskById";

export default function PageTaskById() {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await taskService.getTaskById(id);
                setTask(response.data[0]);
            } catch (error) {
                toast.error(error.message, {
                    position: 'bottom-right',
                    autoClose: 5000,
                });
                setTask(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleSave = async (updatedTask) => {
        try {
            await taskService.updateTask(id, updatedTask);
            toast.success('Tarea actualizada correctamente', {
                position: 'bottom-right',
                autoClose: 5000,
            });
            setTask(updatedTask);
        } catch (error) {
            toast.error('Error al actualizar la tarea', {
                position: 'bottom-right',
                autoClose: 5000,
            });
        }
    };

    return (
        <main>
            <h1>Task Manager</h1>
            <h2 className="fs-5">Editar tarea</h2>
            {!task && !loading && (
                <div className='mt-5'>
                    <p className='h-4'>No se encontró la tarea</p>
                    <Link to={'/add'} className='btn btn-primary text-decoration-none'>Agregar tarea</Link>
                </div>
            )}
            {loading && <CircularProgress className='mt-5' />}
            {task && !loading && (
                <CardTaskById task={task} onSave={handleSave} />
            )}
        </main>
    );
}
