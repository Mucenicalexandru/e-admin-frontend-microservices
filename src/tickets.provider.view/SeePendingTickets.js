import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import Modal from "react-modal";
import {Link} from "react-router-dom";
import {UserContext} from "../context/UserContext";

function SeePendingTickets(props) {

    const value = useContext(UserContext);
    const [responseList, setResponseList] = useState([]);

    const [ticketInModal, setTicketInModal] = useState({
        details : "",
        actionTaken : "",
        user : {

        }
    });

    const [offer, setOffer] = useState({
        serviceProviderUserId : "",
        ticketId : "",
        serviceProviderDate : Date.now(),
        serviceProviderPrice : 0
    })
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        axios.get(`/ticket/${value.department}/${value.town}/with-offers`)
            .then((response) => {
                setResponseList(response.data);
            })
    }, [value, redirect])

    const customStyles = {
        content : {
            backgroundColor       : "#e2eafc",
            borderRadius          : "10px",
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        }
    };

    let subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);


    function afterOpenModal() {
        subtitle.style.color = '#000000';
    }

    function closeModal(){
        setIsOpen(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/pending-offer/add`, offer, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(() => {
                setRedirect(!redirect);
            })
    }

    return (
        <>
            <h1 className="d-flex justify-content-center">Pending tickets</h1>
            <div className="d-flex justify-content-center">
                <form action="" onSubmit={handleSubmit}>
                    <table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Open date</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Make offer</th>
                            <th>Location</th>
                        </tr>
                        </thead>
                        <tbody>

                        {responseList.map((response, index) => {
                            return <tr key={index}>
                                <td className="index">{index+1}</td>
                                <td className="ticket-title" onClick={(e) => {
                                    e.preventDefault();
                                    const s = {...ticketInModal}
                                    s.details = response.ticket.details
                                    s.actionTaken = response.ticket.actionTaken
                                    // s.user = ticket.user;
                                    setTicketInModal(s);
                                    setIsOpen(true);
                                }}><span className={"blue-underline"}>{response.ticket.title}</span></td>
                                <td className="provider-ticket-opened-date">{response.ticket.dateOpened}</td>
                                <td className="provider-ticket-status"><span className={"green"}>{response.ticket.status}</span></td>
                                <td className={"ticket-type"}>{response.ticket.type}</td>
                                <td className="provider-ticket-price-offer"><input style={{"width" : "150px"}} type="number" placeholder="Estimate price" onChange={(e) => {
                                    const s = {...offer};
                                    s.serviceProviderPrice = +e.target.value;
                                    s.ticketId = response.ticket.ticketId;
                                    s.serviceProviderUserId = value.userId;
                                    setOffer(s);
                                }}/></td>

                                {response.pendingOffer.length > 0 ?

                                    response.pendingOffer.map((offer, index) =>{
                                        if(offer.serviceProviderUserId === value.userId){
                                            return  <td key={index}>
                                                <i>Already submitted</i>
                                            </td>
                                        }else{
                                            return  <div>
                                                <td className="ticket-make-offer">
                                                    <button type="submit" className="btn btn-outline-success btn-sm">Submit</button>
                                                </td>
                                            </div>
                                        }
                                    })
                                    :
                                    <td className="ticket-make-offer"><button type="submit" className="btn btn-outline-success btn-sm">Submit</button></td>
                                }
                                <td>
                                    <Link to={{
                                        pathname : "/see-location",
                                        address : response.ticket.street + ", " + response.ticket.number + ", " + response.ticket.town
                                    }}>See Location
                                    </Link>
                                </td>
                            </tr>

                        })}

                        </tbody>
                    </table>
                </form>


                <Modal
                    isOpen={modalIsOpen}
                    ariaHideApp={false}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={_subtitle => (subtitle = _subtitle)}>Ticket details</h2><br/>
                    <div className={"card"}>
                        <span><b>Details : </b></span><p><i>{ticketInModal.details}</i></p>
                    </div>
                    <div className={"card margin-top-15"}>
                        Action taken : <p><i>{ticketInModal.actionTaken}</i></p>
                    </div>

                    <div className={"card margin-top-15"}>{"User : " + ticketInModal.user.firstName + " " + ticketInModal.user.lastName + " - " + ticketInModal.user.phone}</div>


                    <button className="btn btn-outline-dark margin-left-5 float-right margin-top-15" onClick={closeModal}>close</button>
                </Modal>
            </div>
        </>
    );
}

export default SeePendingTickets;