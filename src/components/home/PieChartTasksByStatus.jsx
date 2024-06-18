import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

export default function PieChartTasksByStatus({ tasks, states }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (tasks && states) {
            const taskCounts = states?.map(state => ({
                state: state.name,
                count: tasks.filter(task => task.status_id === state.status_id).length
            }));

            const chartData = {
                labels: taskCounts?.map(task => task.state),
                datasets: [{
                    label: 'Cantidad de Tareas',
                    data: taskCounts?.map(task => task.count),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1,
                }]
            };

            setData(chartData);
        }
    }, [tasks, states]);
    if (!data) return null;
    return <Pie data={data} />;
};

