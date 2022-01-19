import React, { Component } from 'react';
import Sidebar from '../components/layoutComponents/Sidebar';
import { Layout } from 'antd';

import ScannerHeader from '../components/layoutComponents/header';

const { Content } = Layout;

class LayoutView extends React.Component {

    render() {
        return (
            <Layout>
                <Sidebar />
                <Layout>
                    <ScannerHeader/>
                    <Content className="container--content">{this.props.Component}</Content>
                </Layout>
            </Layout>
        );
    }
}

export default LayoutView;