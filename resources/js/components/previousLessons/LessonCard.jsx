import React from 'react';

import { Card, Button, Skeleton, Modal, Form, Select } from 'antd';

const { Option } = Select;

class PreviousLessonCard extends React.Component{
    
    state = {
        present_students: "",
        absent_students: "",
        loaded: false,
        visible: false,
        scanners: [],
    };

    validateMessages = {
        required: '${label} moet ingevuld worden',
    };

    async GetLessonData(){

        const present_students = await axios.post('/get-attending-students', {lesson_id: this.props.lesson.id});
        const absent_students = await axios.post('/get-absent-students', {lesson_id: this.props.lesson.id});
        const scanners = await axios.post('/get-scanners');

        this.setState({ present_students: present_students.data,
                        absent_students: absent_students.data, 
                        loaded: true,
                        scanners: scanners.data});

    }

    async UserHasLesson(value){
        const data = await axios.post('/user-has-lesson', {lesson_id: this.props.lesson.id});
    }

    HandleRestartLesson = (values) =>{

        this.UserHasLesson(values["lesson_id"]);

        sessionStorage.setItem("lesson_id", this.props.lesson.id);
        sessionStorage.setItem("scanner", values['scanner']);

        window.location.href = "/active-lesson";
    }

    componentDidMount(){
        this.GetLessonData();
    }

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

    CardButtons = () =>{

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        var limitDate = new Date(this.props.lesson.start);
        limitDate.setDate(limitDate.getDate() + 2);
        limitDate = limitDate.getFullYear()+'-'+(limitDate.getMonth()+1)+'-'+limitDate.getDate();
        
        if(date < limitDate){
            return(
                <div className="button-container--card">
                    <Button className="button--add-student" onClick={() => {
                        window.location.href = "previous-lessons/" + this.props.lesson.id;
                    }}>Meer info</Button>
                    <Button className="button--add-student" onClick={this.showModal}>Les herstarten</Button>
                </div>
            );
        }else{
            return(
                <div className="button-container--card">
                    <Button className="button--add-student" onClick={() => {
                        window.location.href = "previous-lessons/" + this.props.lesson.id;
                    }}>Meer info</Button>
                </div>
            );
        }
    }

    render(){

        const {scanners, visible, loaded, present_students, absent_students} = this.state;

        var studentsPresent = present_students.length;
        var totalStudents = present_students.length + absent_students.length;

        var percentage = 0;

        if(totalStudents == 0){
            percentage = "niemand aanweezig";
        }else{
            percentage = Math.round(studentsPresent/totalStudents*100) + " " + "% was aanwezig";
        }

        if(loaded){
            return(
                <div>
                    <Card className="card">
                        <div className="card--text">
                            <h3>{this.props.lesson.name}</h3>
                            <p className="card--text text--label">aanwezigheden:</p>
                            <p className="card--text card--text-atended">{studentsPresent}/{totalStudents} leerlingen</p>
                            <p className="card--text card--text-percentage">{percentage}</p>
                        </div>
                        <p className="text--lesson-time">{this.props.lesson.start}</p>
                        <this.CardButtons/>
                    </Card>

                    <Modal
                    title="start les"
                    visible={visible}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                    width={1000}
                    footer={[
                    ]}>
                        <Form className='container--restart-form' validateMessages={this.validateMessages} onFinish={this.HandleRestartLesson}>
                            <Form.Item name="scanner" label="Scanner" rules={[{ required: true }]}>
                                <Select
                                    className="select--lesson-form"
                                    placeholder="Selecteer een scanner"
                                    style={{ width: 200 }}
                                    allowClear>

                                    {scanners.map((scanner) => (
                                        <Option key={scanner.id} value={scanner.event}>{scanner.event}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item className='container--restart-button'>
                                <Button className="button--lesson-form" type="primary" htmlType="submit">
                                    start
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            );
        }else{
            return(
                <Card className="card">
                    <Skeleton/>
                </Card>
            );
        }
    }
}

export default PreviousLessonCard;