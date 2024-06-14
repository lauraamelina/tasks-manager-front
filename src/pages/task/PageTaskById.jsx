import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as taskService from '../../services/tasks/task.service'
import { toast } from "react-toastify";

export default function PageTaskById() {
    const [task, setTask] = useState([])
    const [loading, setLoading] = useState([])
    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const taskResponse = await Promise.all([
                    taskService.getTaskById(id)
                ]);
                setTask(taskResponse.data);
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
    }, [id]);

    console.log(id)
    return (
        <main>
            <h1>Task Manager</h1>


        </main>
    )
}