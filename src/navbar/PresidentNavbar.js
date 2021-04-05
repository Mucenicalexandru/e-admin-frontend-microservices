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
                    pathname : "/see-offers",
                    type : "Administrative"}}>
                    <i className="fas fa-ticket-alt"> </i> Tickets
                </Link>
                :
                null}

{/*PRESIDENT POLLS*/}
            {value && value.roles.includes("PRESIDENT") ?
                <Link className="nav-link" style={{"color": "white", "cursor" : "pointer"}} to={{
                    pathname : "/see-polls"}}>
                    <i className="fas fa-chart-bar"> </i> Polls
                </Link>
                :
                null}

        </>
    );
}

export default PresidentNavbar;