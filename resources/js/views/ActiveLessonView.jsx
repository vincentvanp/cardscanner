import { BackTop, Button } from 'antd';
import React from 'react';
import UserTable from '../components/ActiveLesson/UserTable'

window.Pusher = require('pusher-js');

var pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
    cluster: 'eu'
});

var channel = pusher.subscribe('scanner-channel');

channel.bind(sessionStorage.getItem("scanner"), function (data) {

    axios.post('/student-has-lesson', {
        'serial': data,
        'lesson': sessionStorage.getItem("coursename")
    });
});

class ActiveLessonView extends React.Component {
    state = {
        lesson: {
            channel: 'backToFront',
            event: "none",
            name: sessionStorage.getItem('coursename'),
            id: '1'
        }
    }
    
    async GetUserData(){
        let data = await axios.post('/get-user-data')
        .then(function(response){
            return response.data;
        }).catch(e => console.log(e));

        this.setState({ lesson: {
                            channel: 'backToFront',
                            event: data.id,
                            name: sessionStorage.getItem('coursename'),
                            id: '1'
                        }});
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

        const {lesson} = this.state;
        
        if(lesson.event == "none"){
            return(
                <React.Fragment>
                    <div className="container--user-table">
                        <h1 className="text--page-title">Dasboard</h1>
                        <h1>loading...</h1>
                    </div>
                </React.Fragment>
            )
        }else{
            return (
                <React.Fragment>
                    <div className="container--user-table">
                        <h1 className="text--page-title">Dasboard</h1>
                        <div className="container--active-table">
                            <UserTable lesson={lesson.name} event={lesson.event} channel={lesson.channel} />
                            <Button className="button--add-student">Studenten toevoegen</Button>
                            <Button className="button--stop-lesson" onClick={this.handleStopLesson}>Stop less</Button>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default ActiveLessonView;