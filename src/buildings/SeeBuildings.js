import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import {UserContext} from "../context/UserContext";

function SeeBuildings(props) {

    let groupId = props.location.groupId;
    const value = useContext(UserContext);
    const [buildingList, setBuildingsList] = useState([]);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        axios.get(`/building/buildings-and-presidents/${groupId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setBuildingsList(response.data);
                console.log(response.data)
            })
    }, [groupId, redirect])

    return (
        <>
            <h1 className="d-flex justify-content-center">Number of buildings : {buildingList && buildingList.length}</h1>
            <div className="d-flex justify-content-center">
                <i className="fas fa-square" style={{"color" : "#d2c6e2"}}> <span style={{"color": "black"}}> My buildings </span> </i>
            </div><br/>
            <div className="d-flex justify-content-center">
                <i className="fas fa-square" style={{"color" : "#c6e2de"}}> <span style={{"color": "black"}}> Group buildings</span></i>
            </div>
            <div className="d-flex justify-content-center margin-top-25 margin-bottom-25">
                <Link to={{
                    pathname : '/group',
                    groupId : groupId}}>
                    <button className="btn btn-outline-dark">Back to group</button>
                </Link>
            </div>
            <div className='row align-items-center'>
            {buildingList && buildingList.map((building, index) => {
                if(value.buildingId === building.building.buildingId){
                    return <div className="card mx-auto margin-top-25 my-card shadow" key={index}>
                        <div className="card-body">
                            <h5 className="card-title">Building {index+1}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{building.building.street} {building.building.number}</h6>
                            <div className={"margin-top-25 margin-bottom-25"}>
                                <p className="card-text">Building name : {building.building.buildingName}</p>
                                <p className="card-text">Building entrance : {building.building.entrance}</p>
                                <p>President : {building.president === null ? "No president" : building.president.lastName + " " + building.president.firstName}</p>
                                <p><i className="fas fa-envelope"> </i> {building.president === null ? "No email" : building.president.email}</p>

                            </div>
                            {value && value.roles.includes("ADMIN") ?


                                building.president ?
                                    <Link to={{
                                        pathname: 'edit-president',
                                        groupId: groupId,
                                        presidentId: building.president.userId,
                                        buildingId: building.building.buildingId,
                                        presidentFirstName : building.president.firstName,
                                        presidentLastName : building.president.lastName,
                                        presidentPhone : building.president.phone
                                    }}>
                                        <button
                                            className="btn btn-outline-secondary margin-right-10 margin-left-10">Edit
                                            President
                                        </button>
                                    </Link>
                                    :
                                    <Link to={{
                                        pathname: 'add-president',
                                        groupId: groupId,
                                        buildingId: building.building.buildingId
                                    }}>
                                        <button className="btn btn-outline-secondary margin-right-10 margin-left-10">Add
                                            President
                                        </button>
                                    </Link>
                                :
                                null
                            }

                            {value && value.roles.includes("ADMIN") &&
                            <button className="btn btn-outline-danger float-right" onClick={() => {
                                axios.delete(`/api/delete-building/${building.building.buildingId}`, {
                                    headers: {
                                        Authorization: 'Bearer ' + localStorage.getItem('token')
                                    }
                                })
                                    .then(() => {
                                        setRedirect(!redirect);
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    })
                            }}>Remove</button>
                            }
                        </div>

                    </div>
                }else{
                    return <div className="card mx-auto margin-top-25 card shadow" key={index}>
                        <div className="card-body">
                            <h5 className="card-title">Building {index+1}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{building.building.street} {building.building.number}</h6>
                            <div className={"margin-top-25 margin-bottom-25"}>
                                <p className="card-text">Building name : {building.building.buildingName}</p>
                                <p className="card-text">Building entrance : {building.building.entrance}</p>
                                <p>President : {building.president === null ? "No president" : building.president.lastName + " " + building.president.firstName}</p>
                                <p><i className="fas fa-envelope"> </i> {building.president === null ? "No email" : building.president.email}</p>

                            </div>
                            {value && value.roles.includes("ADMIN") ?


                                building.president ?
                                    <Link to={{
                                        pathname: 'edit-president',
                                        groupId: groupId,
                                        linkFromBuilding : true,
                                        userId: building.president.userId,
                                        presidentFirstName : building.president.firstName,
                                        presidentLastName : building.president.lastName,
                                        presidentPhone : building.president.phone
                                    }}>
                                        <button
                                            className="btn btn-outline-secondary margin-right-10 margin-left-10">Edit
                                            President
                                        </button>
                                    </Link>
                                    :
                                    <Link to={{
                                        pathname: 'add-president',
                                        groupId: groupId,
                                        buildingId: building.building.buildingId
                                    }}>
                                        <button className="btn btn-outline-secondary margin-right-10 margin-left-10">Add
                                            President
                                        </button>
                                    </Link>
                                :
                                null
                            }

                            {value && value.roles.includes("ADMIN") &&
                            <button className="btn btn-outline-danger float-right" onClick={() => {
                                axios.delete(`/api/delete-building/${building.building.buildingId}`, {
                                    headers: {
                                        Authorization: 'Bearer ' + localStorage.getItem('token')
                                    }
                                })
                                    .then(() => {
                                        setRedirect(!redirect);
                                    })
                            }}>Remove</button>
                            }
                        </div>

                    </div>
                }

            })}
            </div>
        </>
    )

}

export default SeeBuildings;