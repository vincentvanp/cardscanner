import React from "react";

import { Button as AntButton} from "antd";

function Button(props){
    return(
        <AntButton className={props.class}>
            {props.text}
        </AntButton>
    );
}

export default Button;