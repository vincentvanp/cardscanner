import React, { Component } from 'react';

import { useParams } from "react-router-dom";


function PreviousLessonDetailView(){
    const { lessonId } = useParams();

    return <h1>Details lessons {lessonId}</h1>;
}


export default PreviousLessonDetailView;