import React, { useState, useEffect } from 'react'
import TodoList from '../../components/list/TodoList'
import * as taskService from '../../services/tasks/task.service'
import * as authService from '../../services/auth/auth.service'
import { CircularProgress } from '@mui/material'
import { getAllStates } from '../../services/states/state.service'

export default function PageListTask() {
    const [task, setTask] = useState([])
    const [loading, setLoading] = useState(true)
    const [user] = useState(authService.getUser())
    const [states, setStates] = useState([])

    useEffect(() => {
        setLoading(true)
        getAllStates()
            .then(res => setStates(res.data))
        taskService.getAllTasksByUser(user?.id)
            .then(res => setTask(res.data))
        setLoading(false)
        // eslint-disable-next-line
    }, [])


    useEffect(() => {
        console.log(loading)
    }, [loading])

    return (
        <main>
            <h1>Task Manager</h1>
            <h2 className='fs-5'>Lista de tareas</h2>
            <div className="card">
                {loading ? <CircularProgress /> : <TodoList tasks={task} states={states} />}
                {task.length === 0 && <p>No hay tareas</p>}

            </div>
        </main>
    )
}