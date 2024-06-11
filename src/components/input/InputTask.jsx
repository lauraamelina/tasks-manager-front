import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getUser } from '../../services/auth/auth.service';

export default function InputTask({ states, handleAddTask }) {
    const [task_name, setTaskName] = useState('');
    const [user_id] = useState(getUser().id);
    const [description, setDescription] = useState('');
    const [minDate, setMinDate] = useState('');
    const [due_date, setDueDate] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('1');
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const currentDate = `${yyyy}-${mm}-${dd}`;
        setMinDate(currentDate);
        setDueDate(currentDate);
    }, []);

    useEffect(() => {
        if (minDate !== '') {
            setDueDate(minDate);
        }
    }, [minDate]);

    const handleDateChange = (e) => {
        setDueDate(e.target.value);
    };

    const handleCreate = () => {
        setError('')
        if (!task_name) {
            setError('Completar el nombre de la tarea')

        } else {
            const newTask = {
                user_id: user_id,
                task_name: task_name,
                description: description,
                due_date: due_date,
                status_id: selectedStatus
            };
            handleAddTask(newTask);
            setDescription('')
            setTaskName('')
            setSelectedStatus('1')
        }

    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`input-task ${isLoaded ? 'loaded' : ''}`}>

            <div className="top-section">
                <input type="text" className="form-control" placeholder="Agregar tarea..." value={task_name} onChange={(e) => setTaskName(e.target.value)} required />
                <button className="btn btn-primary" onClick={handleCreate}>
                    <FontAwesomeIcon icon={faPlus} title="Agregar tarea" />
                </button>
            </div>
            <div className="bottom-section">
                <div className="form-floating w-100">
                    <input
                        id='date'
                        type="date"
                        min={minDate}
                        className="form-control"
                        value={due_date}
                        onChange={handleDateChange}
                    />
                    <label htmlFor="date">Fecha de vencimiento</label>
                </div>
                <div className="form-floating w-100">
                    <select className="form-select" id="status" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                        {states.map(state => (
                            <option key={state.status_id} value={state.status_id}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="status">Estado</label>
                </div>
                <div className="form-floating w-100">
                    <textarea className="form-control" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    <label htmlFor="description">Descripción</label>
                </div>

            </div>
            {error &&
                <div className="alert alert-danger alert-fixed" role="alert">{error}</div>
            }
        </div>
    );
}
