import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {UserContext} from "../context/UserContext";

function AdminNavbar(props) {

    const value = useContext(UserContext);

    return (
        <div>{value && value.roles.includes("ADMIN") ?
            <Link className="nav-link" style={{"color": "white"}} to={{
                pathname : "/users-statistics"
            }}>Users</Link>
            :
            null}</div>
    );
}

export default AdminNavbar;