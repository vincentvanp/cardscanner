import React from 'react';

import LessonModal from './previousLessons/LessonsModal';

import { Card } from 'antd';

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
                <LessonModal title={props.lesson.name} peopleAtended={studentsPresent} totalStudents={totalStudents}/>
            </div>
        </Card>
    );
}

export default PreviousLessonCard;