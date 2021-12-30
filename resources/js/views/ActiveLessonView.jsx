import { Input, Modal, Button, Form } from 'antd';
import axios from 'axios';
import React from 'react';
import UserTable from '../components/ActiveLesson/UserTable'

window.Pusher = require('pusher-js');

var pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
    cluster: 'eu'
});

var channel = pusher.subscribe('scanner-channel');

channel.bind(sessionStorage.getItem("scanner"), function (data) {

    if(data.message != undefined && data.message != "scanner starting up!!!"){
        axios.post('/student-has-lesson', {
            'serial': data.message,
            'lesson_id': sessionStorage.getItem("lesson_id")
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function (res) {
            console.log(res);
        });
    }else if(data.message == "scanner starting up!!!"){
        console.log(data.message);
    }else{
        axios.post('/student-has-lesson', {
            'serial': data,
            'lesson_id': sessionStorage.getItem("lesson_id")
        });
    }
});

class ActiveLessonView extends React.Component {

    state = { visible: false , addVisible: false};

    showAddModal = () => {
        this.setState({
            addVisible: true,
        });
    };

    hideAddModal = () => {
        this.setState({
            addVisible: false,
        });
    };

    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    hideModal = () => {
      this.setState({
        visible: false,
      });
    };

    state = {
        lesson: {
            channel: 'backToFront',
            event: "none",
            name: sessionStorage.getItem('lesson_id'),
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
                            name: sessionStorage.getItem('lesson_id'),
                            id: '1'
                        }});
    }

    handleStopLesson = () => {

        sessionStorage.setItem("scanner", "");
        sessionStorage.setItem("coursename", "");
    
        window.location.href = "/lessons";
    }

    componentDidMount(){
        this.GetUserData();
    }

    handleAddStudent = (values) => {
        this.setState({
            addVisible: false,
        });

        axios.post('/add-student-by-name', {
            'name': values.name,
            'lesson_id': sessionStorage.getItem("lesson_id")
        });
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
                            <Button className="button--add-student" onClick={this.showAddModal}>Studenten toevoegen</Button>
                            <Button className="button--stop-lesson" onClick={this.showModal}>Stop les</Button>
                        </div>
                        <Modal
                            visible={this.state.visible}
                            footer={[]}
                            onCancel={this.hideModal}
                            className="modal--stop-lesson">
                            <h2>Wilt u de les stoppen?</h2>
                            <div className="container--modal-buttons">
                                <Button className="button--confirm" onClick={this.handleStopLesson}>ja</Button>
                                <Button className="button--cancel" onClick={this.hideModal}>Annuleren</Button>
                            </div>
                        </Modal>
                        <Modal
                            visible={this.state.addVisible}
                            title="student toevoegen"
                            footer={[]}
                            onCancel={this.hideAddModal}
                            className="modal--stop-lesson">
                            <Form className="container--modal-buttons"
                                    onFinish={this.handleAddStudent}>
                                <Form.Item name="name">
                                    <Input className="input--name" placeholder="naam"/>
                                </Form.Item>
                                <Form.Item>
                                    <Button className="button--confirm" htmlType="submit">toevoegen</Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default ActiveLessonView;