import React from 'react';

import { Card, Button, Skeleton } from 'antd';

class PreviousLessonCard extends React.Component{
    
    state = {
        present_students: "",
        absent_students: "",
        loaded: false
    };

    async GetLessonData(){

        const present_students = await axios.post('/get-attending-students', {lesson_id: this.props.lesson.id});
        const absent_students = await axios.post('/get-absent-students', {lesson_id: this.props.lesson.id});

        this.setState({ present_students: present_students.data,
                        absent_students: absent_students.data, 
                        loaded: true});

    }

    componentDidMount(){
        this.GetLessonData();
    }

    render(){

        const {loaded, present_students, absent_students} = this.state;

        var studentsPresent = present_students.length;
        var totalStudents = present_students.length + absent_students.length;

        if(loaded){
            return(
                <Card className="card">
                    <div className="card--text">
                        <h3>{this.props.lesson.name}</h3>
                        <p className="card--text text--label">aanwezigheden:</p>
                        <p className="card--text card--text-atended">{studentsPresent}/{totalStudents} leerlingen</p>
                        <p className="card--text card--text-percentage">{Math.round(studentsPresent/totalStudents*100)}% was aanwezig</p>
                    </div>
                    <p className="text--lesson-time">{this.props.lesson.start}</p>
                    <div className="button-container--card">
                        <Button className="button--add-student" onClick={() => {
                            window.location.href = "previous-lessons/" + this.props.lesson.id;
                        }}>Meer info</Button>
                    </div>
                </Card>
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