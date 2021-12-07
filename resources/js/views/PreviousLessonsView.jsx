import React, { Component } from 'react';
import { Layout, Select } from 'antd';

const { Option } = Select;

import PreviousLessons from '../components/previousLessons';

function handleChange(value) {
    console.log(`selected ${value}`);
}

class PreviousLessonsView extends React.Component {
    render() {
        return (
            <Layout className="container--content">
                <div className="container--text-title">
                    <h1 className="text--page-title">Vorige lessen</h1>
                    <div className="select--previous-lessons">
                        <h3>Filter op</h3>
                        <Select defaultValue="none" style={{ width: 150 }} onChange={handleChange}>
                            <Option value="Wiskunde">Wiskunde</Option>
                            <Option value="Engels">Engels</Option>
                            <Option value="Web Development">Web Development</Option>
                        </Select>
                    </div>
                </div>
                <div className="container--page">
                    <PreviousLessons />
                </div>
            </Layout>
        );
    }
}

export default PreviousLessonsView;