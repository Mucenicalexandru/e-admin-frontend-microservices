import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import {UserContext} from "../context/UserContext";

function GroupInfo(props) {

    const value = useContext(UserContext);
    let groupId = props.location.groupId;
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [group, setGroup] = useState([]);
    const [administrator, setAdministrator] = useState({});
    const [censor, setCensor] = useState({});

    useEffect(() => {
        axios.get(`/user/by-group-and-role/${groupId}/ADMINISTRATOR`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setAdministrator(response.data);
            })
        axios.get(`/user/by-group-and-role/${groupId}/CENSOR`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setCensor(response.data);
            })
        axios.get(`/group/get-by-id/${groupId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setGroup(response.data);
                setIsLoading(false);
            })
    }, [groupId, isLoading])

    const deleteGroup = (e) => {
        e.preventDefault();
        axios.delete(`/group/${groupId}`, {
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
            <div className="d-flex justify-content-center margin-top-25">
                {redirect && <Redirect to="/groups" />}
                {value && value.roles.includes("ADMIN") &&
                <div>
                    <Link to={{
                        pathname : 'add-building',
                        groupId : groupId }}>
                        <button className="btn btn-outline-primary margin-top-25">+ Add Building</button>
                    </Link>
                    <Link to={{
                        pathname : '/see-buildings',
                        groupId : groupId}}>
                        <button className="btn btn-outline-primary margin-top-25 margin-left-5">See All Buildings</button>
                    </Link>
                </div>}
            </div>

            <h1 className="d-flex justify-content-center">{group.officialName}</h1>

            <p className={"center-text"}><i className="fas fa-envelope"> </i> <span className={"blue-underline"}>{group.email}</span></p>
            {administrator.userId && <p className={"center-text"}><i className="fas fa-phone"> </i><span> {administrator.phone}</span></p>}

            <img className="card mx-auto margin-bottom-25 shadow" src={`/images/${group.picture}`} alt={group.officialName} style={{"width" : "250px", "height" : "175px", "borderRadius" : "10px"}}/>

            <Link to={{
                pathname : "/see-location",
                address : group.street + ", " + group.number + ", " + group.town
            }}>
                <p className={"center-text"}><i className="fas fa-map-marker-alt"> </i><span> See location </span></p>

            </Link>
            {value && value.roles.includes("ADMIN") &&
            <div className="d-flex justify-content-center">
                {administrator.userId ?
                    <Link to={{
                        pathname: 'edit-administrator',
                        groupId: group.groupId,
                        linkFromGroup : true,
                        administratorFirstName : administrator.firstName,
                        administratorLastName : administrator.lastName,
                        administratorPhone : administrator.phone
                    }}>
                        <button className="btn btn-outline-secondary margin-right-5">Edit Administrator</button>
                    </Link>
                    :
                    <Link to={{
                        pathname: 'add-administrator',
                        groupId: group.groupId,
                        email : group.email
                    }}>
                        <button className="btn btn-outline-secondary margin-right-5">Add Administrator</button>
                    </Link>
                }
                {censor.userId ?
                    <Link to={{
                        pathname : 'edit-censor',
                        linkFromGroup : true,
                        groupId : group.groupId,
                        censorFirstName : censor.firstName,
                        censorLastName : censor.lastName,
                        censorPhone : censor.phone}}>
                        <button className="btn btn-outline-secondary margin-left-5">Edit Censor</button>
                    </Link>
                    :
                    <Link to={{
                        pathname : 'add-censor',
                        groupId : group.groupId}}>
                        <button className="btn btn-outline-secondary margin-left-5">Add Censor</button>
                    </Link>
                }
            </div>}

            <div className="d-flex justify-content-center margin-top-25">
                <Link to={`/groups`}><button className="btn btn-outline-primary margin-right-5">Back</button></Link>

                {value && value.roles.includes("ADMIN") ?
                    <Link to={{
                        pathname : '/edit-group',
                        groupId : groupId}}>
                        <button className="btn btn-outline-secondary margin-left-5 margin-right-5">Edit Group</button>
                    </Link>
                    :
                    <Link to={{
                        pathname : '/see-buildings',
                        groupId : groupId}}>
                        <button className="btn btn-outline-secondary margin-left-5 margin-right-5">See Buildings</button>
                    </Link>
                }

                {value && value.roles.includes("ADMIN") && <button onClick={deleteGroup} className="btn btn-outline-danger margin-left-5">Delete Group</button>}
            </div>


        </div>
    );
}

export default GroupInfo;