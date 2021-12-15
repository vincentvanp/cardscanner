import React, { Component } from 'react';
import { Table } from 'antd';
import Pusher from "pusher-js"

class UserTable extends React.Component {

    state = {
        studentData: [],
        lessonData: []
    }

    pusherBind(channel, event) {

        this.pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
            cluster: 'eu'
        });

        this.channel = this.pusher.subscribe(channel);

        this.channel.bind(event, this.receiveUpdateFromPusher)
    }

    async GetLessonData(){
        const lesson = await axios.post("/get-attending-students", {lesson_id: this.props.lesson});

        this.setState({lessonData: lesson.data});
    }

    componentDidMount() {

        this.pusherBind(this.props.channel, this.props.event);
        this.GetLessonData();
    }

    receiveUpdateFromPusher = data => {

        // pusherData looks like this {"studentName": "Name", "studentId": 1234, "time": "12:30"}
        const studentData = [data, ...this.state.studentData];
        this.setState({ studentData });
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

    ]

    render() {

        const datas = [...this.state.studentData];

        const {lessonData} = this.state;

        lessonData.map((data) => {
            datas.push(data);
        })

        console.log(datas);

        datas.map((data, index) =>
            data.key = index
        )

        return (
            <React.Fragment>
                <Table title={() => "scanner: " + this.props.event} dataSource={datas} columns={this.columns} scroll={{ y: 500 }} pagination={false} />
            </React.Fragment>
        );
    }
}

export default UserTable;

