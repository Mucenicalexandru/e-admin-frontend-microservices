import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {UserContext} from "../context/UserContext";

function PendingButton() {

    const value = useContext(UserContext);

    const [pendingList, setPendingList] = useState([]);

    useEffect(() => {
        axios.get(`/user/pending/${value.groupId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then((response) => {
                setPendingList(response.data);
            })
    }, [value])


    return (
        <Link to={{
            pathname : "/pending-requests"
        }} className="nav-link disabled" style={{"color" : "white"}}><i className="fas fa-user-plus"> </i> Join requests <span style={{"backgroundColor" : "white", "color" : "red", "padding" : "1.5px", "borderRadius" : "5px"}}>{pendingList.length}</span> </Link>
    );
}

export default PendingButton;