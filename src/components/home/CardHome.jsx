import React from 'react'
import InputTask from '../../components/input/InputTask'
import TodoList from '../list/TodoList'


export default function CardHome() {
    return (
        <div className='card'>
            <InputTask />
            <h2>Lista de tareas</h2>
            <TodoList />

        </div>
    )
}