import React from 'react';
import {
    Link
} from 'react-router-dom';

import { Button, Layout, Menu } from 'antd';
import { HomeFilled, LaptopOutlined, PlusSquareOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Sider } = Layout;

class Sidebar extends React.Component{

    state = {
        user: ''
    }

    async GetUserData(){
        let data = await axios.post('/get-user-data')
        .then(function(response){
            return response.data;
        }).catch(e => console.log(e));

        if(data == undefined){
            window.location.href = "/login";
        }
        
        this.setState({ user: data});
    }

    componentDidMount(){
        this.GetUserData();
    }

    handleLogout(){

        axios.post("/logout");
        window.location.href = "/login";
    }

    render() {

        const {user} = this.state;

        if(user.name != undefined){

            const name = user.name.split(" ");

            return (
                <Sider width={250}>
                    <Menu
                        className="sidebar"
                        mode="inline"
                        theme="dark"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}>
                        <div className="container--logo"><img className="logo" src="../../images/kdg.png" /></div>
                        <Menu.Item key="1"><HomeFilled /><Link to="/">Dashboard</Link></Menu.Item>
                        <Menu.Item key="2"><LaptopOutlined /><Link to="/previous-lessons">Vorige lessen</Link></Menu.Item>
                        <Menu.Item key="3"><PlusSquareOutlined /><Link to="/add">les aanmaken</Link></Menu.Item>
                        <div className="sidebar--bottom">
                            <div className="user">
                                <div className="avatar">
                                    {name[0].charAt(0).toUpperCase()}
                                    {name[1].charAt(0).toUpperCase()}
                                </div>
                                <div className="text--user">
                                    <p className="text--teacher-name">{name[0]}</p>
                                    <p className="text--teacher-name">{name[1]}</p>
                                    {/* <a href=""><p className="link">profiel bekijken</p></a> */}
                                </div>
                            </div>
                            <Button  onClick={this.handleLogout} className="button--logout">Uitloggen</Button>
                        </div>
                    </Menu>
                </Sider>
            );
        }else{
            return (
                <Sider width={250}>
                    <Menu
                        className="sidebar"
                        mode="inline"
                        theme="dark"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}>
                        <div className="container--logo"><img className="logo" src="../../images/kdg.png" /></div>
                        <Menu.Item key="1"><HomeFilled /><Link to="/">Dashboard</Link></Menu.Item>
                        <Menu.Item key="2"><LaptopOutlined /><Link to="/previous-lessons">Vorige lessen</Link></Menu.Item>
                        <div className="sidebar--bottom">
                            <div className="user">
                                <div className="avatar">
                                </div>
                                <div className="text--user">
                                    <p className="text--teacher-name">loading...</p>
                                    <a href=""><p className="link">profiel bekijken</p></a>
                                </div>
                            </div>
                            <Button className="button--logout" onClick={this.handleLogout}>Uitloggen</Button>
                        </div>
                    </Menu>
                </Sider>
            );
        }        
    }
}

export default Sidebar;

