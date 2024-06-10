import React from 'react'
import TodoList from '../../components/list/TodoList'

export default function PageListTask() {
    return (
        <main>
            <h1>Task Manager</h1>
            <h2 className='fs-5'>Lista de tareas</h2>
            <div className="card">
                <TodoList />
            </div>
        </main>
    )
}