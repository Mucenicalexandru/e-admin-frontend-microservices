import React, {useState} from 'react';
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import SaveButton from "../buttons/SaveButton";

function EditPresident(props) {

    let groupId = props.location.groupId;
    let linkFromBuilding = props.location.linkFromBuilding;
    let comingFrom = props.location.comingFrom;
    let userId = props.location.userId;
    let presidentFirstName = props.location.presidentFirstName;
    let presidentLastName = props.location.presidentLastName;
    let presidentPhone = props.location.presidentPhone;

    const [redirect, setRedirect] = useState(false);

    const [president, setPresident] = useState({
        firstName : presidentFirstName,
        lastName : presidentLastName,
        phone : presidentPhone
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`/user/edit/${userId}`, president, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(() => {
                setRedirect(true);
            })
    }

    return (
        <div>
            <h1 className="d-flex justify-content-center" >Add President</h1>
            <div className="d-flex justify-content-center margin-top-25">

                {comingFrom === "users-statistics" ?
                    redirect && <Redirect to={{
                        pathname : "/users-statistics"
                    }} />
                :
                    redirect && <Redirect to={{
                        pathname : "/see-buildings",
                        groupId : groupId
                    }} />
                }

                <form action="" onSubmit={handleSubmit}>
{/*PRESIDENT FIRST NAME*/}
                    <div>
                        <input className={"margin-top-25"} type="text"  value={president.firstName} name="firstName"  onChange={e => {
                            const s = {...president};
                            s.firstName = e.target.value;
                            setPresident(s);
                        }} required/>
                    </div>
{/*PRESIDENT LAST NAME*/}
                    <div>
                        <input className={"margin-top-25"} type="text"  value={president.lastName} name="lastName"  onChange={e => {
                            const s = {...president};
                            s.lastName = e.target.value;
                            setPresident(s);
                        }} required/>
                    </div>

{/*PRESIDENT PHONE*/}
                    <div>
                        <input className={"margin-top-25"} type="text" value={president.phone} name="phone"  onChange={e => {
                            const s = {...president};
                            s.phone = e.target.value;
                            setPresident(s);
                        }} required/>
                    </div>

                    {linkFromBuilding ?
                        <Link to={{
                            pathname : '/see-buildings',
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


                    <SaveButton name={"Update"}/>
                </form>
            </div>
        </div>
    );
}

export default EditPresident;