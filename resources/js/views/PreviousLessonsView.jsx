import React, { Component } from 'react';
import { Layout, Select } from 'antd';

const { Option } = Select;

import PreviousLessons from '../components/previousLessons';

let course = 0;

class PreviousLessonsView extends React.Component {

    state = {
        courses: []
    }

    async GetData(){
        const {data} = await axios.post('/get-courses');
            
        this.setState({ courses: data });
    }

    componentDidMount(){
        this.GetData();
    }

    handleChange(value) {
        course = value;
    }   

    render() {

        const {courses} = this.state;

        return (
            <Layout className="container--content">
                <div className="container--text-title">
                    <h1 className="text--page-title">Vorige lessen</h1>
                    <div className="select--previous-lessons">
                        <h3>Filter op</h3>
                        <Select defaultValue="none" style={{ width: 150 }} onChange={this.handleChange}>
                        {courses && 
                        courses.map(course => {
                            return (
                                <Option key={course.id} value={course.id}>{course.name}</Option>
                            );
                        })}
                        </Select>
                    </div>
                </div>
                <div className="container--page">
                    <PreviousLessons course={course}/>
                </div>
            </Layout>
        );
    }
}

export default PreviousLessonsView;