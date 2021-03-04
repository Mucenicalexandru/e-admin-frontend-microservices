import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import Modal from "react-modal";
import {UserContext} from "../context/UserContext";

function TicketsAdministratorView(props) {

    const value = useContext(UserContext);

    const customStyles = {
        content : {
            backgroundColor       : "#e2eafc",
            borderRadius          : "10px",
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
        }
    };

    let subtitle;
    const [modalIsOpen,setIsOpen] = useState(false);
    const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);

    function afterOpenModal() {
        subtitle.style.color = '#000000';
    }

    function closeModal(){
        setIsOpen(false);
    }

    function closeSecondModal(){
        setSecondModalIsOpen(false);
    }

    const [ticketList, setTicketList] = useState([]);
    const [group, setGroup] = useState({});
    const [building, setBuilding] = useState({});

    useEffect(() => {
        axios.get(`/group/get-by-id/${value.groupId}`)
            .then((response) => {
                setGroup(response.data);
            })

        axios.get(`/ticket/by-group/${value.groupId}`)
            .then((response) => {
                setTicketList(response.data);
            })

    }, [value]);


    return (
        <div>

            <h1 className="d-flex justify-content-center">{group.officialName}</h1>
            <img className="card mx-auto shadow" src={`/images/${group.picture}`} alt={group.officialName} style={{"width" : "250px", "height" : "175px", "marginBottom" : "25px", "borderRadius": "10px"}}/>

            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Building</th>
                        <th>Ticket title</th>
                        <th>Department</th>
                        <th>Date opened</th>
                        <th>Received Offers</th>
                        <th>Date accepted</th>
                        <th>Assigned Service Provider</th>
                        <th>Date closed</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ticketList.map((ticket, index) => {
                        if(ticket.status === "opened"){
                            return <tr className="openedTickets">
                                <td className={"building"}><button className="btn btn-outline-dark btn-sm" onClick={(e) => {
                                    e.preventDefault();
                                    axios.get(`/building/${ticket.buildingId}`, {
                                        headers: {
                                            Authorization: 'Bearer ' + localStorage.getItem('token'),
                                        }
                                    })
                                        .then(response => {
                                            setBuilding(response.data);
                                        })
                                    setSecondModalIsOpen(true);
                                }}>See address</button></td>
                                <td className={"ticket-title"}>{ticket.title}</td>
                                <td className={"ticket-department"}>{ticket.department}</td>
                                <td className={"ticket-opened-date"}>{ticket.dateOpened}</td>
                                {/*TODO to fix here pending service offer will contain a ticket id*/}
                                {/*{ticket.pendingServiceOffers.length > 0*/}
                                {/*    ?*/}
                                {/*    ticket.pendingServiceOffers.length === 1*/}
                                {/*        ?*/}
                                {/*        <td className="offers">*/}
                                {/*            <Link to={{*/}
                                {/*                pathname : '/pending-offers',*/}
                                {/*                ticketId : ticket.id,*/}
                                {/*                groupId : groupId,*/}
                                {/*                buildingId : building.id}}>*/}
                                {/*                <button className="btn btn-outline-success btn-sm">{ticket.pendingServiceOffers.length} Offer</button>*/}
                                {/*            </Link>*/}
                                {/*        </td>*/}
                                {/*        :*/}
                                {/*        <td className="offers">*/}
                                {/*            <Link to={{*/}
                                {/*                pathname : '/pending-offers',*/}
                                {/*                ticketId : ticket.id,*/}
                                {/*                groupId : groupId,*/}
                                {/*                buildingId : building.id}}>*/}
                                {/*                <button className="btn btn-outline-success btn-sm">{ticket.pendingServiceOffers.length} Offers</button>*/}
                                {/*            </Link>*/}
                                {/*        </td>*/}
                                {/*    :*/}
                                {/*    <td className="offers"><i className={"red"}>No offers</i></td>*/}
                                {/*}*/}
                                <td className="offers"><i className={"red"}>TO FIX</i></td>
                                <td className={"ticket-accepted-date"}>-</td>
                                <td className={"assigned-service"}>-</td>
                                <td className={"ticket-closed"}>-</td>
                                <td className="status"><span className={"green"}>{ticket.status}</span></td>
                            </tr>
                        }else if(ticket.status === "closed"){
                            return <tr className="closedTickets">
                                <td className={"building"}>
                                    <button className="btn btn-outline-dark btn-sm" onClick={(e) => {
                                        e.preventDefault();
                                        axios.get(`/building/${ticket.buildingId}`, {
                                            headers: {
                                                Authorization: 'Bearer ' + localStorage.getItem('token'),
                                            }
                                        })
                                            .then(response => {
                                                setBuilding(response.data);
                                            })
                                        setSecondModalIsOpen(true);
                                    }}>See address
                                    </button>
                                </td>
                                <td className={"ticket-title"}>{ticket.title}</td>
                                <td className={"ticket-department"}>{ticket.department}</td>
                                <td className={"ticket-opened-date"}>{ticket.dateOpened}</td>
                                <td className="offers"><i className={"green"}>Offer accepted</i></td>
                                <td className={"ticket-accepted-date"}>{ticket.dateAccepted}</td>
                                {/*<td className={"assigned-service"}>*/}
                                {/*    <Link to={{*/}
                                {/*        pathname : '/assigned-service-provider',*/}
                                {/*        providerId : ticket.assignedServiceProvider.id,*/}
                                {/*        groupId : groupId}}>{ticket.assignedServiceProvider.firstName + " " + ticket.assignedServiceProvider.lastName}*/}
                                {/*    </Link>*/}
                                {/*</td>*/}
                                {/*TODO to fix here*/}
                                <td className="offers"><i className={"red"}>TO FIX</i></td>
                                <td className={"ticket-closed"}>{ticket.dateClosed}</td>
                                <td className="status"><span className={"red"}>{ticket.status}</span></td>
                            </tr>
                        }else
                            return <tr className="progressTickets">
                                <td className={"building"}>
                                    <button className="btn btn-outline-dark btn-sm" onClick={(e) => {
                                        e.preventDefault();
                                        axios.get(`/building/${ticket.buildingId}`, {
                                            headers: {
                                                Authorization: 'Bearer ' + localStorage.getItem('token'),
                                            }
                                        })
                                            .then(response => {
                                                setBuilding(response.data);
                                            })
                                        setSecondModalIsOpen(true);
                                    }}>See address
                                    </button>
                                </td>
                                <td className={"ticket-title"}>{ticket.title}</td>
                                <td className={"ticket-department"}>{ticket.department}</td>
                                <td className={"ticket-opened-date"}>{ticket.dateOpened}</td>
                                <td className="offers"><i className={"green"}>Offer accepted</i></td>
                                <td className={"ticket-accepted-date"}>{ticket.dateAccepted}</td>
                                {/*<td className={"assigned-service"}>*/}
                                {/*    <Link to={{*/}
                                {/*        pathname : '/assigned-service-provider',*/}
                                {/*        providerId : ticket.assignedServiceProvider.id,*/}
                                {/*        groupId : groupId}}>{ticket.assignedServiceProvider.firstName + " " + ticket.assignedServiceProvider.lastName}*/}
                                {/*    </Link>*/}
                                {/*</td>*/}
                                {/*<td className={"ticket-closed"}>*/}
                                {/*    <button className="btn btn-outline-dark btn-sm" onClick={(e) => {*/}
                                {/*        e.preventDefault();*/}
                                {/*        axios.get(`/api/user/${ticket.assignedServiceProvider.id}`, {*/}
                                {/*            headers: {*/}
                                {/*                Authorization: 'Bearer ' + localStorage.getItem('token'),*/}
                                {/*            }*/}
                                {/*        })*/}
                                {/*            .then(response => {*/}
                                {/*                setServiceProviderInModal(response.data);*/}
                                {/*                setTicketId(ticket.id);*/}
                                {/*            })*/}
                                {/*        setIsOpen(true)*/}
                                {/*        setRating("")}*/}
                                {/*    }>Mark as done*/}
                                {/*    </button>*/}
                                {/*</td>*/}
                                <td className="status"><span className={"orange"}>{ticket.status}</span></td>
                            </tr>
                    })}
                    </tbody>
                </table>
            </div>

