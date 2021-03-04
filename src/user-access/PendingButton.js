import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {UserContext} from "../context/UserContext";

function PendingButton() {

    const value = useContext(UserContext);
    const [group, setGroup] = useState({});
    let counter = 0;

    useEffect(() => {
        value &&
        axios.get(`/group/get-by-id/${value.groupId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then(response => {
                setGroup(response.data);
            })
    }, [value])

    // const getUserRequestCounter = () => {
    //     if(group.buildings && value){
    //         group.buildings.forEach((building) =>{
    //             building.users.forEach((user) => {
    //                 if(user.userStatus === "PENDING"){
    //                     counter = counter + 1;
    //                 }
    //             })
    //         })
    //
    //     }
    //     return counter;
    // }

    return (
        <Link to={{
            pathname : "/pending-requests",
            userId : value.userId,
            groupId : group.groupId
        }} className="nav-link disabled" style={{"color" : "white"}}>Join requests <span style={{"backgroundColor" : "white", "color" : "red", "padding" : "1.5px", "borderRadius" : "5px"}}>3</span> </Link>
    );
}

export default PendingButton;