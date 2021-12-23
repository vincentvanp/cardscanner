import React from "react";
import { List } from 'antd';

import BarChart from "../components/Charts/BarChart";
import PieChart from "../components/Charts/PieChart";
import LineChart from "./Charts/LineChart";

const axios = require('axios').default;

class dashboardCharts extends React.Component {
    state = {
        dataSet: {
            data: "",
            labels: ""
        },
    }

    async getChartData(){
        
        const {data} = await axios.post('/get-courses');
        
        var attendanceArray = [];
        
        for(let i = 0; i < data.length; i++){
            const res = await axios.post("/get-course-attendence", {id: data[i].id});

            attendanceArray.push([data[i].name, [res.data, 100 - res.data]]);
        }

        // const lessons = await axios.post('/previous-lessons');

        // var percentageArray2 = [];
        // var array = [];
        // var count = [];
        
        // for(let i = 0; i < lessons.data.lessons.length; i++){
        //     const latePercentage = await axios.post('/get-late-percentage', {id: lessons.data.lessons[i].id});
            
        //     if(array[lessons.data.lessons[i].course_id - 1] == undefined){
        //         count[lessons.data.lessons[i].course_id - 1] = 1;
        //         array[lessons.data.lessons[i].course_id - 1] = latePercentage.data;
        //     }else{
        //         count[lessons.data.lessons[i].course_id - 1] += 1;
        //         array[lessons.data.lessons[i].course_id - 1] += latePercentage.data;
        //     }
        // }
        
        // for(let i = 0; i < array.length; i++){

        //     var avgPercentage = array[i]/count[i];
        //     percentageArray2.push(avgPercentage);
        // }

        // const chartData = {0: attendanceArray, 1: percentageArray2}

        this.setState({ dataSet: attendanceArray});
                                    
    }

    componentDidMount(){
        this.getChartData();
    }

    render(){

        const {dataSet} = this.state;

        console.log(dataSet);

        if(dataSet.data == ""){
            return <h1>test</h1>
        }else{
            return (
                <div className="List--courses">
                    <List
                        className="list--chart"
                        pagination={{
                            pageSize: 1,
                        }}
                        header={<h3 style={{margin: 0}} >Vakken</h3>}
                        bordered
                        dataSource={dataSet}
                        renderItem={item => (
                            <List.Item>
                                <PieChart dataSet={item}/>
                            </List.Item>
                        )}
                    />
                </div>
            );
        }
    }
}

export default dashboardCharts ;