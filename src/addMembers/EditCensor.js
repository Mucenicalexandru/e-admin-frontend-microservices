import React, {useEffect, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import SaveButton from "../buttons/SaveButton";
import axios from "axios";

function EditCensor(props) {

    let groupId = props.location.groupId;
    let linkFromGroup = props.location.linkFromGroup;
    let comingFrom = props.location.comingFrom;
    let userId = props.location.userId;
    let censorFirstName = props.location.censorFirstName;
    let censorLastName = props.location.censorLastName;
    let censorPhone = props.location.censorPhone;

    const [redirect, setRedirect] = useState(false);

    const [censor, setCensor] = useState({
        firstName : censorFirstName,
        lastName : censorLastName,
        phone : censorPhone
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/user/edit/${userId}`, censor, {
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
            <h1 className="d-flex justify-content-center" >Edit Censor</h1>
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
                        <input className={"margin-top-25"} type="text" value={censor.firstName} name="firstName"
                               onChange={(e) => {
                                   const s = {...censor}
                                   s.firstName = e.target.value;
                                   setCensor(s);
                               }}
                               required/>
                    </div>
{/*ADMINISTRATOR LAST NAME*/}
                    <div>
                        <input className={"margin-top-25"} type="text"  value={censor.lastName} name="lastName"  onChange={e => {
                            const s = {...censor};
                            s.lastName = e.target.value;
                            setCensor(s);
                        }} required />
                    </div>

{/*ADMINISTRATOR PHONE*/}
                    <div>
                        <input className={"margin-top-25"} type="text"  value={censor.phone} name="phone"  onChange={e => {
                            const s = {...censor};
                            s.phone = e.target.value;
                            setCensor(s);
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
                            pathname : '/users-statistics'}}>
                            <button className="btn btn-outline-danger margin-top-25">Cancel</button>
                        </Link>
                    }


                    <SaveButton name={"Update"}/>

                </form>

            </div>
        </>
    );
}

export default EditCensor;