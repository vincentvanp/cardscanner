import ReactDOM from "react-dom";
import React from "react";
import { Layout } from 'antd';

import { BrowserRouter as Router } from "react-router-dom";

import 'antd/dist/antd.css';
import '../sass/app.scss';

import MainRouter from "./router/MainRouter"


window.Pusher = require('pusher-js');

function Main(){

    return(
        <Layout className="mainContainer">
            <MainRouter />
        </Layout>
    );
}

if (document.getElementById('root')) {
    ReactDOM.render(
        <Router>
            <Main />
        </Router>,
    document.getElementById('root'));
}




