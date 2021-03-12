import React from 'react';
import {Link} from "react-router-dom";

function Logout(props) {


    return (

    <Link  className="nav-link" to={{
        pathname : "/"
    }} onClick={(e) => {
        e.preventDefault();
        localStorage.clear();
        console.log("LOGOUT")
        window.location.href = "http://localhost:3000/";
    }}>
        <i className="fas fa-sign-out-alt"  style={{"color" : "white", "fontSize" : "25px"}}> </i>
    </Link>

    );
}

export default Logout;