import React from "react";

import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

const BarChart = (props) =>{

    return(
        <Bar 
            data={{
                labels: props.dataSet.labels,
                datasets: [{
                    label: props.name,
                    data: props.dataSet.data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                }]
            }}
        />
    );
}

export default BarChart;