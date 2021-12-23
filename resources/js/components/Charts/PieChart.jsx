import React from "react";

import { Pie } from 'react-chartjs-2'

const PieChart = (props) =>{
    return(
        <div>
            <Pie 
                data={{
                    labels: props.name,
                    datasets: [{
                        label: props.dataSet.labels,
                        data: props.dataSet,
                        backgroundColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 99, 132, 1)',
                        ],
                        borderWidth: 1
                    }]
                }}
            />
        </div>
    );
}

export default PieChart;