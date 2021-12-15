import axios from 'axios';
import React, { Component } from 'react';
import { Table, Button } from 'antd';

class PreviousDetail extends React.Component{
    state = {
        present_students: [],
        absent_students: []
    };

    async GetLessonData(){
        
        const present_students = await axios.post('/get-attending-students', {lesson_id: this.props.lesson_id});
        const absent_students = await axios.post('/get-absent-students', {lesson_id: this.props.lesson_id});

        this.setState({ present_students: present_students.data,
                        absent_students: absent_students.data});
    }

    componentDidMount(){
        this.GetLessonData();
    }

    ReturnToDashboard(){
        window.location.href = "/previous-lessons";
    }

    columns = [
        {
            title: 'Student Name',
            dataIndex: 'name',
            key: 'studentName',
        },
        {
            title: 'Student Id',
            dataIndex: 'serial_number',
            key: 'studentId',
        },
        {
            title: 'Time',
            dataIndex: 'updated_at',
            key: 'time',
        }
    ]

    render(){

        const { absent_students, present_students} = this.state;

        if(present_students != undefined){
            return(
                <React.Fragment>
                    <div style={{ padding: '1%' }}>
                        <Table 
                            dataSource={present_students} 
                            columns={this.columns} 
                            scroll={{ y: 500 }}
                            showHeader={false}
                            pagination={false}/>
                        <Button className="button--stop-lesson" onClick={this.ReturnToDashboard} type="primary">Terug</Button>
                    </div>
                </React.Fragment>
            );
        }else{
            return <h1>loading...</h1>
        }
    }
}

export default PreviousDetail;