import React from 'react';
import {Link} from "react-router-dom";

function RegisterLink(props) {


    return (
        <Link to={{
            pathname : "/register"
        }}>
            <p className="nav-link" style={{"color" : "white"}}>Register</p>

        </Link>
    );
}

export default RegisterLink;