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
        value && !value.roles.includes("ADMIN") && !value.roles.includes("SERVICE_PROVIDER") &&
        axios.get(`/group/get-by-id/${value.groupId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then(response => {
                setGroup(response.data);
            })

    }, [value])


    return (
        <>
{/*ADMINISTRATOR SERVICE OFFERS RECEIVED*/}
            {value && value.roles.includes("ADMINISTRATOR") &&
            <Link to={{
                pathname : "/see-offers",
                groupId : group.groupId}} style={{"color" : "white"}} className="nav-link" >Service Offers<span style={{"backgroundColor" : "white", "color" : "red", "padding" : "1.5px", "borderRadius" : "5px"}}>3</span></Link>}

{/*ADMINISTRATOR JOIN REQUESTS*/}
            {value && value.roles.includes("ADMINISTRATOR") && <PendingButton/>}
        </>
    );
}

export default AdministratorNavbar;