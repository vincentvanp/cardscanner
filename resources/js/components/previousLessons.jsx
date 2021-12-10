import axios from 'axios';
import React from 'react';

import LessonCard from './LessonCard';

import { Space } from 'antd';

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
            return(
                <div className="container--card">
                    <Space wrap>
                        {lessons && 
                        lessons.map(lesson => {
                            return (
                                <LessonCard key={lesson.id} lesson={lesson} user={user}/>
                            );
                        })}
                    </Space>
                    
                </div>
            );
        }else{
            return <h1>loading...</h1>
        }
    }
}

export default PreviousLessons;