import axios from 'axios';
import { functionsIn } from 'lodash';
import React, { Component } from 'react';

import { useParams } from "react-router-dom";

function GetLessonData(lessonId){
    axios.post("/get-attending-students", {lesson_id: lessonId})
    .then(function(response){
        console.log(response);
    }).catch(e => console.log(e));
}

function PreviousLessonDetailView(){
    const { lessonId } = useParams();
    GetLessonData(lessonId);
    return <h1>{lessonId}</h1>
}

export default PreviousLessonDetailView;