{/*MODAL FOR BUILDING DETAILS AND ADDRESS*/}
            <Modal
                isOpen={secondModalIsOpen}
                ariaHideApp={false}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeSecondModal}
                style={customStyles}
                contentLabel="Example Modal"
            >


                <h6 className={"margin-bottom-25"} ref={_subtitle => (subtitle = _subtitle)}>
                    <b>{building.street + ", " + building.number} </b>
                </h6>

                <div ref={_subtitle => (subtitle = _subtitle)}>

                    <h5>President : {building.president && building.president.lastName + " " + building.president.firstName}</h5>
                    <br/>
                    <p><i className="fas fa-phone"> </i> {building.president && building.president.phone}</p>
                    <p><i className="fas fa-envelope"> </i> {building.president && building.president.email}</p>


                    <button className="btn btn-outline-secondary" onClick={(e) => {
                        e.preventDefault();
                        setSecondModalIsOpen(false)
                    }}>Close</button>

                </div>

            </Modal>

{/*MODAL FOR CLOSING THE TICKET AND GIVING THE REVIEW*/}
{/*            <Modal*/}
{/*                isOpen={modalIsOpen}*/}
{/*                ariaHideApp={false}*/}
{/*                onAfterOpen={afterOpenModal}*/}
{/*                onRequestClose={closeModal}*/}
{/*                style={customStyles}*/}
{/*                contentLabel="Example Modal"*/}
{/*            >*/}

