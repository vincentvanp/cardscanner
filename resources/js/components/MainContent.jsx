import ContentForm from './ContentForm';
import PreviousLessons from './previousLessons';

import { Layout } from 'antd';
import React, { Component } from 'react';


const { Content } = Layout;

class MainContent extends Component {

    render() {
        return (
            <Layout>
                <Content>
                    <div className="container--content">
                        <ContentForm />
                    </div>
                    <div className="container--previous-lessons">
                        <PreviousLessons/>
                    </div>
                </Content>
            </Layout>
        );
    }
}


export default MainContent;