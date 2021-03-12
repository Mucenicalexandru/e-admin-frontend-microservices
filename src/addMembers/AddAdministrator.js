import React, { useState } from 'react';
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import SaveButton from "../buttons/SaveButton";

function AddAdministrator(props) {

    let groupId = props.location.groupId;
    let email = props.location.email;
    const [redirect, setRedirect] = useState(false);

    const [administrator, setAdministrator] = useState({
        firstName : "",
        lastName : "",
        phone : "",
        groupId : "",
        email : ""
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/user/add-administrator`, administrator, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(() => {
                setRedirect(true);
            });
    }

    return (
        <>
            <h1 className="d-flex justify-content-center" >Add Administrator</h1>
            <div className="d-flex justify-content-center margin-top-25">
                {redirect && <Redirect to={{
                    pathname : "/group",
                    groupId : groupId
                }} />}
                <form action="" onSubmit={handleSubmit}>
{/*ADMINISTRATOR FIRST NAME*/}
                <div>
                    <input className={"margin-top-25"} type="text" name="firstName"  onChange={e => {
                        const s = {...administrator};
                        s.firstName = e.target.value;
                        s.groupId = groupId;
                        s.email = email;
                        setAdministrator(s);
                    }} required placeholder="First Name"/>
                </div>
{/*ADMINISTRATOR LAST NAME*/}
                <div>
                    <input className={"margin-top-25"} type="text"  name="lastName"  onChange={e => {
                        const s = {...administrator};
                        s.lastName = e.target.value;
                        setAdministrator(s);
                    }} required placeholder="Last Name"/>
                </div>

{/*ADMINISTRATOR PHONE*/}
                <div>
                    <input className={"margin-top-25"} type="text"  name="phone"  onChange={e => {
                    const s = {...administrator};
                    s.phone = e.target.value;
                    setAdministrator(s);
                    }} required placeholder="Phone"/>
                </div>

                <Link to={{
                    pathname : '/group',
                    groupId : groupId}}>
                    <button className="btn btn-outline-danger margin-top-25">Cancel</button>
                </Link>

                <SaveButton name={"Add"}/>

                </form>

            </div>
        </>
    );
}

export default AddAdministrator;