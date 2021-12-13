import axios from 'axios';
import React, { Component } from 'react';
import { Table } from 'antd';
import { useParams } from "react-router-dom";

class PreviousLessonDetailView extends React.Component{

    state = {
        students: [],
        lesson_id: 0
    };

    async GetLessonData(){

        const students = await axios.post('/get-attending-students', {lesson_id: 1});

        this.setState({ students: students.data});
    }

    componentDidMount(){
        this.GetLessonData();
    }

    columns = [
        {
            title: 'Student Name',
            dataIndex: 'name',
            key: 'studentName',
        },
        {
            title: 'Student Id',
            dataIndex: 'serial',
            key: 'studentId',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        }
    ]

    render(){

        const {students} = this.state;

        if(students != undefined){
            return(
                <React.Fragment>
                    <Table dataSource={students} columns={this.columns} scroll={{ y: 500 }} pagination={false}/>
                </React.Fragment>
            );
        }else{
            return <h1>loading...</h1>
        }
    }

}

export default PreviousLessonDetailView;