import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import Modal from "react-modal";
import ReactStars from "react-rating-stars-component";
import {UserContext} from "../context/UserContext";
import {Link, Redirect} from "react-router-dom";

function TicketsAdministratorAndPersonalView(props) {

    const value = useContext(UserContext);
    let type = props.location.type;
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
    const [userRedirect, setUserRedirect] = useState(false);
    const [presidentRedirect, setPresidentRedirect] = useState(false);
    function afterOpenModal() {
        subtitle.style.color = '#000000';
    }

    function closeModal(){
        setIsOpen(false);
    }

    function closeSecondModal(){
        setSecondModalIsOpen(false);
    }

    const [responseList, setResponseList] = useState([]);
    const [group, setGroup] = useState({});
    const [building, setBuilding] = useState({});
    const [ticketId, setTicketId] = useState("");
    const [status, setStatus] = useState("opened");
    const [refresh, setRefresh] = useState(false);
    const [serviceProviderInModal, setServiceProviderInModal] = useState({});
    const [rating, setRating] = useState("");
    const [buttonVisibility, setButtonVisibility] = useState(true);
    const [reset, setReset] = useState(true);
    const [administrator, setAdministrator] = useState({});

    useEffect(() => {
        axios.get(`/group/get-by-id/${value.groupId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
            })
            .then((response) => {
                setGroup(response.data);
            })

        axios.get(`/ticket/all-by-group-with-pending-offers/${value.groupId}/${status}/${type}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
            })
            .then((response) => {
                setResponseList(response.data);
            })

        axios.get(`/user/${value.userId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
            })
            .then((response) => {
                setAdministrator(response.data);
            })

    }, [value, reset, refresh, status, type]);

    const [review, setReview] = useState({
        title : "",
        starNumber : 0,
        review : "",
        providerId : "",
        givingUserFirstName : "",
        givingUserLastName : ""
    })

    const ratingChanged = (newRating) => {
        const s = {...review};
        switch (newRating){
            case 1 :
                setRating("Not recommended");
                s.starNumber = 1;
                setReview(s);
                break;
            case 2 :
                setRating("Poor");
                s.starNumber = 2;
                setReview(s);
                break;
            case 3 :
                setRating("Acceptable");
                s.starNumber = 3;
                setReview(s);
                break;
            case 4 :
                setRating("Good");
                s.starNumber = 4;
                setReview(s);
                break;
            case 5 :
                setRating("Excellent");
                s.starNumber = 5;
                setReview(s);
                break;
            default :
                break;
        }
    };



    return (
        <div>

            {presidentRedirect && <Redirect to={{
                pathname : "/add-ticket",
                buildingId : value.buildingId,
                type : "Administrative"
            }} />}

            {userRedirect && <Redirect to={{
                pathname : "/add-ticket",
                buildingId : value.buildingId,
                type : "Personal"
            }} />}




            {type === "Administrative" ?
                <h1 className="d-flex justify-content-center">{group.officialName}</h1>
            :
                <h1 className="d-flex justify-content-center">My Tickets</h1>
            }

            <img className="card mx-auto shadow" src={`/images/${group.picture}`} alt={group.officialName} style={{"width" : "250px", "height" : "175px", "marginBottom" : "25px", "borderRadius": "10px"}}/>

            <div className={"margin-top-25"}>

                <div className="d-flex justify-content-center margin-top-25 margin-bottom-25">
                    <button type="button" className="btn btn-outline-info" onClick={(e) => {
                        e.preventDefault();
                        setButtonVisibility(!buttonVisibility);
                    }}>Advanced Search</button>
                    {value.roles.includes("PRESIDENT") &&
                    <button type="button" className="btn btn-outline-info margin-left-10" onClick={(e) => {
                        e.preventDefault();
                        setPresidentRedirect(true);
                    }}>Add Building Ticket</button>}
                    {value.roles.includes("USER") && type === "Personal" &&
                    <button type="button" className="btn btn-outline-info margin-left-10" onClick={(e) => {
                        e.preventDefault();
                        setUserRedirect(true);
                    }}>Add Personal Ticket</button>}
                </div>




                <div hidden={buttonVisibility}>
                    <div className="d-flex justify-content-center margin-top-25 margin-bottom-25">
                        <button type="button" className="btn btn-success margin-right-10" onClick={(e)=> {
                            e.preventDefault();
                            setStatus("opened")
                        }}>Opened tickets</button>
                        <button type="button" className="btn btn-warning margin-right-10" onClick={(e)=> {
                            e.preventDefault();
                            setStatus("in progress")
                        }}>In Progress tickets</button>
                        <button type="button" className="btn btn-danger margin-right-10" onClick={(e)=> {
                            e.preventDefault();
                            setStatus("closed")
                        }}>Closed Tickets</button>
                    </div>

                    <div className="d-flex justify-content-center margin-top-25 margin-bottom-25">
                        <button type="button" className="btn btn-outline-info btn-sm" hidden={buttonVisibility} onClick={(e) => {
                            e.preventDefault();
                            setButtonVisibility(!buttonVisibility);
                            setStatus("opened");
                            setReset(!reset);
                        }}>Reset search</button>
                    </div>
                </div>
            </div>

            <div>
                <table>
                    <thead>
                    <tr>
                        {type === "Administrative" && value.roles.includes("ADMINISTRATOR") ?
                            <th>Building</th>
                        :
                            <th>#</th>
                        }
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
                    {responseList.map((response, index) => {
                        if(response.ticket.status === "opened"){
                            return <tr className="openedTickets">
                                {type === "Administrative" && value.roles.includes("ADMINISTRATOR") ?
                                    <td className={"building"}><button className="btn btn-outline-dark btn-sm" onClick={(e) => {
                                        e.preventDefault();
                                        axios.get(`/building/building-and-president/${response.ticket.buildingId}`, {
                                            headers: {
                                                Authorization: 'Bearer ' + localStorage.getItem('token'),
                                            }
                                        })
                                            .then(response => {
                                                setBuilding(response.data);
                                            })
                                        setSecondModalIsOpen(true);
                                    }}>See address</button></td>
                                    :
                                    <td>{index+1}</td>
                                }

                                <td className={"ticket-title"}>{response.ticket.title}</td>
                                <td className={"ticket-department"}>{response.ticket.department}</td>
                                <td className={"ticket-opened-date"}>{response.ticket.dateOpened}</td>

                                {response.pendingOffer.length > 0
                                    ?
                                    response.pendingOffer.length === 1
                                        ?
                                        <td className="offers">
                                            <Link to={{
                                                pathname : '/pending-offers',
                                                ticketId : response.ticket.ticketId,
                                                groupId : value.groupId,
                                                buildingId : building.id,
                                                type : type}}>
                                                <button className="btn btn-outline-success btn-sm">{response.pendingOffer.length} Offer</button>
                                            </Link>
                                        </td>
                                        :
                                        <td className="offers">
                                            <Link to={{
                                                pathname : '/pending-offers',
                                                ticketId : response.ticket.ticketId,
                                                type : type
                                                }}>
                                                <button className="btn btn-outline-success btn-sm">{response.pendingOffer.length} Offers</button>
                                            </Link>
                                        </td>
                                    :
                                    <td className="offers"><i className={"red"}>No offers</i></td>
                                }

                                <td className={"ticket-accepted-date"}>-</td>
                                <td className={"assigned-service"}>-</td>
                                <td className={"ticket-closed"}>-</td>
                                <td className="status"><span className={"green"}>{response.ticket.status}</span></td>
                            </tr>
                        }else if(response.ticket.status === "closed"){
                            return <tr className="closedTickets">
                                {type === "Administrative" && value.roles.includes("ADMINISTRATOR") ?
                                    <td className={"building"}>
                                        <button className="btn btn-outline-dark btn-sm" onClick={(e) => {
                                            e.preventDefault();
                                            axios.get(`/building/building-and-president/${response.ticket.buildingId}`, {
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
                                    :
                                    <td>{index+1}</td>
                                }
                                <td className={"ticket-title"}>{response.ticket.title}</td>
                                <td className={"ticket-department"}>{response.ticket.department}</td>
                                <td className={"ticket-opened-date"}>{response.ticket.dateOpened}</td>
                                <td className="offers"><i className={"green"}>Offer accepted</i></td>
                                <td className={"ticket-accepted-date"}>{response.ticket.dateAccepted}</td>
                                <td className={"assigned-service"}>
                                        <Link to={{
                                            pathname : '/assigned-service-provider',
                                            providerId : response.ticket.assignedServiceProviderUserId,
                                            groupId : value.groupId,
                                            type : type}}>See assigned provider
                                        </Link>
                                </td>
                                <td className={"ticket-closed"}>{response.ticket.dateClosed}</td>
                                <td className="status"><span className={"red"}>{response.ticket.status}</span></td>
                            </tr>
                        }else
                            return <tr className="progressTickets">
                                {type === "Administrative" && value.roles.includes("ADMINISTRATOR") ?
                                    <td className={"building"}>
                                        <button className="btn btn-outline-dark btn-sm" onClick={(e) => {
                                            e.preventDefault();
                                            axios.get(`/building/building-and-president/${response.ticket.buildingId}`, {
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
                                    :
                                    <td>{index + 1}</td>
                                }
                                <td className={"ticket-title"}>{response.ticket.title}</td>
                                <td className={"ticket-department"}>{response.ticket.department}</td>
                                <td className={"ticket-opened-date"}>{response.ticket.dateOpened}</td>
                                <td className="offers"><i className={"green"}>Offer accepted</i></td>
                                <td className={"ticket-accepted-date"}>{response.ticket.dateAccepted}</td>
                                <td className={"assigned-service"}>
                                    <Link to={{
                                        pathname : '/assigned-service-provider',
                                        providerId : response.ticket.assignedServiceProviderUserId,
                                        groupId : value.groupId}}>See assigned provider
                                    </Link>
                                </td>
                                <td className={"ticket-closed"}>
                                    <button className="btn btn-outline-dark btn-sm" onClick={(e) => {
                                        e.preventDefault();
                                        response.ticket && setTicketId(response.ticket.ticketId);
                                        axios.get(`/user/${response.ticket.assignedServiceProviderUserId}`, {
                                            headers: {
                                                Authorization: 'Bearer ' + localStorage.getItem('token'),
                                            }
                                        })
                                            .then(response => {
                                                setServiceProviderInModal(response.data);
                                            })
                                        setIsOpen(true)
                                        setRating("")}
                                    }>Mark as done
                                    </button>
                                </td>
                                <td className="status"><span className={"orange"}>{response.ticket.status}</span></td>
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
                    <b>{building.building && building.building.street + ", " + building.building.number} </b>
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
            <Modal
                isOpen={modalIsOpen}
                ariaHideApp={false}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <h6 className={"margin-bottom-25"} ref={_subtitle => (subtitle = _subtitle)}><b>Write a review for : </b>{serviceProviderInModal.lastName + " " + serviceProviderInModal.firstName}</h6>

                <div ref={_subtitle => (subtitle = _subtitle)}>


                    <div className="container">
                        <div className="row">
                            <b style={{"marginTop" : "6px", "marginRight" : "2.5px"}}>Rating : </b>
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={24}
                                activeColor="#ffd700"
                            />
                            <div style={{"marginTop" : "6px", "marginLeft" : "10px"}}>{rating}</div>
                        </div>
                    </div>

                    <div className={"margin-top-25"}><b>Review title : </b></div>
                    <input style={{"width" : "291px"}} type="text" placeholder={"Mandatory"} onChange={(e) => {
                        const s = {...review};
                        s.title = e.target.value;
                        s.providerId = serviceProviderInModal.userId;
                        s.givingUserFirstName = administrator.firstName;
                        s.givingUserLastName = administrator.lastName;
                        setReview(s);
                    }}/>

                    <div  className={"margin-top-25"}><b>Review : </b></div>
                    <textarea name="" id="" cols="30" rows="5" placeholder={"Describe your experience with the provider"} onChange={(e) => {
                        const s = {...review};
                        s.review = e.target.value;
                        setReview(s);
                    }}> </textarea>

                </div>

                <div className="d-flex justify-content-center margin-top-25">
                    <button className="btn btn-outline-primary margin-left-5" onClick={(e) => {
                        e.preventDefault();
                        axios.post(`/review/add`, review, {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('token'),
                            }
                        })
                            .then(() => {
                                console.log("Review added")
                            });


                        axios.put(`/ticket/close/${ticketId}`, null, {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('token'),
                            }
                        })
                            .then(() => {
                                closeModal();
                                setRefresh(!refresh);
                            });

                    }}>Submit review</button>
                </div>

            </Modal>

        </div>
    );
}

export default TicketsAdministratorAndPersonalView;