{/*                <h6 className={"margin-bottom-25"} ref={_subtitle => (subtitle = _subtitle)}><b>Write a review for : </b>{serviceProviderInModal.lastName + " " + serviceProviderInModal.firstName}</h6>*/}

{/*                <div ref={_subtitle => (subtitle = _subtitle)}>*/}


{/*                    <div className="container">*/}
{/*                        <div className="row">*/}
{/*                            <b style={{"marginTop" : "6px", "marginRight" : "2.5px"}}>Rating : </b>*/}
{/*                            <ReactStars*/}
{/*                                count={5}*/}
{/*                                onChange={ratingChanged}*/}
{/*                                size={24}*/}
{/*                                activeColor="#ffd700"*/}
{/*                            />*/}
{/*                            <div style={{"marginTop" : "6px", "marginLeft" : "10px"}}>{rating}</div>*/}
{/*                        </div>*/}
{/*                    </div>*/}

{/*                    <div className={"margin-top-25"}><b>Review title : </b></div>*/}
{/*                    <input style={{"width" : "291px"}} type="text" placeholder={"Mandatory"} onChange={(e) => {*/}
{/*                        const s = {...review};*/}
{/*                        s.title = e.target.value;*/}
{/*                        setReview(s);*/}
{/*                    }}/>*/}

{/*                    <div  className={"margin-top-25"}><b>Review : </b></div>*/}
{/*                    <textarea name="" id="" cols="30" rows="5" placeholder={"Describe your experience with the provider"} onChange={(e) => {*/}
{/*                        const s = {...review};*/}
{/*                        s.review = e.target.value;*/}
{/*                        setReview(s);*/}
{/*                    }}> </textarea>*/}

{/*                </div>*/}

{/*                <div className="d-flex justify-content-center margin-top-25">*/}
{/*                    <button className="btn btn-outline-primary margin-left-5" onClick={(e) => {*/}
{/*                        e.preventDefault();*/}
{/*                        axios.post(`/api/add-review/${serviceProviderInModal.id}`, review, {*/}
{/*                            headers: {*/}
{/*                                Authorization: 'Bearer ' + localStorage.getItem('token'),*/}
{/*                            }*/}
{/*                        })*/}
{/*                            .then(() => {*/}
{/*                                console.log("Review added")*/}
{/*                            });*/}

{/*                        axios.put(`/api/close-ticket/${ticketId}`, {*/}
{/*                            headers: {*/}
{/*                                Authorization: 'Bearer ' + localStorage.getItem('token'),*/}
{/*                            }*/}
{/*                        })*/}
{/*                            .then(() => {*/}
{/*                                closeModal();*/}
{/*                                setRefresh(!refresh);*/}
{/*                            });*/}

{/*                    }}>Submit review</button>*/}
{/*                </div>*/}

{/*            </Modal>*/}

        </div>
    );
}

export default TicketsAdministratorView;