import React, { useEffect, useState } from 'react'
import { getAllTasksByUser } from '../../services/tasks/task.service'
import { getAllStates } from '../../services/states/state.service'
import { getUser } from '../../services/auth/auth.service'
import { toast } from 'react-toastify'
import { CircularProgress } from '@mui/material'

export default function HomePage() {
    const [user] = useState(getUser())
    const [tasks, setTasks] = useState([])
    const [states, setStates] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getTask()
        //eslint-disable-next-line
    }, [user])

    const getTask = async () => {
        try {
            setLoading(true);
            const [statesResponse, tasksResponse] = await Promise.all([
                getAllStates(),
                getAllTasksByUser(user?.id)
            ]);
            setStates(statesResponse.data);
            setTasks(tasksResponse.data);
        } catch (error) {
            toast.error('Error al cargar el dashboard', {
                position: 'bottom-right',
                autoClose: 5000,
            });
        } finally {
            setLoading(false);
        }


    }

    useEffect(() => {
        console.log(tasks)
    }, [tasks])

    return (
        <main>
            <h1>Task Manager</h1>
            <p>Bienvenido!</p>
            {loading && <CircularProgress className='mt-5' />}
        </main>
    )
}