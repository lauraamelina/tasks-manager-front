import React, { useState, useEffect } from 'react'
import TodoList from '../../components/list/TodoList'
import * as taskService from '../../services/tasks/task.service'
import * as authService from '../../services/auth/auth.service'
import { CircularProgress } from '@mui/material'

export default function PageListTask() {
    const [task, setTask] = useState([])
    const [loading, setLoading] = useState(true)
    const [user] = useState(authService.getUser())

    useEffect(() => {
        setLoading(true)
        taskService.getAllTasksByUser(user?.id)
            .then(res => setTask(res))
        setLoading(false)
        // eslint-disable-next-line
    }, [])


    useEffect(() => {
        console.log(task)
    }, [task])

    return (
        <main>
            <h1>Task Manager</h1>
            <h2 className='fs-5'>Lista de tareas</h2>
            <div className="card">
                {loading && <CircularProgress />}
                <TodoList />
            </div>
        </main>
    )
}