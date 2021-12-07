import React, { Component } from 'react';
import Sidebar from '../components/Sidebar';
import { Layout, PageHeader } from 'antd';

import ScannerHeader from '../components/layoutComponents/header';

const { Header, Footer, Sider, Content } = Layout;

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