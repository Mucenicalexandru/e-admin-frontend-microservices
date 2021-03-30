import React from 'react';
import {Link} from "react-router-dom";

function RegisterLink(props) {


    return (
        <Link to={{
            pathname : "/register"
        }}>
            <p className="nav-link" style={{"color" : "white"}}>
                <i className="far fa-registered"> </i> Register</p>

        </Link>
    );
}

export default RegisterLink;