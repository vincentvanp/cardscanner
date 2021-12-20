import axios from 'axios';
import React, {Component} from 'react';

import LessonCard from './LessonCard';

import { Space } from 'antd';

class PreviousLessons extends Component {
    state = {
        lessons: []
    }

    async GetData(){
        let data = await axios.post('/get-lessons')
        .then(function(response){
            return response.data;
        }).catch(e => console.log(e));
        
        this.setState({ lessons: data});
    }

    componentDidMount(){
        this.GetData();
    }

    render(){

        const {lessons} = this.state;

        return(
            <div className="container--card">
                <Space wrap>
                    {lessons &&
                    lessons.map(lesson => {
                        return (
                            <LessonCard lesson={lesson}/>
                        );
                    })}
                </Space>
                
            </div>
        );
    }
}

export default PreviousLessons;