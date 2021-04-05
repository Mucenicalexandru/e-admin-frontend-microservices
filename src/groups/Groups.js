import React, {useContext, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {UserContext} from "../context/UserContext";
import {cities} from "../util/cities";

function Groups(props) {

    const value = useContext(UserContext);
    const [groupList, setGroupList] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        axios.get(`/group/get-all`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setGroupList(response.data);
            })
    }, [value, showAll])

    const handleTownChange = (e) => {
        axios.get(`/group/get-by-town/${e.target.value}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => {
                setGroupList(response.data);
            })
    }

    const handleClick = () => {
        setShowAll(!showAll);
    }

    const handleSearch = (e) => {
        let search = "";
        search = e.target.value.toString().charAt(0).toUpperCase() + e.target.value.toString().substring(1);

        if(e.target.value === ""){
            console.log("empty")
            setShowAll(true)
        }else{
            console.log("with letters")
            axios.get(`/group/search/${search}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then((response) => {
                    setGroupList(response.data);
                    setShowAll(false);
                })
        }

    }

    return (
        <>
            { value
                ?
                <div>

                    <div  className="d-flex justify-content-center margin-top-15">
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                   aria-label="Search" onChange={handleSearch}/>
                        </form>
                    </div>

                    <div className="d-flex justify-content-center margin-top-15">
                        <button className="btn btn-outline-primary" onClick={handleClick}>Show all</button>
                    </div>

                    <div className="d-flex justify-content-center">
                        <div style={{"width" : "200px"}}>
                            <select className="custom-select margin-top-25" id="inputGroupSelect01" onChange={handleTownChange} required>
                                <option value="" selected>Choose town...</option>
                                {cities.sort().map((city, index) => {
                                    return <option key={index} value={city}>{city}</option>
                                })}
                            </select>
                        </div>
                    </div>




                    <div className="d-flex justify-content-center margin-top-25">
                        {value && value.roles.includes("ADMIN") ?
                            <Link to={"/add-group"}>
                                <button className="btn btn-outline-primary">+ Add Group</button>
                            </Link> : null}
                    </div>

                    <div className='row align-items-center' style={{"padding": "0"}}>
                    {groupList.map((group, index) => {
                        return <div key={index} className="card mx-auto card margin-bottom-25 margin-top-15 shadow">
                            <div>
                                <img className="card-img-top" src={`/images/${group.picture}`} alt={group.officialName} style={{"width" : "250px", "height" : "175px", "marginLeft" : "17px", "marginTop" : "10px"}}/>
                            </div>
                            {value.roles.includes("ADMIN") ?
                                <div className="card-body">
                                    <h5 className="card-title center-text">{group.officialName}</h5>
                                    <p className="card-text">{group.town}</p>
                                    <Link to={{
                                        pathname : '/group',
                                        groupId : group.groupId}}>
                                        <button className="btn btn-outline-primary"><i
                                            className="fas fa-lock-open green"> </i> See Group</button>
                                    </Link>
                                </div>
                                :
                                <div className="card-body center-text">
                                    <h5 className="card-title center-text">{group.officialName}</h5>
                                    <p className="card-text">{group.town}</p>
                                    {value.groupId === group.groupId ?
                                        <Link to={{
                                            pathname : '/group',
                                            groupId : group.groupId}}>
                                            <button className="btn btn-outline-primary"><i
                                                className="fas fa-lock-open green"> </i> See Group</button>
                                        </Link>
                                        :
                                        <div>
                                            <button disabled className="btn btn-outline-primary"><i
                                                className="fas fa-lock red"> </i> Restricted access</button>
                                        </div>
                                    }
                                </div>
                            }

                        </div>
                    })}
                    </div>
                </div>
                :
                <div>
                    <div  className="d-flex justify-content-center margin-top-15">
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                   aria-label="Search" onChange={handleSearch}/>
                        </form>
                    </div>

                    <div className="d-flex justify-content-center margin-top-15">
                        <button className="btn btn-outline-primary" onClick={handleClick}>Show all</button>
                    </div>

                    <div className="d-flex justify-content-center">
                        <div style={{"width" : "200px"}}>
                            <select className="custom-select margin-top-25" id="inputGroupSelect01" onChange={handleTownChange} required>
                                <option value="" selected>Choose town...</option>
                                {cities.sort().map((city, index) => {
                                    return <option key={index} value={city}>{city}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='row align-items-center' style={{"padding": "0"}}>
                    {groupList.map((group, index) => {
                        return <div key={index} className="card mx-auto card margin-bottom-25 margin-top-15 shadow">
                            <div>
                                <img className="card-img-top" src={`/images/${group.picture}`} alt={group.officialName} style={{"width" : "250px", "height" : "175px", "marginLeft" : "17px", "marginTop" : "10px"}}/>
                            </div>
                            <div className="card-body center-text">
                                <h5 className="card-title center-text">{group.officialName}</h5>
                                <p className="card-text">{group.town}</p>
                                <button disabled className="btn btn-outline-primary"><i
                                    className="fas fa-lock red"> </i> Please register to join</button>
                            </div>
                        </div>
                    })}
                    </div>


                </div>
            }
        </>
    );
}

export default Groups;