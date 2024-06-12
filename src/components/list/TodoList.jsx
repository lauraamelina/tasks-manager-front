import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { CircularProgress } from '@mui/material';

export default function TodoList({ tasks, states, handleStatusChange, loadingTaskId }) {

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="todo-list-container container">
            {tasks?.map(task => (
                <div className="card mb-3" key={task.task_id}>
                    <div className="card-body row">
                        <div className='col-md-9'>
                            <h3 className="card-title fw-bold text-truncate" title={task.task_name}>
                                {task.task_name}
                            </h3>
                            <p className="card-text text-muted text-truncate" title={task.description}>
                                {task.description}
                            </p>
                            <span className='card-date'>Vencimiento: <span>{formatDate(task.due_date)}</span></span>
                        </div>
                        <div className="col-md-3">
                            <div>
                                <a href="#!" className="text-primary me-4 mt-auto" title="Edit todo">
                                    <FontAwesomeIcon icon={faPencilAlt} className="fa-lg" />
                                </a>
                                <a href="#!" className="text-danger mb-auto" title="Delete todo">
                                    <FontAwesomeIcon icon={faTrashAlt} className="fa-lg" />
                                </a>
                            </div>
                            <div className="d-flex align-items-center w-100 justify-content-center">
                                {loadingTaskId === task.task_id ? (
                                    <CircularProgress size={24} className="ms-auto" />
                                ) : (
                                    <select
                                        className="form-select "
                                        value={task.status_id}
                                        onChange={(e) => handleStatusChange(task.task_id, e.target.value)}
                                        disabled={loadingTaskId !== null}
                                    >
                                        {states.map(state => (
                                            <option key={state.status_id} value={state.status_id}>
                                                {state.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
