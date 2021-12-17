import React, { useState, useEffect } from "react"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Chart } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
const axios = require('axios').default;

class dashboardCharts extends React.Component {
    state = {
        charData: ""
    }

    async getChartData(){
        const res = await axios.get("https://api.coincap.io/v2/assets/?limit=5");
        const datas = res.data.data;

        this.setState({ charData: {
                            labels: datas.map(data => data.name),
                            datasets: [
                                {
                                label: "Price in USD",
                                data: datas.map(data => data.priceUsd),
                                backgroundColor: [
                                    "#ffbb11",
                                    "#ecf0f1",
                                    "#50AF95",
                                    "#f3ba2f",
                                    "#2a71d0"
                                ]
                                }
                            ]
                        }})
    }

    componentDidMount(){
        this.getChartData();
    }

    render(){

        const {charData} = this.state;
        
        console.log(charData);

        if(charData == ""){
            return <h1>test</h1>
        }else{
            return (
                <div className="App">
                    <div>
                        {/* {charData.labels.map((data) => (
                            <h1>{data}</h1>
                        ))} */}
                        <Chart
                            data={charData}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "Cryptocurrency prices"
                                    },
                                    legend: {
                                        display: true,
                                        position: "bottom"
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            );
        }
    }
}

export default dashboardCharts ;