import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CardTaskById({ task, onSave }) {
    const [editedTask, setEditedTask] = useState(task);
    const [isEdited, setIsEdited] = useState(false);

    useEffect(() => {
        setEditedTask({
            ...task,
            due_date: task.due_date ? task.due_date.split('T')[0] : ''
        });
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask(prevTask => ({
            ...prevTask,
            [name]: value,
        }));
        setIsEdited(true);
    };

    const handleSave = () => {
        onSave(editedTask);
        setIsEdited(false);
    };

    return (
        <div className="card">
            <div className="card-body">
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="taskName"
                        name="task_name"
                        value={editedTask.task_name}
                        onChange={handleChange}
                    />
                    <label htmlFor="taskName">Nombre</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea
                        style={{ height: '100px' }}
                        className="form-control"
                        id="description"
                        name="description"
                        value={editedTask.description}
                        onChange={handleChange}>
                    </textarea>
                    <label htmlFor="description">Descripción</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="date"
                        className="form-control"
                        id="dueDate"
                        name="due_date"
                        value={editedTask.due_date}
                        onChange={handleChange}
                    />
                    <label htmlFor="dueDate">Fecha de vencimiento</label>
                </div>
                <Link className="btn btn-secondary" to={'/list'} >
                    Volver
                </Link>
                <button
                    className="btn btn-primary ms-3"
                    onClick={handleSave}
                    disabled={!isEdited}
                >
                    Guardar cambios
                </button>
            </div>
        </div>
    );
}
