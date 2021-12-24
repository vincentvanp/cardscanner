import React from "react";

import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'

const LineChart = (props) =>{

    var datasets = []
    var labels = [];
    var Colors = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ];

    for(let i = 0; i < props.dataSet.data.length; i++){

        datasets.push({
            label: props.dataSet.data[i].name,
            data: props.dataSet.courses[i],
            borderColor: Colors[i],
            backgroundColor: Colors[i],
        });

        labels.push("les " + i);
    }

    var data = {   
        labels: labels,
        datasets: datasets
    };
    
    return(
        <div className="chart--linechart">
            <h3>% studenten te laat per les</h3>
            <Line data={data} width={10} height={8}/>
        </div>
    );
}

export default LineChart;