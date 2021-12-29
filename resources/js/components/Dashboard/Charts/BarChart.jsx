import React from "react";

import { Bar } from 'react-chartjs-2';

const BarChart = (props) =>{

    return(
        <Bar 
            data={{
                labels: props.dataSet.labels,
                datasets: [
                {
                    label: props.name,
                    data: props.dataSet.data[0],
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                    ],
                    barPercentage: 0.7,
                },
                {
                    label: props.name,
                    data: props.dataSet.data[1],
                    backgroundColor: [
                        'rgba(54, 162, 235, 1)',
                    ],
                    barPercentage: 0.8,
                }],
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            }}
        />
    );
}

export default BarChart;