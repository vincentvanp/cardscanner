import { Button } from 'antd';
import React, { Component } from 'react';

class LoginView extends React.Component {
    render() {
        return (
            <div className="page--login">
                <div className="container--login-kdg-logo">
                    <img className="logo--login" src="images/Logo_kdg.png" alt="" />
                </div>
                <div className="container--login-button">
                    <p className="title--login">Studentenkaart scanner</p>
                    <Button className="button--login" href="oauth/login/microsoft">Log in met kdg.be account (klik hier)</Button>
                </div>
            </div>
        );
    }
}

export default LoginView;