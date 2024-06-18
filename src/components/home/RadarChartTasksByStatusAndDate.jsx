import React, { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import 'chart.js/auto';

export default function RadarChartTasksByStatusAndDate({ tasks, states }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (tasks && states) {
            const dates = [...new Set(tasks?.map(task => new Date(task.due_date).toLocaleDateString()))];

            const datasets = states?.map(state => ({
                label: state.name,
                data: dates?.map(date => tasks.filter(task =>
                    task.status_id === state.status_id && new Date(task.due_date).toLocaleDateString() === date
                ).length),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }));

            const chartData = {
                labels: dates,
                datasets: datasets,
            };

            setData(chartData);
        }
    }, [tasks, states]);
    if (!data) return null;

    return <Radar data={data} />;
};

