import React from 'react';
import {
    Link
} from 'react-router-dom';

import { Button, Avatar, Typography, Layout, Menu } from 'antd';
import { UserOutlined, HomeFilled, LaptopOutlined } from '@ant-design/icons';

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
        
        this.setState({ user: data});
    }

    componentDidMount(){
        this.GetUserData();
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
                        <Menu.Item key="1"><HomeFilled /><Link to="/dashboard">Dashboard</Link></Menu.Item>
                        <Menu.Item key="2"><LaptopOutlined /><Link to="/previous-lessons">Vorige lessen</Link></Menu.Item>
                        <div className="sidebar--bottom">
                            <div className="user">
                                <div className="avatar">
                                    {name[0].charAt(0).toUpperCase()}
                                    {/* {name[1].charAt(0).toUpperCase()} */}
                                </div>
                                <div className="text--user">
                                    <p className="text--teacher-name">{user.name}</p>
                                    <a href=""><p className="link">profiel bekijken</p></a>
                                </div>
                            </div>
                            <Button className="button--logout">Uitloggen</Button>
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
                        <Menu.Item key="1"><HomeFilled /><Link to="/dashboard">Dashboard</Link></Menu.Item>
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
                            <Button className="button--logout">Uitloggen</Button>
                        </div>
                    </Menu>
                </Sider>
            );
        }        
    }
}

export default Sidebar;

