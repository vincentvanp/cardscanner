import { Form, Modal, Button, Select } from 'antd';
import React, { useState } from 'react';

import { ClockCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const axios = require('axios').default;


class ContentForm extends React.Component{
    state = {
        visible: false,
        courses: [],
        scanners: [],
        lessons: []
    };

    validateMessages = {
        required: '${label} moet ingevuld worden',
    };

    async GetFormData() {
        const courses = await axios.post('/get-courses');
    
        const scanners = await axios.post('/get-scanners');

        this.setState({ courses: courses.data, scanners: scanners.data });
    }

    async GetlessonData(value){
        const lessons = await axios.post('/get-lesson-by-course', {course_id: value});

        this.setState({ lessons: lessons.data });
    }

    async UserHasLesson(value){
        const data = await axios.post('/user-has-lesson', {lesson_id: value});
    }

    componentDidMount(){
        this.GetFormData();
    }

    formRef = React.createRef()

    layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    onCourseChange = (value) => {
        this.GetlessonData(value);
    };

    onFinish = (values) => {

        this.UserHasLesson(values["lesson_id"]);

        console.log( values['lesson_id']);
        console.log( values['scanner']);

        sessionStorage.setItem("lesson_id", values['lesson_id']);
        sessionStorage.setItem("scanner", values['scanner']);
    
        window.location.href = "/active-lesson";
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
    
    render(){

        const { visible, courses, scanners, lessons } = this.state;

        return (
            <div className="form--button">
                <Button className="button--form" type="primary" onClick={this.showModal}><ClockCircleOutlined />start les</Button>
                <Modal
                    title="start les"
                    visible={visible}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                    width={1000}
                    footer={[
                    ]}>
                    <Form validateMessages={this.validateMessages} {...this.layout} form={this.form} onFinish={this.onFinish} name="control-hooks" className="Form--Start-les" layout="vertical" requiredMark={false}>
                        <Form.Item name="course_id" label="Course" rules={[{ required: true }]}>
                            <Select
                                className="select--lesson-form"
                                placeholder="Selecteer een vak"
                                style={{ width: 200 }}
                                onChange={this.onCourseChange}
                                allowClear>
                                {courses.map((course) => (
                                    <Option key={course.id} value={course.id}>{course.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item name="lesson_id" label="Lesson" rules={[{ required: true }]}>
                            <Select
                                className="select--lesson-form"
                                placeholder="Selecteer een les"
                                style={{ width: 200 }}
                                allowClear>
                                {lessons.map((lesson) => (
                                    <Option key={lesson.id} value={lesson.id}>{lesson.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>

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
                        <Form.Item wrapperCol={{ span: 16 }}>
                            <Button className="button--lesson-form" type="primary" htmlType="submit">
                                start
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default ContentForm;