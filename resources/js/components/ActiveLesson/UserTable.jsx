import React, { Component } from 'react';
import { Table } from 'antd';
import Pusher from "pusher-js"

class UserTable extends React.Component {

    state = {
        studentData: []
    }

    pusherBind(channel, event) {
        this.pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
            cluster: 'eu'
        });
        this.channel = this.pusher.subscribe(channel);

        this.channel.bind(event, this.receiveUpdateFromPusher)
    }

    componentDidMount() {
        this.pusherBind(this.props.channel, this.props.event);
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
            title: 'Student Id',
            dataIndex: 'id',
            key: 'studentId',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        }
    ]

    render() {

        const datas = [...this.state.studentData];

        datas.map((data, index) =>
            data.key = index
        )

        return (
            <React.Fragment>
                <Table title={() => this.props.lesson} dataSource={datas} columns={this.columns} scroll={{ y: 500 }} pagination={false} />
            </React.Fragment>
        );
    }
}

export default UserTable;

