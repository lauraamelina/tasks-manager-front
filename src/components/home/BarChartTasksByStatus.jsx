import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export default function BarChartTasksByStatus({ tasks, states }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (tasks && states) {
            const taskCounts = states.map(state => ({
                state: state.name,
                count: tasks.filter(task => task.status_id === state.status_id).length
            }));

            const chartData = {
                labels: taskCounts.map(task => task.state),
                datasets: [{
                    label: 'Cantidad de tareas',
                    data: taskCounts.map(task => task.count),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                }]
            };

            setData(chartData);
        }
    }, [tasks, states]);

    if (!data) return null;

    return <Bar data={data} />;
}
