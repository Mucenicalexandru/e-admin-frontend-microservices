import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {UserContext} from "../context/UserContext";

function ServiceProviderNavbar(props) {

    const value = useContext(UserContext);
    const [totalWonTickets, setTotalWonTickets] = useState(0);
    const [status, setStatus] = useState("in progress");

    useEffect(() => {
        value &&
        axios.get(`/ticket/assigned-service-provider/${value.userId}/${status}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                console.log(response.data.length)
                setTotalWonTickets(response.data.length);
            })
    }, [value])


    return (
        <>
            {value && value.roles.includes("SERVICE_PROVIDER") ?
                <Link className="nav-link" style={{"color": "white", "cursor": "pointer"}} to={"/see-tickets"}>See All Tickets</Link>
                :
                null}

            {value && value.roles.includes("SERVICE_PROVIDER") ?
                <Link className="nav-link" style={{"color": "white", "cursor": "pointer"}} to={"/my-tickets"}>My Tickets ({totalWonTickets})</Link>
                :
                null}

        </>
    );
}

export default ServiceProviderNavbar;