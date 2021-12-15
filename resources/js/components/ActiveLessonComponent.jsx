import { Button } from 'antd';
import React from 'react';
import UserTable from './ActiveLesson/UserTable';

window.Pusher = require('pusher-js');

var pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
    cluster: 'eu'
});

var channel = pusher.subscribe('scanner-channel');

channel.bind(sessionStorage.getItem("scanner"), function(data) {

    // axios.post('/student-has-lesson', {
    //     serial: data,
    //     lesson: sessionStorage.getItem("lesson_id")
    // });
});

class ActiveLesson extends React.Component {
    state = {
        lesson: {
            channel: 'backToFront',
            event: "pop",
            name: sessionStorage.getItem('coursename'),
            id: '1'
        }
    }

    state = {
        user: []
    }

    async GetUserData(){
        const data = await axios.post('/get-user-data');
        
        this.setState({ user: data});
    }

    componentDidMount(){
        this.GetUserData();
    }

    handleAddStudent = () => {

    }

    handleStopLesson = () => {

        sessionStorage.setItem("scanner", "");
        sessionStorage.setItem("coursename", "");

        window.location.href = "/lessons";
    }
    
    render() {

        const {user} = this.state;

        return (

            <React.Fragment>
                <div style={{ padding: '1%' }}>
                    <UserTable lesson={this.state.lesson.name} event={this.state.lesson.event} channel={this.state.lesson.channel} />
                    <Button type="primary">Add Student</Button>
                    <Button onClick={this.handleStopLesson} type="danger">Stop Lesson</Button>

                </div>
            </React.Fragment>
        )
    }
}

export default ActiveLesson;