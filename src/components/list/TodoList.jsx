import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { changeTaskStatus } from '../../services/tasks/task.service';

export default function TodoList({ tasks, states }) {
    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await changeTaskStatus(taskId, newStatus);
            // Handle success (e.g., show a notification, update state)
        } catch (error) {
            console.error('Error changing task status:', error);
            // Handle error (e.g., show an error notification)
        }
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="todo-list-container container">
            {tasks?.map(task => (
                <div className="card mb-3" key={task.task_id}>
                    <div className="card-body row">
                        <div className='col-md-8'>
                            <h3 className="card-title fw-bold text-truncate" title={task.task_name}>
                                {task.task_name}
                            </h3>
                            <p className="card-text text-muted text-truncate" title={task.description}>
                                {task.description}
                            </p>
                            <span className='card-date'>{formatDate(task.due_date)}</span>
                        </div>
                        <div className="col-md-4">
                            <div>
                                <a href="#!" className="text-primary me-4 mt-auto" title="Edit todo">
                                    <FontAwesomeIcon icon={faPencilAlt} className="fa-lg" />
                                </a>
                                <a href="#!" className="text-danger mb-auto" title="Delete todo">
                                    <FontAwesomeIcon icon={faTrashAlt} className="fa-lg" />
                                </a>
                            </div>
                            <select
                                className="form-select"
                                value={task.status_id}
                                onChange={(e) => handleStatusChange(task.task_id, e.target.value)}
                            >
                                {states.map(state => (
                                    <option key={state.status_id} value={state.status_id}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>


                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
