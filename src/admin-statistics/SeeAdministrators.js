import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

function SeeAdministrators(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [administratorsList, setAdministratorsList] = useState([]);

    useEffect(() => {
        axios.get(`/user/all-by-role/ADMINISTRATOR`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setAdministratorsList(response.data);
                setIsLoading(false);
            })
    }, [isLoading])


    return (
        <div>

            <h1 className="d-flex justify-content-center">Administrators</h1>

            <div className="d-flex justify-content-center margin-top-25">
                <table>
                    <thead style={{"backgroundColor" : "#8db9e2"}}>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th scope="col">Update profile</th>
                    </tr>
                    </thead>
                    <tbody>
                    {administratorsList.map((administrator, index) => {
                    return <tr key={index}>
                        <td>{administrator.userId}</td>
                        <td>{administrator.firstName}</td>
                        <td>{administrator.lastName}</td>
                        <td>{administrator.phone}</td>
                        <td>{administrator.email}</td>
                        <td>
                            <Link to={{
                                pathname : "/edit-administrator",
                                userId : administrator.userId,
                                administratorFirstName : administrator.firstName,
                                administratorLastName : administrator.lastName,
                                administratorPhone : administrator.phone,
                                comingFrom : "users-statistics"
                            }}>
                            <button type="button" className="btn  btn-outline-success btn-sm" >Edit</button>
                            </Link>
                        </td>
                    </tr>
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SeeAdministrators;