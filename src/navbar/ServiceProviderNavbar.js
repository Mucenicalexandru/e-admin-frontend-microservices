import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {UserContext} from "../context/UserContext";

function ServiceProviderNavbar(props) {

    const value = useContext(UserContext);

    return (
        <>
            {value && value.roles.includes("SERVICE_PROVIDER") ?
                <Link className="nav-link" style={{"color": "white", "cursor": "pointer"}} to={"/see-tickets"}>See All Tickets</Link>
                :
                null}

            {value && value.roles.includes("SERVICE_PROVIDER") ?
                <Link className="nav-link" style={{"color": "white", "cursor": "pointer"}} to={"/my-tickets"}>My Tickets (5)</Link>
                :
                null}

        </>
    );
}

export default ServiceProviderNavbar;