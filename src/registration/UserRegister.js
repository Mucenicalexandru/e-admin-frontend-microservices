import React, {useEffect, useState} from 'react';
import {cities} from "../util/cities";
import {Redirect} from "react-router-dom";
import axios from "axios";

function UserRegister(props) {

    const [successfullyRegistered, setSuccessfullyRegistered] = useState(false);
    const [emailExist, setEmailExist] = useState(false);
    const [userToAdd, setUserToAdd] = useState({
        firstName : "",
        lastName : "",
        phone : "",
        email : "",
        buildingStreet : "",
        buildingNumber : "",
        buildingName : "",
        buildingEntrance : "",
        town : "",
        country : "",
        other : "",
        password : "",
        buildingId : "",
        groupId : ""
    });

    const [groupId, setGroupId] = useState("");
    const [buildingId, setBuildingId] = useState("");
    const [groupList, setGroupList] = useState([]);
    const [buildingList, setBuildingList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleTownChange = (e) => {
        const s = {...userToAdd};
        s.town = e.target.value;
        setUserToAdd(s);
    }

    const handleCountryChange = (e) => {
        const s = {...userToAdd};
        s.country = e.target.value;
        setUserToAdd(s);
    }

    const handleGroupChange = (e) => {
        setGroupId(e.target.value);
        const s = {...userToAdd};
        s.groupId = e.target.value;
        setUserToAdd(s);
    }

    const handleBuildingChange = (e) => {
        setBuildingId(e.target.value);
        const s = {...userToAdd};
        s.buildingId = e.target.value;
        setUserToAdd(s);
    }

    useEffect(() => {
        axios.get(`/group/get-all`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setGroupList(response.data);
                setIsLoading(false);
            })
    }, [isLoading])

    useEffect(() =>{
        axios.get(`/building/by-groupId/${groupId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setBuildingList(response.data);
            })
    }, [groupId])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/user/`, userToAdd, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => {
                if(response.status === 200){
                    setSuccessfullyRegistered(true)
                }
            })
            .catch((err) => {
                if(err.response.status === 409){
                    setEmailExist(true);
                }else{
                    console.log(err)
                }
            })
    }

    return (
        <div>
            {emailExist && (
                <div  className={"d-flex justify-content-center"}>
                    <div className={"wrong-credentials"}>
                        <p style={{ margin: 'auto' }}>Email already in use</p>
                    </div>
                </div>
            )}
            <div className="d-flex justify-content-center">
                {successfullyRegistered && <Redirect to={{
                    pathname : "/login"
                }} />}

                <form action="" onSubmit={handleSubmit}>
                    <h1>User</h1>
{/*USER COUNTRY*/}
                    <div>
                        <select className="custom-select" id="inputGroupSelect01" onChange={handleCountryChange} required>
                            <option value="" selected>Choose country...</option>
                            <option  value={"Romania"}>Romania</option>
                        </select>
                    </div>
{/*USER TOWN*/}
                    <div>
                        <select className="custom-select margin-top-15" id="inputGroupSelect01" onChange={handleTownChange} required>
                            <option value="" selected>Choose town...</option>
                            {cities.sort().map((city, index) => {
                                return <option key={index} value={city}>{city}</option>
                            })}
                        </select>
                    </div>
                    {/*TODO set group and building required*/}
{/*/!*SELECT GROUP*!/*/}
                    <div className="input-group mb-3">
                        <select className="custom-select margin-top-15" id="inputGroupSelect01"  onChange={handleGroupChange}>
                            <option value="" selected>Select group...</option>
                            {groupList.map((group, index) => {
                                return <option key={index} value={group.groupId}>{group.shortName}</option>
                            })}
                        </select>
                    </div>
{/*/!*SELECT BUILDING*!/*/}
                    <div className="input-group mb-3">
                        <select className="custom-select" id="inputGroupSelect01"  onChange={handleBuildingChange}>
                            <option value="" selected>Select building...</option>
                            {buildingList && buildingList.map((building, index) => {
                                return <option key={index} value={building.buildingId}>{building.street + ", " + building.number}</option>
                            })}
                        </select>
                    </div>
{/*USER FIRST NAME*/}
                    <div>
                        <input type="text" name="firstName" value={userToAdd.firstName} required placeholder="First Name"
                               onChange={e => {
                                   const s = {...userToAdd};
                                   s.firstName = e.target.value;
                                   setUserToAdd(s);
                               }}/>
                    </div>
{/*USER LAST NAME*/}
                    <div>
                        <input style={{"marginTop": "10px"}} type="text" name="lastName" value={userToAdd.lastName} required placeholder="Last Name"
                               onChange={e => {
                                   const s = {...userToAdd};
                                   s.lastName = e.target.value;
                                   setUserToAdd(s);
                               }}/>
                    </div>
{/*USER PHONE*/}
                    <div>
                        <input style={{"marginTop": "10px"}} type="text" name="phone" value={userToAdd.phone} required  placeholder="Phone number"
                               onChange={e => {
                                   const s = {...userToAdd};
                                   s.phone = e.target.value;
                                   setUserToAdd(s);
                               }}/>
                    </div>
{/*USER STREET*/}
                    <div>
                        <input style={{"marginTop": "10px"}} type="text" name="street" value={userToAdd.buildingStreet} required placeholder="Street"
                               onChange={e => {
                                   const s = {...userToAdd};
                                   s.buildingStreet = e.target.value;
                                   setUserToAdd(s);
                               }}/>
                    </div>
{/*USER STREET NUMBER*/}
                    <div>
                        <input style={{"marginTop": "10px"}} type="text" name="number" value={userToAdd.buildingNumber} required placeholder="Number"
                               onChange={e => {
                                   const s = {...userToAdd};
                                   s.buildingNumber = e.target.value;
                                   setUserToAdd(s);
                               }}/>
                    </div>
{/*USER BUILDING NAME*/}
                    <div>
                        <input style={{"marginTop": "10px"}} type="text" name="buildingName" value={userToAdd.buildingName} placeholder="Building name"
                               onChange={e => {
                                   const s = {...userToAdd};
                                   s.buildingName = e.target.value;
                                   setUserToAdd(s);
                               }}/>
                    </div>
{/*USER BUILDING ENTRANCE*/}
                    <div>
                        <input style={{"marginTop": "10px"}} type="text" name="buildingEntrance"  value={userToAdd.buildingEntrance} placeholder="Building entrance"
                               onChange={e => {
                                   const s = {...userToAdd};
                                   s.buildingEntrance = e.target.value;
                                   setUserToAdd(s);
                               }}/>
                    </div>
{/*USER OTHER INFO*/}
                    <div>
                        <input style={{"marginTop": "10px"}} type="text" name="other" value={userToAdd.other} placeholder="Other"
                               onChange={e => {
                                   const s = {...userToAdd};
                                   s.other = e.target.value;
                                   setUserToAdd(s);
                               }}/>
                    </div>
{/*USER EMAIL*/}
                    <div>
                        <input style={{"marginTop": "10px"}} type="text" name="email" value={userToAdd.email} required  placeholder="Email"
                               onChange={e => {
                                   const s = {...userToAdd};
                                   s.email = e.target.value;
                                   setUserToAdd(s);
                               }}/>
                    </div>
{/*USER PASSWORD*/}
                    <div>
                        <input style={{"marginTop": "10px"}} type="password" name="email" value={userToAdd.password} required  placeholder="Password"
                               onChange={e => {
                                   const s = {...userToAdd};
                                   s.password = e.target.value;
                                   setUserToAdd(s);
                               }}/>
                    </div>

                    <button type="submit" className="btn btn-outline-secondary float-right margin-top-25">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default UserRegister;