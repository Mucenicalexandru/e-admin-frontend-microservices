import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

function SeePresidents(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [presidentsList, setPresidentsList] = useState([]);
    const [editPresident, setEditPresident] = useState(false);

    useEffect(() => {
        axios.get(`/user/all-by-role/PRESIDENT`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setPresidentsList(response.data);
                setIsLoading(false);
            })
    }, [isLoading])

    return (
        <div>

            <h1 className="d-flex justify-content-center">Presidents</h1>


            <div className="d-flex justify-content-center margin-top-25">
                <table>
                    <thead>
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
                    {presidentsList.map((president, index) => {
                        return <tr key={index}>
                            <td>{president.userId}</td>
                            <td>{president.firstName}</td>
                            <td>{president.lastName}</td>
                            <td>{president.phone}</td>
                            <td>{president.email}</td>
                            <td>
                                <Link to={{
                                    pathname : "/edit-president",
                                    presidentFirstName : president.firstName,
                                    presidentLastName : president.lastName,
                                    presidentPhone : president.phone,
                                    presidentId : president.id
                                }}>
                                    <button type="button" className="btn  btn-outline-success btn-sm" >Edit</button>
                                </Link>
                            </td>
                        </tr>
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

export default SeePresidents;