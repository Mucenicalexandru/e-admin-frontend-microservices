import React, {useEffect, useState} from 'react';
import axios from "axios";
import {cities} from "../util/cities";

function SeeUsers(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [userList, setUserList] = useState([]);
    const [townDropdownHidden, setTownDropdownHidden] = useState(true);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        axios.get(`/user/all-by-role/USER`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setUserList(response.data);
                setIsLoading(false);
            })
    }, [isLoading, refresh])

    const handleTownChange = (e) => {
        axios.get(`/user/all-by-town/${e.target.value}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setUserList(response.data)
            })
    }

    const resetSearch = (e) => {
        e.preventDefault();
        axios.get(`/user/all`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setUserList(response.data);
            })
    }

    return (
        <div>
            <h1 className="d-flex justify-content-center">Users</h1>

            <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-outline-info" onClick={(e) => {
                    e.preventDefault();
                    setTownDropdownHidden(!townDropdownHidden);
                }}>Advanced Search</button>
            </div>

            <div className="d-flex justify-content-center">
                <div style={{"width" : "200px"}} hidden={townDropdownHidden}>
                    <select className="custom-select margin-top-25" id="inputGroupSelect01" onChange={handleTownChange} required>
                        <option value="" selected>Choose town...</option>
                        {cities.sort().map((city, index) => {
                            return <option key={index} value={city}>{city}</option>
                        })}
                    </select>
                </div>
            </div>

            <div className="d-flex justify-content-center margin-top-25">
                <button type="button" className="btn btn-outline-info btn-sm" hidden={townDropdownHidden} onClick={(e) => {
                    e.preventDefault();
                    setTownDropdownHidden(!townDropdownHidden);
                    resetSearch(e);
                }}>Reset search</button>
            </div>


            <div className="d-flex justify-content-center margin-top-25">
                <table>
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th scope="col">Street</th>
                        <th scope="col">Number</th>
                        <th scope="col">Building name</th>
                        <th scope="col">Building Entrance</th>
                        <th scope="col">Town</th>
                        <th scope="col">Country</th>
                        <th scope="col">Roles</th>
                        <th scope="col">Remove</th>
                    </tr>
                    </thead>
                    <tbody>
            {userList.map((user, index) => {
                if(user.roles.length === 1){
                    return <tr key={index}>
                        <td>{user.userId}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.phone}</td>
                        <td>{user.email}</td>
                        <td>{user.buildingStreet}</td>
                        <td>{user.buildingNumber}</td>
                        <td>{user.buildingName}</td>
                        <td>{user.buildingEntrance}</td>
                        <td>{user.town}</td>
                        <td>{user.country}</td>
                        <td>{user.roles}</td>
                        {!user.roles.includes("ADMIN") ?
                            <td><button type="button" className="btn  btn-outline-danger btn-sm" onClick={(e) => {
                            e.preventDefault();
                            axios.delete(`/user/delete-by-userId/${user.userId}`, {
                                headers: {
                                    Authorization: 'Bearer ' + localStorage.getItem('token')
                                }
                                })
                                .then(() => {
                                    setRefresh(!refresh);
                                })
                            }
                            }>Remove</button></td>
                            :
                            null
                        }
                    </tr>
                }
            })}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-center margin-top-25">
                <nav aria-label="...">
                    <ul className="pagination">
                        <li className="page-item disabled">
                            <a className="page-link" href="#" tabIndex="-1">Previous</a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item active">
                            <a className="page-link" href="#">2 <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default SeeUsers;