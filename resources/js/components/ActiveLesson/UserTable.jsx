import React, { Component } from 'react';
import { Table } from 'antd';
import Pusher from "pusher-js"
import axios from 'axios';

const { Column, ColumnGroup } = Table;

class UserTable extends React.Component {

    state = {
        studentData: [],
        lessonData: [],
        absentData: []
    }

    pusherBind(channel, event) {

        this.pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
            cluster: 'eu'
        });

        this.channel = this.pusher.subscribe(channel);

        this.channel.bind(event, this.receiveUpdateFromPusher)
    }

    async GetLessonData(){
        const data = await axios.post("/get-attending-students", {lesson_id: this.props.lesson});

        this.setState({lessonData: data.data});
    }

    async GetAbsentStudents(){
        const data = await axios.post('/get-absent-students', {lesson_id: sessionStorage.getItem('lesson_id')});

        this.setState({absentData: data.data});
    }

    componentDidMount() {

        this.pusherBind(this.props.channel, this.props.event);
        this.GetLessonData();
        this.GetAbsentStudents();
    }

    receiveUpdateFromPusher = data => {

        // pusherData looks like this {"studentName": "Name", "studentId": 1234, "time": "12:30"}
        const studentData = [data, ...this.state.studentData];
        
        this.GetLessonData();
        this.GetAbsentStudents();
    }

    Delete = (props) =>{

        return(
            <a onClick={() => {

                const studentData = [...this.state.studentData];

                for(let i = 0; i < studentData.length; i++){
                    if(studentData[i].name == props.student.name){

                        studentData.splice(i, 1);
                    }
                }

                axios.post("/remove-student", { lesson_id: sessionStorage.getItem('lesson_id'), name: props.student.name });
                
                this.GetLessonData();
                this.GetAbsentStudents();

                this.setState({studentData: studentData});

            }} style={{color: "red"}}>verwijderen</a>
        );
    }

    columns = [
        {
            title: 'Student Name',
            dataIndex: 'name',
            key: 'studentName',
        },
        {
            title: 'Time',
            dataIndex: 'updated_at',
            key: 'time',
        },
        {
            title: 'Student Id',
            dataIndex: 'serial_number',
            key: 'studentId',
        },
        {
            title: 'verwijderen',
            dataIndex: 'action',
            key: 'action',
        },

    ]

    render() {

        const {absentData, lessonData} = this.state;

        const datas = [...this.state.studentData];

        absentData.map((data) => {
            data.updated_at = "";
        })

        datas.map((data) => {
            data.action = <this.Delete student={data}/>;
        })

        lessonData.map((data) => {
            var updated_at = data.updated_at.split(" ");
            if(updated_at[1] != undefined){
                updated_at = updated_at[1].split(":");
                data.updated_at = updated_at[0] +":"+updated_at[1];
                data.action = <this.Delete student={data}/>;
                datas.push(data);
            }else{
                data.action = <this.Delete student={data}/>;
                datas.push(data);
            }
        })

        datas.push({name:<h3 style={{color: "red"}}>Afwezig</h3>});
        const students = datas.concat(absentData);

        students.map((student, index) =>{
            student.key = index;
        })

        return (
            <React.Fragment>
                <Table title={() => "scanner: " + this.props.scanner} dataSource={students} columns={this.columns} scroll={{ y: 500 }} pagination={false}/>
            </React.Fragment>
        );
    }
}

export default UserTable;

