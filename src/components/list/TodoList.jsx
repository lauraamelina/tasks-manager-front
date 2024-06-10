import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';

export default function TodoList() {
    const [expandedId, setExpandedId] = useState(null);

    const handleExpand = (id) => {
        setExpandedId(id === expandedId ? null : id);
    };

    const tasks = [
        { task_id: 1, status_id: "Completed", task_name: "Buy groceries for next week", description: "Descripción de la tarea 1", due_date: "28th Jun 2020", created_at: "28th Jun 2020", user_id: 1 },
        { task_id: 2, status_id: "Active", task_name: "Renew car insurance", description: "Descripción de la tarea 2", due_date: "28th Jun 2020", created_at: "28th Jun 2020", user_id: 1 },
        { task_id: 3, status_id: "Active", task_name: "Sign up for online course", description: "Descripción de la tarea 3", due_date: "28th Jun 2020", created_at: "28th Jun 2020", user_id: 1 }
    ];

    return (
        <ul className="todo-list">
            {tasks.map(task => (
                <li className={`list-group-item ${expandedId === task.task_id ? 'expanded' : ''}`} onClick={() => handleExpand(task.task_id)} key={task.task_id}>
                    <div className="px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                        <p className="lead fw-normal mb-0">{task.task_name}</p>
                    </div>
                    <div className="d-flex flex-row justify-content-end align-items-center">
                        <a href="#!" className="text-primary" data-mdb-tooltip-init title="Edit todo">
                            <FontAwesomeIcon icon={faPencilAlt} className="me-3" />
                        </a>
                        <a href="#!" className="text-danger" data-mdb-tooltip-init title="Delete todo">
                            <FontAwesomeIcon icon={faTrashAlt} className="me-3" />
                        </a>
                    </div>
                    <div className="text-end text-muted">
                        {task.due_date && (
                            <div className="py-2 px-3 me-2 border border-warning rounded-3 d-flex align-items-center bg-body-tertiary">
                                <p className="small mb-0">
                                    <FontAwesomeIcon icon={faHourglassHalf} className="me-2 text-warning" />
                                    {task.due_date}
                                </p>
                            </div>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
}
