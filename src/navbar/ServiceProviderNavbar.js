import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {UserContext} from "../context/UserContext";

function ServiceProviderNavbar(props) {

    const value = useContext(UserContext);
    const [totalWonTickets, setTotalWonTickets] = useState(0);
    const [totalOpenedTickets, setTotalOpenedTickets] = useState(0);
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
        value &&
        axios.get(`/ticket/${value.department}/${value.town}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => {
                setTotalOpenedTickets(response.data.length);
            })
    }, [value])


    return (
        <>
            {value && value.roles.includes("SERVICE_PROVIDER") ?
                <Link className="nav-link" style={{"color": "white", "cursor": "pointer"}} to={"/see-tickets"}>
                    <i className="fas fa-ticket-alt"> </i> <i className="fas fa-ticket-alt"> </i> See All Tickets (<b>{totalOpenedTickets}</b>) </Link>
                :
                null}

            {value && value.roles.includes("SERVICE_PROVIDER") ?
                <Link className="nav-link" style={{"color": "white", "cursor": "pointer"}} to={"/my-tickets"}>
                    <i className="fas fa-ticket-alt"> </i> My Tickets (<b>{totalWonTickets}</b>)</Link>
                :
                null}

        </>
    );
}

export default ServiceProviderNavbar;