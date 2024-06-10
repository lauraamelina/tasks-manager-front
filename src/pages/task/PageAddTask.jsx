import React from 'react'
import InputTask from '../../components/input/InputTask'

export default function PageAddTask() {
    return (
        <main>
            <h1>Task Manager</h1>
            <h2 className='fs-5'>Agregar nueva tarea</h2>
            <div className="card">
                <InputTask />
            </div>
        </main>
    )
}