import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import {departments} from "../util/departments";
import {UserContext} from "../context/UserContext";

function AddNewTicket(props) {

    const value = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);
    const [ticket, setTicket] = useState({
        title : "",
        buildingId : "",
        groupId : "",
        details : "",
        actionTaken : "",
        department : "",
        type : "",
        street : "",
        number : "",
        town : ""

    });

    useEffect(() => {
        axios.get(`/building/${value.buildingId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then((response) => {
                const s = {...ticket}
                s.street = response.data.street;
                s.number = response.data.number;
                s.town = response.data.town;
                setTicket(s);
                setIsLoading(false);
            })
    }, [isLoading])


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/ticket/add`, ticket, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then(() => {
                setRedirect(true);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <div className="d-flex justify-content-center">

                {value.roles.includes("PRESIDENT") &&  redirect &&
                    <Redirect to={{
                        pathname : "/tickets",
                        buildingId : value.buildingId
                    }} />
                }
                {value.roles.includes("USER") &&  redirect &&
                <Redirect to={{
                    pathname : "/user-personal-tickets",
                    buildingId : value.buildingId
                }} />
                }


                <form action="" onSubmit={handleSubmit}>
                    {value.roles.includes("USER") ?
                        <h1>Add Personal Ticket</h1>
                        :
                        <h1>Add Ticket</h1>
                    }

{/*DEPARTMENT*/}
                    <div className="input-group mb-3 margin-top-25">

                        <select className="custom-select" id="inputGroupSelect01" required value={ticket.department} onChange={e =>{
                            const s = {...ticket};
                            value.roles.includes("USER") ?
                                s.type = "Personal"
                                :
                                s.type = "Administrative";

                            s.department = e.target.value;
                            s.buildingId = value.buildingId;
                            s.groupId = value.groupId;
                            setTicket(s);
                        }}>
                            <option value="" selected>Select department...</option>
                            {departments.map((department, index) => {
                                return <option key={index} value={department}>{department}</option>
                            })}
                        </select>
                    </div>
{/*TITLE*/}
                    <div>
                        <input className={"poll-input"} type="text" name="title" value={ticket.title} required placeholder="Title"
                               onChange={e => {
                                   const s = {...ticket};
                                   s.title = e.target.value;
                                   setTicket(s);
                               }}/>
                    </div>
{/*DETAILS*/}
                    <div>
                <textarea className={"poll-input"}  name="details" value={ticket.details} required placeholder="Details"
                          onChange={e => {
                              const s = {...ticket};
                              s.details = e.target.value;
                              setTicket(s);
                          }}/>
                    </div>
{/*ACTION TAKEN*/}
                    <div>
                    <textarea className={"poll-input"}  name="actionTaken" value={ticket.actionTaken}  placeholder="Action Taken"
                              onChange={e => {
                                  const s = {...ticket};
                                  s.actionTaken = e.target.value;
                                  setTicket(s);
                              }}/>
                    </div>
                    <Link to={{
                        pathname : "/tickets",
                        buildingId : value.buildingId
                    }}>
                        <button type="submit" className="btn btn-outline-secondary margin-top-25 float-left">Back</button>
                    </Link>
                    <button type="submit" className="btn btn-outline-secondary margin-top-25 float-right">Submit</button>

                </form>
            </div>
                </>
    );
}

export default AddNewTicket;