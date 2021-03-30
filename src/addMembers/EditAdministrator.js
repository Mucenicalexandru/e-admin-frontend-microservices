import React, {useEffect, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import SaveButton from "../buttons/SaveButton";
import axios from "axios";


function EditAdministrator(props) {

    let groupId = props.location.groupId;
    let linkFromGroup = props.location.linkFromGroup;
    let comingFrom = props.location.comingFrom;
    let userId = props.location.userId;
    let administratorFirstName = props.location.administratorFirstName;
    let administratorLastName = props.location.administratorLastName;
    let administratorPhone = props.location.administratorPhone;


    const [redirect, setRedirect] = useState(false);

    const [administrator, setAdministrator] = useState({
        firstName : administratorFirstName,
        lastName : administratorLastName,
        phone : administratorPhone
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/user/edit/${userId}`, administrator, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(() => {
                setRedirect(true);
            })
    }

    return (
        <>
            <h1 className="d-flex justify-content-center" >Edit Administrator</h1>
            <div className="d-flex justify-content-center margin-top-25">
                {comingFrom === "users-statistics" ?
                    redirect && <Redirect to={{
                        pathname : "/users-statistics"
                    }} />
                :
                    redirect && <Redirect to={{
                        pathname : "/group",
                        groupId : groupId
                    }} />}

                <form action="" onSubmit={handleSubmit}>
{/*ADMINISTRATOR FIRST NAME*/}
                    <div>
                        <input className={"margin-top-25"} type="text" value={administrator.firstName} name="firstName"
                               onChange={(e) => {
                                   const s = {...administrator}
                                   s.firstName = e.target.value;
                                   setAdministrator(s);
                               }}
                        required/>
                    </div>
{/*ADMINISTRATOR LAST NAME*/}
                    <div>
                        <input className={"margin-top-25"} type="text"  value={administrator.lastName} name="lastName"  onChange={e => {
                            const s = {...administrator};
                            s.lastName = e.target.value;
                            setAdministrator(s);
                        }} required />
                    </div>

{/*ADMINISTRATOR PHONE*/}
                    <div>
                        <input className={"margin-top-25"} type="text"  value={administrator.phone} name="phone"  onChange={e => {
                            const s = {...administrator};
                            s.phone = e.target.value;
                            setAdministrator(s);
                        }} required />
                    </div>

                    {linkFromGroup ?
                    <Link to={{
                        pathname : '/group',
                        groupId : groupId}}>
                        <button className="btn btn-outline-danger margin-top-25">Cancel</button>
                    </Link>
                        :
                        <Link to={{
                            pathname : '/users-statistics'
                            }}>
                            <button className="btn btn-outline-danger margin-top-25">Cancel</button>
                        </Link>
                    }

                    <SaveButton name={"Update"} />

                </form>

            </div>
        </>
    );
}

export default EditAdministrator;