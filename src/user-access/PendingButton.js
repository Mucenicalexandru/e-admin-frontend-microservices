import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {UserContext} from "../context/UserContext";

function PendingButton() {

    const value = useContext(UserContext);

    const [totalPendingUsers, setTotalPendingUsers] = useState(0);

    useEffect(() => {
        value &&
        axios.get(`/user/pending/${value.groupId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then((response) => {
                setTotalPendingUsers(response.data.length);
            })
    }, [value])


    return (
        <Link to={{
            pathname : "/pending-requests"
        }} className="nav-link disabled" style={{"color" : "white"}}><i className="fas fa-user-plus"> </i> Join requests (<b>{totalPendingUsers}</b>)</Link>
    );
}

export default PendingButton;