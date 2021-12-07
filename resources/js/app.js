import ReactDOM from "react-dom";
import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import 'antd/dist/antd.css';
import '../sass/app.scss';

import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Home from "./components/home";
import ActiveLesson from './components/ActiveLessonComponent';
import { Layout } from 'antd';

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


// var pusher = new Pusher('92353ee8426715c5cc4f', {
//     cluster: 'eu'
// });

// var channel = pusher.subscribe('lesson');

// channel.bind('lesson-created', function(data) {
//     var event_name = data.message[0];
//     var lesson_name = data.message[1];

//     console.log(event_name);
//     console.log(lesson_name);

//     channel = pusher.subscribe('scanner-channel');

//     channel.bind(sessionStorage.getItem("scanner"), function(data) {

//         axios.post('/student-has-lesson', { 'serial': data,
//                                             'lesson': lesson_name})
//         .then(function (response) {
//             console.log(response);
//         });
//     });
// });




