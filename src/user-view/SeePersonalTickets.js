import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../context/UserContext";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Modal from "react-modal";

function SeePersonalTickets(props) {

    const value = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [ticketList, setTicketList] = useState([]);
    const [status, setStatus] = useState("opened");

    useEffect(() => {
        axios.get(`/ticket/get-all-filter/${status}/Personal/${value.buildingId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then((response) => {
                setTicketList(response.data);
            })
    }, [value])


    return (
        <>

            <h1 className="d-flex justify-content-center">My Tickets</h1>

            {redirect && <Redirect to={{
                pathname : "/add-ticket",
            }} />}

            <div className="d-flex justify-content-center margin-25">
                <button className="btn btn-outline-primary" onClick={(e) => {
                    e.preventDefault();
                    setRedirect(true);
                }}>Add ticket</button>
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

        </>
    );
}

export default SeePersonalTickets;