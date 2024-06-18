import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export default function AreaChartTasksByDueDate({ tasks }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (tasks && tasks.length > 0) {
            const taskCounts = tasks.reduce((acc, task) => {
                const dueDate = new Date(task.due_date).toLocaleDateString();
                acc[dueDate] = (acc[dueDate] || 0) + 1;
                return acc;
            }, {});

            const chartData = {
                labels: Object.keys(taskCounts),
                datasets: [{
                    label: 'Cantidad de tareas',
                    data: Object.values(taskCounts),
                    fill: true, // Cambia a fill para un área sombreada
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fondo con transparencia
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                }]
            };

            setData(chartData);
        }
    }, [tasks]);

    if (!data) return null;

    return <Line data={data} />;
};
