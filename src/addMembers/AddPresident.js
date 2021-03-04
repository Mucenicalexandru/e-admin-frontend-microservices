import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import SaveButton from "../buttons/SaveButton";

function AddPresident(props) {

    let groupId = props.location.groupId;
    let buildingId =  props.location.buildingId;
    const [redirect, setRedirect] = useState(false);

    const [president, setPresident] = useState({
        firstName : "",
        lastName : "",
        phone : "",
        email : "",
        buildingId : "",
        groupId : ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`/user/add-president`, president, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(() => {
                setRedirect(true);
            });

    }

    return (
        <div>
            <h1 className="d-flex justify-content-center" >Add President</h1>
            <div className="d-flex justify-content-center margin-top-25">
                {redirect && <Redirect to={{
                    pathname : "/see-buildings",
                    groupId : groupId
                }} />}

                <form action="" onSubmit={handleSubmit}>
{/*PRESIDENT FIRST NAME*/}
                    <div>
                        <input className={"margin-top-25"} type="text"  name="firstName"  onChange={e => {
                            const s = {...president};
                            s.firstName = e.target.value;
                            s.buildingId = buildingId;
                            s.groupId = groupId;
                            setPresident(s);
                        }} required placeholder="First Name"/>
                    </div>
{/*PRESIDENT LAST NAME*/}
                    <div>
                        <input className={"margin-top-25"} type="text"  name="lastName"  onChange={e => {
                            const s = {...president};
                            s.lastName = e.target.value;
                            setPresident(s);
                        }} required placeholder="Last Name"/>
                    </div>

{/*PRESIDENT PHONE*/}
                    <div>
                        <input className={"margin-top-25"} type="text" name="phone"  onChange={e => {
                            const s = {...president};
                            s.phone = e.target.value;
                            setPresident(s);
                        }} required placeholder="Phone"/>
                    </div>

{/*PRESIDENT EMAIL*/}
                    <div>
                        <input className={"margin-top-25"} type="text"  name="email"  onChange={e => {
                            const s = {...president};
                            s.email = e.target.value;
                            setPresident(s);
                        }} required placeholder="Email"/>
                    </div>

                    <Link to={{
                        pathname : '/see-buildings',
                        groupId : groupId}}>
                        <button className="btn btn-outline-danger margin-top-25">Cancel</button>
                    </Link>

                    <SaveButton name={"Add"}/>
                </form>
            </div>
        </div>
    );
}

export default AddPresident;