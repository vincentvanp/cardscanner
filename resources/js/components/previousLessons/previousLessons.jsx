import axios from 'axios';
import React from 'react';

import LessonCard from './LessonCard';

import { Space, Spin, Skeleton, Card, Pagination } from 'antd';

class PreviousLessons extends React.Component {
    state = {
        lessons: [],
        length: 0,
        page: 1,
        lessonsPerPage: 6
    }

    async GetData(){
        const {data} = await axios.post('/previous-lessons');
        this.setState({ lessons: data });
        this.setState({ length: data.lessons.length });
    }

    onChange = (value) => {
        this.setState({page: value})
    }

    componentDidMount(){
        this.GetData();
    }

    render(){

        const {lessons, user} = this.state.lessons;

        const {length, page, lessonsPerPage} = this.state;

        if(lessons != undefined){
            const course = this.props.course;

            if(length > 6){
                var displayLessons = lessons.slice((length-1)*(page-1), (length*(page-1)+lessonsPerPage));

                return(
                    <div className="container--card">
                        <Space wrap>
                            {displayLessons && 
                            displayLessons.map(lesson => {
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
                        <Pagination className='pagination' defaultPageSize={6} onChange={this.onChange} total={length} />
                    </div>
                );
            }else{

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
            }
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