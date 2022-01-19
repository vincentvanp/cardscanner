import React, { Component } from 'react';
import { Layout, Select } from 'antd';

const { Option } = Select;

import PreviousLessons from '../components/previousLessons/previousLessons';

class PreviousLessonsView extends Component {
    
    state = {
        courses: [],
        course: 0
    }
    
    componentDidMount(){
        this.GetData();
    }

    async GetData(){
        const {data} = await axios.post('/get-courses');
        
        this.setState({ courses: data });
    }
    
    render() {
        
        const {course, courses} = this.state;   

        return (
            <Layout className="container--content">
                <div className="container--text-title">
                    <h1 className="text--page-title">Vorige lessen</h1>
                    <div className="select--previous-lessons">
                        <h3>Filter op</h3>
                        <Select defaultValue="Geen filter" style={{ width: 150 }} onChange={(value) => {
                            this.setState({course: value})
                        }}>
                            <Option key={0} value={0}>Geen filter</Option>
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