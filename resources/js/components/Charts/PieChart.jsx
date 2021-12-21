import React from "react";

import { Chart as ChartJS } from 'chart.js/auto'
import { Pie } from 'react-chartjs-2'

const PieChart = (dataSet) =>{
    return(
        <Pie 
            data={{
                labels: dataSet.dataSet.labels,
                datasets: [{
                    label: 'aantal aanwezige leerlingen',
                    data: dataSet.dataSet.data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            }}
            width={50}
            height={50}
        />
    );
}

export default PieChart;