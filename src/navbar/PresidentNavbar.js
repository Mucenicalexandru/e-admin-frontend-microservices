import React, {useContext} from 'react';

import {Link} from "react-router-dom";
import {UserContext} from "../context/UserContext";

function PresidentNavbar(props) {

    const value = useContext(UserContext);

    return (
        <>

{/*PRESIDENT TICKETS*/}
            {value && value.roles.includes("PRESIDENT") ?
                <Link className="nav-link"  style={{"color": "white", "cursor" : "pointer"}} to={{
                    pathname : "/tickets"}}>
                    Tickets
                </Link>
                :
                null}

{/*PRESIDENT POLLS*/}
            {value && value.roles.includes("PRESIDENT") ?
                <Link className="nav-link" style={{"color": "white", "cursor" : "pointer"}} to={{
                    pathname : "/see-polls"}}>
                    Polls
                </Link>
                :
                null}

        </>
    );
}

export default PresidentNavbar;