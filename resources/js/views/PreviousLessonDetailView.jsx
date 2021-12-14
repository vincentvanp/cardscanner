import React from 'react';
import { useParams } from 'react-router-dom';
import PreviousDetail from "../components/previousDetail"

function PreviousLessonDetailView(){

    return(
        <div className="container--user-table">
            <div className="container--active-table">
                <PreviousDetail lesson_id={useParams()}/>
            </div>
        </div>
    );

}

export default PreviousLessonDetailView;