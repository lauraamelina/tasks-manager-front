import React, { useEffect, useState } from 'react';
import { getAllTasksByUser } from '../../services/tasks/task.service';
import { getAllStates } from '../../services/states/state.service';
import { getUser } from '../../services/auth/auth.service';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import BarChartTasksByStatus from '../../components/home/BarChartTasksByStatus';
import LineChartTasksByDueDate from '../../components/home/LineChartTasksByDueDate';
import PieChartTasksByStatus from '../../components/home/PieChartTasksByStatus';
import RadarChartTasksByStatusAndDate from '../../components/home/RadarChartTasksByStatusAndDate';

const exampleTasks = [
    { id: 1, title: 'Task 1', status_id: 1, due_date: '2024-07-01' },
    { id: 2, title: 'Task 2', status_id: 2, due_date: '2024-07-02' },
    { id: 3, title: 'Task 3', status_id: 1, due_date: '2024-07-03' },
    { id: 4, title: 'Task 4', status_id: 3, due_date: '2024-07-04' },
];

export default function HomePage() {
    const [user] = useState(getUser());
    const [tasks, setTasks] = useState([]);
    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTask();
        //eslint-disable-next-line
    }, [user]);

    const getTask = async () => {
        try {
            setLoading(true);
            const [statesResponse, tasksResponse] = await Promise.all([
                getAllStates(),
                getAllTasksByUser(user?.id)
            ]);
            setStates(statesResponse.data);
            setTasks(tasksResponse.data.length ? tasksResponse.data : exampleTasks);
        } catch (error) {
            toast.error('Error al cargar el dashboard', {
                position: 'bottom-right',
                autoClose: 5000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className='dashboard container'>
            <h1>Task Manager</h1>
            <p className='fs-5'>Bienvenido {user?.name}</p>
            {tasks === exampleTasks &&
                <p>Dashboard de ejemplo, creá tus propias tareas para ver tus datos acá.</p>
            }
            {loading && <CircularProgress className='mt-5' />}
            {tasks.length !== 0 && !loading && (
                <div className='row'>
                    <div className='col-md-6 mb-3 mb-md-5'>
                        <BarChartTasksByStatus tasks={tasks} states={states} />
                    </div>
                    <div className='col-md-6 mb-3 mb-md-5'>
                        <LineChartTasksByDueDate tasks={tasks} />
                    </div>
                    <div className='col-md-6 mb-3 mb-md-5'>
                        <PieChartTasksByStatus tasks={tasks} states={states} />
                    </div>
                    <div className='col-md-6 mb-3 mb-md-5'>
                        <RadarChartTasksByStatusAndDate tasks={tasks} states={states} />
                    </div>
                </div>
            )}
        </main>
    );
}
