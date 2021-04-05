import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../context/UserContext";
import axios from "axios";
import {Link} from "react-router-dom";

function WonTickets(props) {

    const value = useContext(UserContext);
    const [myTicketList, setMyTicketList] = useState([]);

    useEffect(() => {
        axios.get(`/ticket/assigned-service-provider/${value.userId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setMyTicketList(response.data);
            })
    }, [value])


    return (
        <>
            <h1 className="d-flex justify-content-center">My Tickets</h1>
            <div className="d-flex justify-content-center">
                <table>
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Details</th>
                        <th scope="col">Type</th>
                        <th scope="col">Date accepted</th>
                        <th scope="col">Offered price</th>
                        <th scope="col">Status</th>
                        <th scope="col">Ticket status</th>
                        <th scope="col">See location</th>
                    </tr>
                    </thead>
                    <tbody>
                    {myTicketList.map((ticket, index) =>{
                        return  <tr>
                            <td className="index">{index + 1}</td>
                            <td className="ticket-title">{ticket.title}</td>
                            <td className="ticket-details">{ticket.details}</td>
                            <td className={"won-ticket-type"}>{ticket.type}</td>
                            <td className={"won-ticket-date-accepted"}>{ticket.dateAccepted}</td>
                            <td className={"ticket-total-price"}>{ticket.totalPrice} RON</td>
                            <td className="tickets-won"><i className={"green"}>Won</i></td>
                            <td>
                                {ticket.status === "closed" && <i className={"red"}>{ticket.status}</i>}
                                {ticket.status === "in progress" && <i className={"orange"}>{ticket.status}</i>}
                                {ticket.status === "opened" && <i className={"green"}>{ticket.status}</i>}

                            </td>
                            <td>
                                <Link to={{
                                    pathname : "/see-location",
                                    address : ticket.street + ", " + ticket.number + ", " + ticket.town
                                }}>See Location</Link>
                            </td>
                        </tr>
                    })}

                    </tbody>
                </table>
            </div>

        </>
    );
}

export default WonTickets;