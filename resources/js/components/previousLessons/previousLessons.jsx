import axios from 'axios';
import React from 'react';

import LessonCard from './LessonCard';

import { Space, Spin, Skeleton, Card } from 'antd';

class PreviousLessons extends React.Component {
    state = {
        lessons: []
    }

    async GetData(){
        const {data} = await axios.post('/previous-lessons');
        this.setState({ lessons: data });
    }

    componentDidMount(){
        this.GetData();
    }

    render(){

        const {lessons, user} = this.state.lessons;

        if(lessons != undefined){
            const course = this.props.course;

            return(
                <div className="container--card">
                    <Space wrap>
                        {lessons && 
                        lessons.map(lesson => {
                            if(course != 0){
                                if(lesson.course_id == course){
                                    return (
                                        <LessonCard key={lesson.id} lesson={lesson} user={user}/>
                                    );
                                }
                            }else{
                                return (
                                    <LessonCard key={lesson.id} lesson={lesson} user={user}/>
                                );
                            }
                        })}
                    </Space>
                    
                </div>
            );
        }else{
            return (
                <div>
                    <Spin/>
                    <div className="container--card">
                        <Space wrap>
                            <Card className="card">
                                <Skeleton/>
                            </Card>
                            <Card className="card">
                                <Skeleton/>
                            </Card>
                            <Card className="card">
                                <Skeleton/>
                            </Card>
                            <Card className="card">
                                <Skeleton/>
                            </Card>
                        </Space>
                        
                    </div>
                </div>
            );
        }
    }
}

export default PreviousLessons;