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
        lateData: []
    }

    async getChartData(){
        
        const {data} = await axios.post('/get-courses');
        var courses = [];

        var attendanceArray = [];
        
        for(let i = 0; i < data.length; i++){
            const res = await axios.post("/get-course-attendence", {id: data[i].id});

            courses.push([data[i].name]);

            attendanceArray.push([data[i].name, [res.data, 100 - res.data]]);
        }

        const lessons = await axios.post('/previous-lessons');

        var lateStudentsArray = [];
        
        for(let i = 0; i < lessons.data.lessons.length; i++){
            const latePercentage = await axios.post('/get-late-percentage', {id: lessons.data.lessons[i].id});

            lateStudentsArray.push([lessons.data.lessons[i].course_id, latePercentage.data]);
        }

        for(let i = 0; i < lateStudentsArray.length; i++){
            for(let j = 0; j < courses.length; j++){

                if(data[j].id == lateStudentsArray[i][0]){
                    courses[j].push(lateStudentsArray[i][1]);
                }
            }
        }

        for(let i = 0; i < courses.length; i++){
            courses[i].shift();
        }

        this.setState({ dataSet: attendanceArray});
        this.setState({ lateData: {courses, data}});
    }

    componentDidMount(){
        this.getChartData();
    }

    render(){

        const {lateData, dataSet} = this.state;
        
        if(dataSet.data == "" || lateData.data == undefined){
            return <h1>loading...</h1>
        }else{
            return (
                <div className="container--charts">
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
                    <div className="chart">
                        <LineChart dataSet={lateData}/>
                    </div>
                </div>
            );
        }
    }
}

export default dashboardCharts ;