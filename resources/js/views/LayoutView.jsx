import React, { Component } from 'react';
import { Layout } from 'antd';

import Sidebar from '../organism/Sidebar/Sidebar';

import ScannerHeader from '../components/layoutComponents/header';

const { Content } = Layout;

class LayoutView extends Component {

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