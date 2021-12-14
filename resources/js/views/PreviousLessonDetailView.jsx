import React from 'react';
import { useParams } from 'react-router-dom';
import PreviousDetail from "../components/previousDetail"
import { Layout } from 'antd';

function PreviousLessonDetailView(){

    return(
        <Layout className="container--content">
            <div className="container--text-title">
                <h1 className="text--page-title">Meer informatie</h1>
            </div>
            <div className="container--page">
                <div className="container--user-table">
                    <div className="container--active-table">
                        <PreviousDetail lesson_id={useParams()}/>
                    </div>
                </div>
            </div>
        </Layout>
    );

}

export default PreviousLessonDetailView;