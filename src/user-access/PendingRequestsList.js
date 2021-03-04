import React, {useContext, useEffect, useState} from 'react';
import Modal from 'react-modal';
import axios from "axios";
import {UserContext} from "../UserContext";

function PendingRequestsList(props) {

    const value = useContext(UserContext);

    const customStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        }
    };

    const [userInModal, setUserInModal] = useState({
        id : "",
        firstName : "",
        lastName : "",
        email : "",
        phone : "",
        buildingStreet : "",
        buildingNumber : "",
        buildingName : "",
        buildingEntrance : "",
        town : "",
        country : "",
        other : "",
        userStatus : ""

    })

    const [buildingId, setBuildingId] = useState("");

    let groupId = props.location.groupId;
    const [group, setGroup] = useState("");

    let subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);


    function afterOpenModal() {
        subtitle.style.color = '#000000';
    }

    function closeModal(){
        setIsOpen(false);
    }

    const [redirect, setRedirect] = useState(true);
    const [request, setRequest] = useState({});



    useEffect(() => {
        axios.get(`/api/group/${groupId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then(response => {
                setGroup(response.data);
            })
    }, [value, redirect]);


    return (
        <>
            <h1 className="d-flex justify-content-center">{group.officialName}</h1>


            {group.buildings && group.buildings.map((building, index) =>{
                return building.users.map((request, index) => {
                    return request.userStatus === "PENDING" && <div key={index} className="d-flex justify-content-center margin-top-25">
                        <li onClick={(e) => {
                            setIsOpen(true);
                            const c = {...userInModal}
                            c.id = request.id;
                            c.firstName = request.firstName;
                            c.lastName = request.lastName;
                            c.phone = request.phone;
                            c.email = request.email;
                            c.buildingStreet = request.buildingStreet;
                            c.buildingNumber = request.buildingNumber;
                            c.buildingName = request.buildingName;
                            c.buildingEntrance = request.buildingEntrance;
                            c.town = request.town;
                            c.country = request.country;
                            c.other = request.other;
                            c.userStatus = request.userStatus;
                            setUserInModal(c);
                            setBuildingId(building.id);
                            setRequest(request);
                        }} className={"blue-underline"}>
                            {request.firstName} {request.lastName} - {request.buildingStreet}, {request.buildingNumber}
                        </li>
                    </div>
                })
            })}

            <Modal
                isOpen={modalIsOpen}
                ariaHideApp={false}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <h2 ref={_subtitle => (subtitle = _subtitle)}>User Request</h2>
                <br/>
                <div>First name : <i className={"float-right"}>{userInModal.firstName}</i></div>
                <div>Last name : <i className={"float-right"}>{userInModal.lastName}</i></div>
                <div>Email : <i className={"float-right"}>{userInModal.email}</i></div>
                <div>Phone : <i className={"float-right"}>{userInModal.phone}</i></div>
                <div>Building street : <i className={"float-right"}>{userInModal.buildingStreet}</i></div>
                <div>Building number : <i className={"float-right"}>{userInModal.buildingNumber}</i></div>
                <div>Building name : <i className={"float-right"}>{userInModal.buildingName}</i></div>
                <div>Building entrance : <i className={"float-right"}>{userInModal.buildingEntrance}</i></div>
                <div>Town : <i className={"float-right"}>{userInModal.town}</i></div>
                <div>Country : <i className={"float-right"}>{userInModal.country}</i></div>
                <div>Other : <i className={"float-right"}>{userInModal.other}</i></div>
                <div>Status : <i className={"float-right"}>{userInModal.userStatus}</i></div>
                <button className="btn btn-outline-success" onClick={e => {
                    e.preventDefault();
                    console.log(userInModal.id)
                    axios.put(`/api/accept-user/${userInModal.id}`, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                        .then(() => {
                            setRedirect(!redirect)
                        })
                        .catch((err) => {
                            console.log(err)
                        });

                    closeModal();
                }}>Accept</button>

                <button className="btn btn-outline-danger margin-left-5" onClick={e => {
                    e.preventDefault();
                    axios.put(`/api/reject-user/${userInModal.id}`, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token'),
                        }
                    })
                        .then(() =>{
                            setRedirect(!redirect)
                        })
                    window.location.href = `http://localhost:3000/pending-requests/${value.userId}`;
                }}>Reject</button>

                <button className="btn btn-outline-dark float-right margin-left-5"  onClick={closeModal}>close</button>

            </Modal>
        </>
    );
}

export default PendingRequestsList;