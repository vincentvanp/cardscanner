import React from "react";

import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'

const LineChart = (props) =>{

    var datasets = []
    var labels = [];

    console.log(props);

    for(let i = 0; i < props.dataSet.length; i++){
        datasets.push({
            label: props.dataSet.data[i].name,
            data: props.dataSet.courses[i],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 1)',
        });

        labels.push(props.dataSet.data[i].name);
    }

    console.log(labels);
    console.log(datasets);

    var data = {   
        labels: labels,
        datasets: datasets
    };
    
    return(
        <div>
            <Line data={data} />
        </div>
    );
}

export default LineChart;