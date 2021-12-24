import React from "react";

import { Pie } from 'react-chartjs-2'

const PieChart = (props) =>{

    return(
        <div>
            <h1>{props.dataSet[0]}</h1>
            <Pie 
                data={{
                    labels: [props.dataSet[1][0] + "% aanwezig", props.dataSet[1][1] +"% afwezig"],
                    datasets: [{
                        label: props.dataSet[0],
                        data: props.dataSet[1],
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