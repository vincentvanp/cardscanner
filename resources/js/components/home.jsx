import React from 'react';

import 'antd/dist/antd.css';
import { Button } from 'antd';

function Home(){
    return(
        <div className="page--home">
            <Button className="login-button" href="oauth/login/microsoft">login with KDG account</Button>
        </div>
    );
}

export default Home;