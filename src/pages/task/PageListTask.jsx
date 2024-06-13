import React, { useState, useEffect, useCallback } from 'react';
import TodoList from '../../components/list/TodoList';
import SearchFilter from '../../components/search/SearchFilter';
import * as taskService from '../../services/tasks/task.service';
import * as authService from '../../services/auth/auth.service';
import { CircularProgress } from '@mui/material';
import { getAllStates } from '../../services/states/state.service';
import { Link } from 'react-router-dom';
import { changeTaskStatus } from '../../services/tasks/task.service';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function PageListTask() {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingTaskId, setLoadingTaskId] = useState(null);
    const [user] = useState(authService.getUser());
    const [states, setStates] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortBy, setSortBy] = useState('due_date');

    const handleSearch = useCallback(({ searchTerm, selectedStatuses, sortOrder, sortBy }) => {
        let filtered = [...tasks];

        if (searchTerm) {
            filtered = filtered.filter(task =>
                task.task_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedStatuses && selectedStatuses.length > 0) {
            filtered = filtered.filter(task => selectedStatuses.includes(task.status_id));
        }

        filtered = filtered.sort((a, b) => {
            const dateA = new Date(a[sortBy]);
            const dateB = new Date(b[sortBy]);
            if (sortOrder === 'asc') {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });

        setFilteredTasks(filtered);
    }, [tasks]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [statesResponse, tasksResponse] = await Promise.all([
                    getAllStates(),
                    taskService.getAllTasksByUser(user?.id)
                ]);
                setStates(statesResponse.data);
                setTasks(tasksResponse.data);
                setFilteredTasks(tasksResponse.data);
            } catch (error) {
                toast.error(error.message, {
                    position: 'bottom-right',
                    autoClose: 5000,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    useEffect(() => {
        handleSearch({ searchTerm: '', selectedStatuses, sortOrder, sortBy });
    }, [tasks, selectedStatuses, sortOrder, sortBy, handleSearch]);

    const handleStatusChange = async (taskId, newStatus) => {
        setLoadingTaskId(taskId);
        try {
            await changeTaskStatus(taskId, newStatus);
            const updatedTasks = await taskService.getAllTasksByUser(user?.id);
            setTasks(updatedTasks.data);
            handleSearch({ searchTerm: '', selectedStatuses, sortOrder, sortBy });
        } catch (error) {
            toast.error(error.message, {
                position: 'bottom-right',
                autoClose: 5000,
            });
        } finally {
            setLoadingTaskId(null);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const response = await taskService.deleteTask(taskId);
            if (response.status === true) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Tarea borrada!',
                    confirmButtonColor: '#0f3460',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const updatedTasks = await taskService.getAllTasksByUser(user?.id);
                        setTasks(updatedTasks.data);
                        handleSearch({ searchTerm: '', selectedStatuses, sortOrder });
                    }
                });
            }
        } catch (error) {
            toast.error(error.message, {
                position: 'bottom-right',
                autoClose: 5000,
            });
        }
    };

    return (
        <main>
            <h1>Task Manager</h1>
            <h2 className='fs-5'>Lista de tareas</h2>

            {tasks.length === 0 && !loading &&
                (<div className='mt-5'>
                    <p className='h-4'>No hay tareas</p>
                    <Link to={'/add'} className='btn btn-primary text-decoration-none'>Agregar tarea</Link>
                </div>)
            }
            {loading && <CircularProgress className='mt-5' />}
            {tasks.length !== 0 && !loading &&
                (<>
                    <SearchFilter
                        states={states}
                        onSearch={handleSearch}
                        setSelectedStatuses={setSelectedStatuses}
                        setSortOrder={setSortOrder}
                        setSortBy={setSortBy}
                    />
                    <div className="card">
                        <TodoList
                            tasks={filteredTasks}
                            states={states}
                            handleStatusChange={handleStatusChange}
                            loadingTaskId={loadingTaskId}
                            handleDeleteTask={handleDeleteTask}
                        />
                    </div>
                </>
                )}
        </main>
    );
}
