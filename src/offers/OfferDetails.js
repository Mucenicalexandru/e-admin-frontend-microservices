import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Link, Redirect} from 'react-router-dom';
import {UserContext} from "../context/UserContext";

function OfferDetails(props) {

    let ticketId = props.location.ticketId;
    const value = useContext(UserContext);
    const [response, setResponse] = useState({});
    const [administratorRedirect, setAdministratorRedirect] = useState(false);
    const [userRedirect, setUserRedirect] = useState(false);

    useEffect(() => {
        axios.get(`/ticket/${ticketId}/with-offers`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then(response => {
                setResponse(response.data);
            })
    }, [ticketId])


    return (
        <div>
            {administratorRedirect && <Redirect to={{
                pathname : "/see-offers",
                groupId : value.groupId
            }} />}

            {userRedirect && <Redirect to={{
                pathname : "/user-personal-tickets"
            }} />}

            {response.pendingOffer && response.pendingOffer.length > 0
                ?
                <div>
                    <h2 className="d-flex justify-content-center">Ticket : {response.ticket.title}</h2>
                    <h2 className="d-flex justify-content-center">Department : {response.ticket.department.toUpperCase()}</h2>
                </div>
                :
                <h4 className="d-flex justify-content-center" style={{"marginTop" : "150px"}}>No offers received yet</h4>
            }

            {response.pendingOffer && response.pendingOffer.map((offer, index) => {
                return  <div key={index} className="card mx-auto card shadow">
                    <div className="card-body">
                        <h5 className="card-title"><i className="fas fa-user"> </i> {offer.serviceProviderFirstName + " " + offer.serviceProviderLastName}</h5>

                        <div className="rating">
                            Rating :
                            <i className="fas fa-star fa-sm text-warning"> </i>
                            <i className="fas fa-star fa-sm text-warning"> </i>
                            <i className="fas fa-star fa-sm text-warning"> </i>
                            <i className="fas fa-star fa-sm text-warning"> </i>
                            <i className="far fa-star fa-sm text-warning"> </i>
                        </div>
                        {/*{offer.serviceProvider.reviews.length > 0 ?*/}
                        {/*    <p>*/}
                        {/*        <Link to={{*/}
                        {/*            pathname : "/review-details",*/}
                        {/*            providerId : offer.serviceProvider.id}}>{offer.serviceProvider.reviews.length} reviews</Link>*/}
                        {/*    </p>*/}
                        {/*    :*/}
                        {/*    <p>No reviews</p>*/}
                        {/*}*/}
                        <br/>
                        <p><i className="fas fa-phone"> </i> {offer.serviceProviderPhone}</p>
                        <p><i className="fas fa-envelope" > </i><span className={"blue-underline"}>{offer.serviceProviderEmail}</span></p>
                        <p className="card-body"><b className="d-flex justify-content-center">Price : {offer.serviceProviderPrice} RON</b></p>

                        <p><i className="fas fa-calendar-alt"> </i> Received on : {offer.serviceProviderDate}</p>

                        <button type="submit" className="btn btn-outline-success float-right margin-top-25" onClick={(e) => {
                            e.preventDefault();
                            axios.put(`/ticket/accept-offer/${ticketId}`, offer, {
                                headers: {
                                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                                }
                            })
                                .then(() => {
                                    console.log("Added")
                                })
                            axios.delete(`/pending-offer/all/${response.ticket.ticketId}`, {
                                headers: {
                                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                                }
                            })
                                .then(() => {
                                    if(value.roles.includes("ADMINISTRATOR")){
                                        setAdministratorRedirect(true);
                                    }else{
                                        setUserRedirect(true);
                                    }
                                })
                        }}>Accept
                        </button>


                        <button className="btn btn-outline-danger margin-top-25" onClick={(e) => {
                            e.preventDefault();
                            axios.delete(`/api/reject-pending_service_offer/${offer.id}`, {
                                headers: {
                                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                                }
                            })
                                .then(() => {
                                    if(value.roles.includes("ADMINISTRATOR")){
                                        setAdministratorRedirect(true);
                                    }else{
                                        setUserRedirect(true);
                                    }
                                })
                        }}>Reject
                        </button>
                    </div>

                </div>

            })}
            {/*<div className="d-flex justify-content-center margin-top-25">*/}
            {/*    <Link to={{*/}
            {/*        pathname : "/see-offers",*/}
            {/*        groupId : groupId*/}
            {/*    }}>*/}
            {/*        <button className="btn btn-outline-dark margin-right-5 margin-bottom-25">Back</button>*/}
            {/*    </Link>*/}
            {/*</div>*/}

        </div>
    );
}

export default OfferDetails;