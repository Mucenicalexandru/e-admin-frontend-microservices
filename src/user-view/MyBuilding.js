import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../context/UserContext";
import axios from "axios";
import {Link} from "react-router-dom";

function MyBuilding(props) {

    const value = useContext(UserContext);
    const [response, setResponse] = useState({});

    useEffect(() => {
        axios.get(`/building/with-president-and-poll-and-tickets/${value.buildingId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setResponse(response.data);
            })
    }, [value])

    return (
        <div className="card mx-auto shadow" style={{"width": "18rem", "marginTop" : "50px", "backgroundColor" : "#c6e2de"}}>
            <div className="card-body">
                <h5 className="card-title">Building</h5>
                {response.building && <h6 className="card-subtitle mb-2 text-muted">{response.building.street} {response.building.number}</h6>}

                <div className={"margin-top-25 margin-bottom-25"}>
                    <p className="card-text">Tickets : {response.ticketList && response.ticketList.length}
                        <Link to={{
                            pathname : '/see-offers',
                            buildingId : value.buildingId,
                            type : "Administrative"
                        }}>
                            <button className="btn btn-outline-dark btn-sm float-right">See tickets</button>
                        </Link>
                    </p>
                    <p className="card-text">Polls : {response.pollList && response.pollList.length}
                        <Link to={{
                            pathname : '/polls',
                            buildingId : value.buildingId
                        }}>
                            <button className="btn btn-outline-dark btn-sm float-right">See polls</button>
                        </Link>
                    </p>
                    {response.president &&
                    <div>
                        <p>President : {response.president.lastName === null ? "No president" : response.president.lastName + " " + response.president.firstName}</p>
                        <p><i className="fas fa-envelope"> </i> {response.president.email === null ? "No email" : response.president.email}</p>
                        <p><i className="fas fa-phone"> </i> {response.president.phone === null ? "No phone" : response.president.phone}</p>
                    </div>}
                </div>
            </div>
            </div>
    );
}

export default MyBuilding;