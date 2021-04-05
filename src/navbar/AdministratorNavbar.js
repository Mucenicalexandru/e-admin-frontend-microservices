import {Link} from "react-router-dom";
import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {UserContext} from "../context/UserContext";
import PendingButton from "../user-access/PendingButton";

function AdministratorNavbar(props) {

    const value = useContext(UserContext);
    const [group, setGroup] = useState({});
    const [activeOffers, setActiveOffers] = useState(0);

    useEffect(() => {
        value && value.roles.includes("ADMINISTRATOR") &&
        axios.get(`/group/get-by-id/${value.groupId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then(response => {
                setGroup(response.data);
            })

        value &&
        axios.get(`/ticket/all-by-group-with-pending-offers/${value.groupId}/opened/Administrative`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => {
                let counter = 0;
                response.data.forEach((response) => {
                    counter += response.pendingOffer.length;
                })
                setActiveOffers(counter);
            })

    }, [value])


    return (
        <>
{/*ADMINISTRATOR SERVICE OFFERS RECEIVED*/}
            {value && value.roles.includes("ADMINISTRATOR") &&
            <Link to={{
                pathname : "/see-offers",
                type : "Administrative",
                groupId : group.groupId}} style={{"color" : "white"}} className="nav-link" >Service Offers (<b>{activeOffers}</b>)</Link>}

{/*ADMINISTRATOR JOIN REQUESTS*/}
            {value && value.roles.includes("ADMINISTRATOR") && <PendingButton/>}
        </>
    );
}

export default AdministratorNavbar;