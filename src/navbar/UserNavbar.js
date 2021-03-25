import React, {useContext} from 'react';
import {UserContext} from "../context/UserContext";
import {Link} from "react-router-dom";

function UserNavbar(props) {

    const value = useContext(UserContext);

    return (
        <>
{/*GROUPS / MY GROUPS*/}
            {value && value.roles.length === 1 && value.roles.includes("USER") ?
                <Link className="nav-link" to={"/groups"} style={{"color": "white"}}>
                    <i className="fas fa-users"> </i> My Groups</Link>
                :
                <Link className="nav-link" to={"/groups"} style={{"color": "white"}}>
                    <i className="fas fa-users"> </i> Groups</Link>
            }

{/*MY BUILDINGS*/}
            {value && value.roles.length === 1 && value.roles.includes("USER") ?
                <Link className="nav-link" to={"/my-building"} style={{"color": "white"}}>
                    <i className="far fa-building"> </i> My Buildings</Link>
                :
                null}

{/*USER TICKETS*/}
            {value && value.roles.length === 1 && value.roles.includes("USER") ?
                <Link className="nav-link" to={{
                    pathname : "/see-offers",
                    type : "Personal"
                }} style={{"color": "white"}}>
                    <i className="fas fa-ticket-alt"> </i> My tickets</Link>
                :
                null}
{/*USER MARKETPLACE*/}
            {value && value.roles.length === 1 && value.roles.includes("USER") ?
                <Link className="nav-link" to={"/marketplace"} style={{"color": "white"}}>
                    <i className="fas fa-dollar-sign"> </i> Marketplace</Link>
                :
                null}
{/*USER REAL ESTATE*/}
            {value && value.roles.length === 1 && value.roles.includes("USER") ?
                <Link className="nav-link" to={"/real-estate"} style={{"color": "white"}}><i
                    className="fas fa-home"> </i> Real Estate</Link>
                :
                null}

        </>

    );
}

export default UserNavbar;