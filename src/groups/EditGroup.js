import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, Redirect} from "react-router-dom";

function EditGroup(props) {

    let groupId = props.location.groupId;
    const [redirect, setRedirect] = useState(false);

    const [group, setGroup] = useState({
        officialName : "",
        shortName : "",
        email : "",
        picture : "",
        iban : ""
    });

    useEffect(() => {
        axios.get(`/group/get-by-id/${groupId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setGroup(response.data);
            })
    }, [groupId])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/group/edit-group/${groupId}`, group, {
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
            <h1 className="d-flex justify-content-center" >Edit Group</h1>
            <div className="d-flex justify-content-center">
                {redirect && <Redirect to={{
                    pathname : "/group",
                    groupId : groupId}} />}
                <form action="" onSubmit={handleSubmit}>

                    <div>
                        <input className={"margin-top-25"} type="text" name="officialName" value={group.officialName} onChange={e => setGroup({...group, officialName: e.target.value})} required/>
                    </div>
                    <div>
                        <input className={"margin-top-25"} type="text" name="shortName" value={group.shortName}  onChange={e => setGroup({...group, shortName: e.target.value})} required/>
                    </div>
                    <div>
                        <input className={"margin-top-25"} type="text" name="email" value={group.email}  onChange={e => setGroup({...group, email: e.target.value})} required/>
                    </div>
                    <div>
                        <input className={"margin-top-25"} type="text" name="picture" value={group.picture}  onChange={e => setGroup({...group, picture: e.target.value})} required/>
                    </div>
                    <div>
                        <input className={"margin-top-25"} type="text" name="iban" value={group.iban}  onChange={e => setGroup({...group, iban: e.target.value})} required/>
                    </div>


                    <Link to={{
                        pathname : '/group',
                        groupId : groupId}}>
                        <button className="btn btn-outline-danger margin-top-25">Cancel</button>
                    </Link>
                    <button type="submit" className="btn btn-outline-success margin-top-25 float-right" onClick={handleSubmit}>Save</button>
                </form>

            </div>
        </>
    );
}

export default EditGroup;