import { Form, Modal, Button, Select } from 'antd';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { ClockCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const axios = require('axios').default;

var lessons = [];
var scanners = [];

function GetFormData() {
    axios.post('/get-lessons')
    .then(function (response) {
        lessons = JSON.parse(response.data.lessons);
    })
    .catch(function (error) {
        console.log(error.response.data['message']);
    });

    axios.post('/get-scanners')
    .then(function (response) {
        scanners = response.data;
    })
    .catch(function (error) {
        console.log(error.response.data['message']);
    });
}

function ContentForm() {

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const [form] = Form.useForm();


    const onFinish = (values) => {

        axios.post('/user-has-lesson', {
            coursename: values['coursename']
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error.response.data['message']);
        });

        sessionStorage.setItem("coursename", values['coursename']);
        sessionStorage.setItem("scanner", values['scanner']);
    
        window.location.href = "/active-lesson";
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    
    return (
        <div className="form--button">
            <Button className="button--form" type="primary" onClick={showModal}><ClockCircleOutlined />start les</Button>
            <Modal
                title="start les"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
                footer={[
                ]}>
                <Form {...layout} form={form} onFinish={onFinish} name="control-hooks" className="Form--Start-les">
                    <Form.Item name="coursename" label="coursename" rules={[{ required: true }]}>
                        <Select
                            className="select--lesson-form"
                            placeholder="Selecteer een les"
                            style={{ width: 200 }}
                            allowClear>
                            {lessons.map((lesson) => (
                                <Option key={lesson.id} value={lesson.name}>{lesson.name}</Option>
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

GetFormData()

export default ContentForm;