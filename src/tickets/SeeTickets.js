import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import '../App.css';
import {UserContext} from "../context/UserContext";

function SeeTickets(props) {

    const value = useContext(UserContext);
    let buildingId = value.buildingId;

    const [ticketList, setTicketList] = useState([]);
    const [buttonVisibility, setButtonVisibility] = useState(true);
    const [redirect, setRedirect] = useState(false);
    const [reset, setReset] = useState(true);

    useEffect(() => {
        axios.get(`/ticket/${value.buildingId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then(response => {
                setTicketList(response.data);
            })
    }, [buildingId, reset])


    return (
        <div>

            <h1 className="d-flex justify-content-center" >Building Tickets</h1>

            {redirect && <Redirect to={{
                pathname : "/add-ticket",
                buildingId : buildingId
            }} />}

            <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-outline-info" onClick={(e) => {
                    e.preventDefault();
                    setButtonVisibility(!buttonVisibility);
                }}>Advanced Search</button>
                {value.roles.includes("PRESIDENT") &&
                <button type="button" className="btn btn-outline-info margin-left-10" onClick={(e) => {
                    e.preventDefault();
                    setRedirect(true);
                }}>Add Ticket</button>}
            </div>

            <div hidden={buttonVisibility}>
                <div className="d-flex justify-content-center margin-bottom-25 margin-top-25">
                    <button type="button" className="btn btn-success margin-right-10" onClick={(e)=> {
                        e.preventDefault();
                        axios.get(`/ticket/get-all-filter/opened/Administrative/${buildingId}`, {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('token'),
                            }
                        })
                            .then(response => {
                                setTicketList(response.data);
                            })
                    }}>Opened tickets</button>
                    <button type="button" className="btn btn-warning margin-right-10" onClick={(e)=> {
                        e.preventDefault();
                        axios.get(`/ticket/get-all-filter/in progress/Administrative/${buildingId}`, {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('token'),
                            }
                        })
                            .then(response => {
                                setTicketList(response.data);
                            })
                    }}>In Progress tickets</button>
                    <button type="button" className="btn btn-danger margin-right-10" onClick={(e)=> {
                        e.preventDefault();
                        axios.get(`/ticket/get-all-filter/closed/Administrative/${buildingId}`, {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('token'),
                            }
                        })
                            .then(response => {
                                setTicketList(response.data);
                            })
                    }}>Closed Tickets</button>
                </div>
            </div>

            <div className="d-flex justify-content-center margin-top-25 margin-bottom-25">
                <button type="button" className="btn btn-outline-info btn-sm" hidden={buttonVisibility} onClick={(e) => {
                    e.preventDefault();
                    setButtonVisibility(!buttonVisibility);
                    setReset(!reset);
                }}>Reset search</button>
            </div>

            <div className="d-flex justify-content-center">
                <table>
                    <thead style={{"backgroundColor" : "#8db9e2"}}>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Department</th>
                        <th>Date Opened</th>
                        <th>Assigned Service</th>
                        <th>Price</th>
                        <th>Date Closed</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ticketList.map((ticket, index) => {
                        return <tr key={index}>
                            <td className="index">{index+1}</td>
                            <td className="ticket-title">{ticket.title}</td>
                            <td className="ticket-department">{ticket.department}</td>
                            <td className="ticket-opened-date">{ticket.dateOpened}</td>

                            {ticket.assignedServiceProvider ?
                                <td className="ticket-service-provider">
                                    <Link to={{
                                        pathname : '/assigned-service-provider',
                                        providerId : ticket.assignedServiceProvider.id}}>
                                        {ticket.assignedServiceProvider.firstName + " " + ticket.assignedServiceProvider.lastName}
                                    </Link>
                                </td>
                                :
                                <td className="ticket-service-provider">No service provider assigned yet</td>
                            }
                            {ticket.status === "in progress" ||  ticket.status === "closed" ?
                                <td className="ticket-total-price">{ticket.totalPrice} RON</td>
                                :
                                <td className="ticket-total-price">No accepted offer yet</td>
                            }
                            {ticket.dateClosed ?
                                <td className="ticket-close-date">{ticket.dateClosed}</td>
                                :
                                <td className="ticket-close-date">Ticket is not closed yet</td>}

                            {(() => {
                                switch (ticket.status){
                                    case "opened" :
                                        return <td className="ticket-status"><span className={"green"}>{ticket.status}</span></td>
                                    case "in progress" :
                                        return <td className="ticket-status"><span className={"orange"}>{ticket.status}</span></td>
                                    case "closed" :
                                        return <td className="ticket-status"><span className={"red"}>{ticket.status}</span></td>
                                }
                            })()}
                        </tr>
                    })}

                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-center margin-top-25">
                <button className="btn btn-outline-dark margin-bottom-25 margin-right-10" onClick={(e) => {
                    e.preventDefault();
                    window.history.back();
                }}>Back</button>
            </div>

        </div>
    );
}

export default SeeTickets;