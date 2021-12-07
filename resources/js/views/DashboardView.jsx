import React, { Component } from 'react';
import { Layout } from 'antd';

import ContentForm from '../components/ContentForm';
import PreviousLessons from '../components/previousLessons';


class DashboardView extends React.Component {
    render() {
        return (
            <Layout className="container--content">
                <div className="container--text-title">
                    <h1 className="text--page-title">Dashboard</h1>
                </div>
                <div className="container--page">
                    <ContentForm/>
                </div>
            </Layout>
        );
    }
}

export default DashboardView;