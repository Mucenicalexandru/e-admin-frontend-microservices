import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

function SeeCensors(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [censorList, setCensorList] = useState([]);

    useEffect(() => {
        axios.get(`/user/all-by-role/CENSOR`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setCensorList(response.data);
                setIsLoading(false);
            })
    }, [isLoading])

    return (
        <div>

            <h1 className="d-flex justify-content-center">Censors</h1>


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
                    {censorList.map((censor, index) => {
                        return <tr key={index}>
                            <td>{censor.userId}</td>
                            <td>{censor.firstName}</td>
                            <td>{censor.lastName}</td>
                            <td>{censor.phone}</td>
                            <td>{censor.email}</td>
                            <td>
                                <Link to={{
                                    pathname : "/edit-censor",
                                    userId : censor.userId,
                                    censorFirstName : censor.firstName,
                                    censorLastName : censor.lastName,
                                    censorPhone : censor.phone,
                                    censorId : censor.id
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

export default SeeCensors;