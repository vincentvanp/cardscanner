import React from 'react';

import {Spin, DatePicker, TimePicker , Input, Form, Select, Button} from 'antd';

const { Option } = Select;
const { RangePicker } = TimePicker;

const axios = require('axios').default;

class AddLessonView extends React.Component{
    state = {
        courses: "",
        startTime: "",
        endTime: "",
        date: "",
        name: "name",
    };

    layout = {
        wrapperCol: { span: 14, offset: 4 },
    };

    timeChange = (date, dateStrings) => {

        this.setState({startTime: dateStrings[0], endTime: dateStrings[1]});
    }

    dateChange = (date, dateStrings) => {

        this.setState({date: dateStrings});
    }

    NameChange = (values) => {

        this.setState({name: values});
    }

    componentDidMount(){
        this.GetData();
    }
    
    onFinish = (values) => {
        
        if(!values.name){
            values.name = values.course;
        }
        
        const {startTime, endTime, date} = this.state;
        
        axios.post('/create-lesson', {name: values.name, course: values.course, start: startTime, end: endTime, date: date});
        
        sessionStorage.setItem("selected", 1);
        window.location.href = "/";
    }

    async GetData(){
        const courses = await axios.post('/get-all-courses');
        this.setState({courses: courses.data})
    }
        

    render(){

        const { name, courses} = this.state;

        if(courses != ""){
            return(
                <div>
                    <h1 className='text--page-title form--header'>les aanmaken</h1>
                    <div className='container--add-lesson bg--dark'>
                        <Form className='form--add-lesson' {...this.layout} onFinish={this.onFinish}>
                            <Form.Item
                                label="vak"
                                name="course"
                                rules={[{ required: true, message: 'selecteer vak' }]}>
                                <Select
                                    onChange={this.NameChange}
                                    placeholder="Vak"
                                    style={{ width: 200 }}
                                    allowClear>
                                    {courses.map((course) => (
                                        <Option key={course.id} value={course.name}>{course.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="name" label="les naam" >
                                <Input placeholder={name}/>
                            </Form.Item>
                            <Form.Item name="start" label="start" rules={[{ required: true }]}>
                                <DatePicker showTime format="YYYY-MM-DD" onChange={this.dateChange}/>
                            </Form.Item>
                            <Form.Item name="start-time" label="time" rules={[{ required: true }]}>
                                <RangePicker format="HH:mm" minuteStep={15} onChange={this.timeChange}/>
                            </Form.Item>
                            <Form.Item>
                                <Button className='button--lesson-form' type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                        
                    </div>
                </div>
            );
        }else{
            return <div><Spin/></div>
        }
    }
}

export default AddLessonView;