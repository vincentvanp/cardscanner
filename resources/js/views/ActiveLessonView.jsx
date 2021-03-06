import { Modal, Button, Form, Select, Spin } from 'antd';
const { Option } = Select;
import axios from 'axios';
import React from 'react';
import UserTable from '../components/ActiveLesson/UserTable'

window.Pusher = require('pusher-js');


class ActiveLessonView extends React.Component {

    RunPusher = () => {
        var pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
            cluster: 'eu'
        });
        
        var channel = pusher.subscribe('scanner-channel');
        
        channel.bind(sessionStorage.getItem("scanner"), function (data) {
        
            if(data.message != undefined && data.message != "scanner starting up!!!"){
                axios.post('/student-has-lesson', {
                    'serial': data.message,
                    'lesson_id': sessionStorage.getItem("lesson_id")
                });

                Scanned();
            }else if(data.message == "scanner starting up!!!"){
                console.log(data.message);
            }else{
                axios.post('/student-has-lesson', {
                    'serial': data,
                    'lesson_id': sessionStorage.getItem("lesson_id")
                });

                Scanned();
            }

        });

        const Scanned = () =>{
            this.GetStudents();
        }
    }

    formRef = React.createRef();

    showAddModal = () => {
        this.setState({
            addVisible: true,
        });
    };

    hideAddModal = () => {
        this.formRef.current.resetFields();

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
            scanner: sessionStorage.getItem("scanner"),
            name: sessionStorage.getItem('lesson_id'),
            id: '1'
        },
        students: [],
        visible: false, 
        addVisible: false
    }
    
    async GetUserData(){
        let data = await axios.post('/get-user-data');
        
        this.setState({ lesson: {
                            channel: 'backToFront',
                            event: data.data.id,
                            scanner: sessionStorage.getItem("scanner"),
                            name: sessionStorage.getItem('lesson_id'),
                            id: '1'
                        }});
    }

    async GetStudents(){
        let data = await axios.post('/get-absent-students', {lesson_id: sessionStorage.getItem('lesson_id')});
        
        this.setState({ students: data.data});
    }

    handleStopLesson = () => {

        sessionStorage.setItem("scanner", "");
        sessionStorage.setItem("coursename", "");
        sessionStorage.setItem("selected", 1);
    
        window.location.href = "/lessons";
    }

    componentDidMount(){
        this.GetUserData();
        this.GetStudents();
        this.RunPusher();
    }

    handleAddStudent = (values) => {

        this.formRef.current.resetFields();
        
        this.setState({
            addVisible: false,
        });
        
        axios.post('/student-has-lesson', {
            'name': values.name,
            'lesson_id': sessionStorage.getItem("lesson_id")
        });

        this.GetStudents();
    }

    render() {

        const { students, lesson } = this.state;

        students.map((student, index) =>{
            student.key = index;
        })

        if(lesson.event == "none"){
            return(
                <React.Fragment>
                    <div className="container--user-table">
                        <h1 className="text--page-title">Dasboard</h1>
                        <Spin/>
                    </div>
                </React.Fragment>
            )
        }else{
            return (
                <React.Fragment>
                    <div className="container--user-table">
                        <h1 className="text--page-title">Dasboard</h1>
                        <div className="container--active-table">
                            <UserTable lesson={lesson.name} event={lesson.event} scanner={lesson.scanner} channel={lesson.channel} />
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
                            <Form ref={this.formRef} className="container--modal-buttons" onFinish={this.handleAddStudent}>
                                <Form.Item name="name">
                                    <Select
                                        showSearch
                                        placeholder="Selecteer een student"
                                        className="input--name">
                                        {students.map((student) => {
                                            return <Option key={student.key} value={student.name}>{student.name}</Option>;
                                        })}
                                    </Select>
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