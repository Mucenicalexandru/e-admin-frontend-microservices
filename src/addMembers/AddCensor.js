import React, { useState} from 'react';
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import SaveButton from "../buttons/SaveButton";


function AddCensor(props) {

    let groupId = props.location.groupId;
    const [redirect, setRedirect] = useState(false);
    const [censor, setCensor] = useState({
        firstName : "",
        lastName : "",
        phone : "",
        groupId : ""
    })


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/user/add-censor`, censor, {
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
            <h1 className="d-flex justify-content-center" >Add Censor</h1>
            <div className="d-flex justify-content-center margin-top-25">
                {redirect && <Redirect to={{
                    pathname : "/group",
                    groupId : groupId
                }} />}
                <form action="" onSubmit={handleSubmit}>
{/*ADMINISTRATOR FIRST NAME*/}
                    <div>
                        <input type="text" name="firstName"  onChange={e => {
                            const s = {...censor};
                            s.firstName = e.target.value;
                            s.groupId = groupId;
                            setCensor(s);
                        }} required placeholder="First Name"/>
                    </div>
{/*ADMINISTRATOR LAST NAME*/}
                    <div>
                        <input className={"margin-top-25"} type="text" name="lastName"  onChange={e => {
                            const s = {...censor};
                            s.lastName = e.target.value;
                            setCensor(s);
                        }} required placeholder="Last Name"/>
                    </div>

{/*ADMINISTRATOR PHONE*/}
                    <div>
                        <input className={"margin-top-25"} type="text" name="phone"  onChange={e => {
                            const s = {...censor};
                            s.phone = e.target.value;
                            setCensor(s);
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

export default AddCensor;