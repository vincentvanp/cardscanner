import React, { useEffect } from 'react';
import { Layout } from 'antd';

import ContentForm from '../components/ContentForm';
import DashboardCharts from '../components/dashboardCharts';


class DashboardView extends React.Component {


    render() {
        return (
            <Layout className="container--content">
                <div className="container--text-title">
                    <h1 className="text--page-title">Dashboard</h1>
                </div>
                <div className="container--page">
                    <DashboardCharts/>
                    <ContentForm/>
                </div>
            </Layout>
        );
    }
}

export default DashboardView;