import React from 'react';
import {Link} from "react-router-dom";

function LoginButton(props) {
    return (
        <Link  className="nav-link" to={{
            pathname : "/login"
        }}>
            <i className="fas fa-sign-in-alt"  style={{"color" : "white", "fontSize" : "25px"}}> </i>
        </Link>
    );
}

export default LoginButton;