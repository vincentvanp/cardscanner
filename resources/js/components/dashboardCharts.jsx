import React from "react";

import PieChart from "../components/Charts/PieChart";

const axios = require('axios').default;

class dashboardCharts extends React.Component {
    state = {
        dataSet: {
            data: "",
            labels: ""
        },
    }

    async getChartData(){
        const res = await axios.get("https://api.coincap.io/v2/assets/?limit=5");
        const datas = res.data.data;

        this.setState({ dataSet: {data: datas.map((data) => (data.priceUsd)),
                        labels: datas.map((data) => (data.name))}})    
    }

    componentDidMount(){
        this.getChartData();
    }

    render(){

        const {dataSet} = this.state;

        if(dataSet.data == ""){
            return <h1>test</h1>
        }else{
            return (
                <div className="chart">
                    <PieChart dataSet={dataSet}/>
                </div>
            );
        }
    }
}

export default dashboardCharts ;