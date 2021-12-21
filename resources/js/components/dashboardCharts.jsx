import React from "react";

import BarChart from "../components/Charts/BarChart";
import PieChart from "../components/Charts/PieChart";
import LineChart from "./Charts/LineChart";

const axios = require('axios').default;

class dashboardCharts extends React.Component {
    state = {
        dataSet1: {
            data: "",
            labels: ""
        },
        dataSet2: {
            data: "",
            labels: ""
        },
    }

    async getChartData(){
        
        const {data} = await axios.post('/get-courses');
        
        var percentageArray = [];
        var labels = [];
        
        for(let i = 0; i < data.length; i++){
            const res = await axios.post("/get-course-attendence", {id: data[i].id});

            labels.push(data[i].name);
            percentageArray.push(res.data);
        }

        const lessons = await axios.post('/previous-lessons');

        var percentageArray2 = [];
        var labels2 = [];

        for(let j = 0; j < lessons.data.lessons.length; j++){
            const latePercentage = await axios.post('/get-late-percentage', {id: lessons.data.lessons[j].id});
    
            percentageArray2.push(latePercentage.data);
            labels2.push(lessons.data.lessons[j].name);
        }

        this.setState({ dataSet1: {data: percentageArray,
                                    labels: labels}});

        this.setState({ dataSet2: {data: percentageArray2,
                                    labels: labels2}})
                                    
    }

    componentDidMount(){
        this.getChartData();
    }

    render(){

        const {dataSet1, dataSet2} = this.state;
        
        if(dataSet1.data == ""){
            return <h1>test</h1>
        }else{
            return (
                <div className="chart">
                    <BarChart dataSet={dataSet1} name="percentage aanwezig per les"/>
                    <BarChart dataSet={dataSet2} name="percentage te laat per les"/>
                </div>
            );
        }
    }
}

export default dashboardCharts ;