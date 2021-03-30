import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import {UserContext} from "../context/UserContext";

function GroupInfo(props) {

    const value = useContext(UserContext);
    let groupId = props.location.groupId;
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [response, setResponse] = useState([]);


    useEffect(() => {
        axios.get(`/group/group-administrator-censor/${groupId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => {
                setResponse(response.data);
                setIsLoading(false);
            })

    }, [groupId, isLoading])

    const deleteGroup = (e) => {
        e.preventDefault();
        console.log(groupId)
        axios.delete(`/group/delete-by-id/${groupId}`, {
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

            {response.group &&
                <div>
                    <h1 className="d-flex justify-content-center">{response.group.officialName}</h1>

                    <p className={"center-text"}><i className="fas fa-envelope"> </i> <span className={"blue-underline"}>{response.group.email}</span></p>

                </div>
            }


            {response.administrator && <p className={"center-text"}><i className="fas fa-phone"> </i><span> {response.administrator.phone}</span></p>}


            {response.group &&
            <div>
                <img className="card mx-auto margin-bottom-25 shadow" src={`/images/${response.group.picture}`}
                     alt={response.group.officialName}
                     style={{"width": "250px", "height": "175px", "borderRadius": "10px"}}/>

                <Link to={{
                    pathname : "/see-location",
                    address : response.group.street + ", " + response.group.number + ", " + response.group.town
                }}>
                    <p className={"center-text"}><i className="fas fa-map-marker-alt"> </i><span> See location </span></p>
                </Link>
            </div>}

            {value && value.roles.includes("ADMIN") &&
            <div className="d-flex justify-content-center">
                {response.administrator &&
                    <Link to={{
                        pathname: 'edit-administrator',
                        groupId: groupId,
                        userId : response.administrator.userId,
                        linkFromGroup : true,
                        administratorFirstName : response.administrator.firstName,
                        administratorLastName : response.administrator.lastName,
                        administratorPhone : response.administrator.phone
                    }}>
                        <button className="btn btn-outline-secondary margin-right-5">Edit Administrator</button>
                    </Link>}

                {!response.administrator && response.group &&
                    <Link to={{
                        pathname: 'add-administrator',
                        groupId: groupId,
                        email : response.group.email
                    }}>
                        <button className="btn btn-outline-secondary margin-right-5">Add Administrator</button>
                    </Link>}

                {response.censor ?
                    <Link to={{
                        pathname : 'edit-censor',
                        linkFromGroup : true,
                        groupId : groupId,
                        userId : response.censor.userId,
                        censorFirstName : response.censor.firstName,
                        censorLastName : response.censor.lastName,
                        censorPhone : response.censor.phone}}>
                        <button className="btn btn-outline-secondary margin-left-5">Edit Censor</button>
                    </Link>
                    :
                    <Link to={{
                        pathname : 'add-censor',
                        groupId : groupId}}>
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