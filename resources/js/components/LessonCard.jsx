import React from 'react';

import { Link } from 'react-router-dom';

import { Card, Button } from 'antd';

function PreviousLessonCard (props){
    
    var studentsPresent = 20;
    var totalStudents = 24;

    return(
        <Card className="card">
            <div className="card--text">
                <h3>{props.lesson.name}</h3>
                <p className="card--text text--label">aanwezigheden:</p>
                <p className="card--text card--text-atended">{studentsPresent}/{totalStudents} leerlingen</p>
                <p className="card--text card--text-percentage">{Math.round(studentsPresent/totalStudents*100)}% was aanwezig</p>
            </div>
            <p className="text--lesson-time">{props.lesson.name}</p>
            <div className="button-container--card">
                <Button className="button--add-student" onClick={() => {
                    window.location.href = "previous-lessons/" + props.lesson.id;
                }}>Meer info</Button>
            </div>
        </Card>
    );
}

export default PreviousLessonCard;