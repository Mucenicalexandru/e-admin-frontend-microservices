import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {UserContext} from "../context/UserContext";
import {departments} from "../util/departments";
import {cities} from "../util/cities";

function ListOfServiceProviders(props) {

    const value = useContext(UserContext);
    const [providersList, setProviderList] = useState();
    const [dropdownHidden, setDropdownHidden] = useState(true);
    const [selectedTown, setSelectedTown] = useState("");
    const [reset, setReset] = useState(true);

    useEffect(() => {
        axios.get(`/user/all-by-role/SERVICE_PROVIDER`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setProviderList(response.data);
            })
    }, [value, reset])

    const handleTownChange = (e) => {
        setSelectedTown(e.target.value);
        axios.get(`/user/providers-by/${e.target.value}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setProviderList(response.data);
            })
    }

    const handleDepartmentChange = (e) => {
        console.log(`/user/providers-by/${selectedTown}/${e.target.value}`)
        axios.get(`/user/providers-by/${selectedTown}/${e.target.value}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setProviderList(response.data);
            })
    }


    return (
        <>
            {value ?
                <div>
                    <h1 className="d-flex justify-content-center">Service Providers</h1>

                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-outline-info" onClick={(e) => {
                            e.preventDefault();
                            setDropdownHidden(!dropdownHidden);
                        }}>Advanced Search</button>
                    </div>

                    <div className="d-flex justify-content-center">
                        <div className={"dropdown-width"} hidden={dropdownHidden}>
                            <select className="custom-select margin-top-25" id="inputGroupSelect01" onChange={handleTownChange} required>
                                <option value="" selected>Choose town...</option>
                                {cities.sort().map((city, index) => {
                                    return <option key={index} value={city}>{city}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center">
                        <div className={"dropdown-width"} hidden={dropdownHidden}>
                            <select className="custom-select margin-top-25" id="inputGroupSelect01" onChange={handleDepartmentChange} required>
                                <option value="" selected>Choose department...</option>
                                {departments.sort().map((department, index) => {
                                    return <option key={index} value={department}>{department}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center margin-top-25">
                        <button type="button" className="btn btn-outline-info btn-sm" hidden={dropdownHidden} onClick={(e) => {
                            e.preventDefault();
                            setDropdownHidden(!dropdownHidden);
                            setReset(!reset);
                        }}>Reset search</button>
                    </div>

                    <div className="d-flex justify-content-center margin-top-25">
                        <table>
                            <thead>
                            <tr>
                                {value.roles.includes("ADMIN") ?
                                    <th scope="col">ID</th>
                                    :
                                    <th scope="col">#</th>
                                }
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Email</th>
                                <th scope="col">Company</th>
                                <th scope="col">Website</th>
                                <th scope="col">Department</th>
                                <th scope="col">Town</th>
                                <th scope="col">Country</th>
                                <th scope="col">Rating</th>
                                {value.roles.includes("ADMIN") ?
                                    <th scope="col">Remove</th>
                                    :
                                    null
                                }
                            </tr>
                            </thead>
                            <tbody>
                            {providersList && providersList.map((provider, index) => {
                                let number = 0;
                                provider.reviews && provider.reviews.forEach(review => {
                                    number += review.starNumber;
                                })
                                return <tr key={index}>
                                    {value.roles.includes("ADMIN") ?
                                        <td className="index">{provider.userId}</td>
                                        :
                                        <td className="index">{index + 1}</td>
                                    }
                                    <td className="provider-firstName">{provider.firstName}</td>
                                    <td className="provider-lastName">{provider.lastName}</td>
                                    <td className="provider-phone">{provider.phone}</td>
                                    <td className="provider-email"><span className={"blue-underline"}>{provider.email}</span></td>
                                    <td className="provider-company">{provider.company}</td>
                                    <td className="provider-site">{provider.website}</td>
                                    <td className="provider-department">{provider.department}</td>
                                    <td>{provider.town}</td>
                                    <td>{provider.country}</td>
                                    {provider.reviews && provider.reviews.length > 0 ?
                                        <td className="provider-rating">
                                            <Link to={{
                                                pathname : '/review-details',
                                                providerId : provider.id,
                                                // averageStarRating : AverageStarRating(Math.round(number / provider.reviews.length * 10) / 10),
                                                rating : Math.round(number / provider.reviews.length * 10) / 10 }}>
                                                {Math.round(number / provider.reviews.length * 10) / 10}
                                                {/*{AverageStarRating(Math.round(number / provider.reviews.length * 10) / 10)}*/}
                                            </Link>
                                        </td>
                                        :
                                        <td>No reviews received</td>
                                    }
                                    {value.roles.includes("ADMIN") ?
                                        <td><button type="button" className="btn  btn-outline-danger btn-sm">Remove</button></td>
                                        :
                                        null
                                    }
                                </tr>
                            })}
                            </tbody>
                        </table>

                    </div>
                </div>

                :
                <div>
                    <h1 className="d-flex justify-content-center">Service Providers</h1>

                    <div className="d-flex justify-content-center">
                        <div className={"dropdown-width"} hidden={dropdownHidden}>
                            <select className="custom-select margin-top-25" id="inputGroupSelect01" onChange={handleDepartmentChange} required>
                                <option value="" selected>Choose department...</option>
                                {departments.sort().map((department, index) => {
                                    return <option key={index} value={department}>{department}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center margin-top-25">
                        <button type="button" className="btn btn-outline-info btn-sm" hidden={dropdownHidden} onClick={(e) => {
                            e.preventDefault();
                            setDropdownHidden(!dropdownHidden);
                            setReset(!reset);
                        }}>Reset search</button>
                    </div>

                    <div className="d-flex justify-content-center margin-top-25">
                        <table>
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Email</th>
                                <th scope="col">Company</th>
                                <th scope="col">Website</th>
                                <th scope="col">Department</th>
                                <th scope="col">Town</th>
                                <th scope="col">Country</th>
                                <th scope="col">Rating</th>
                            </tr>
                            </thead>
                            <tbody>
                            {providersList && providersList.map((provider, index) => {
                                let number = 0;
                                provider.reviews && provider.reviews.forEach(review => {
                                    number += review.starNumber;
                                })
                                return <tr key={index}>
                                    <td className="index">{index + 1}</td>
                                    <td className="provider-firstName">{provider.firstName}</td>
                                    <td className="provider-lastName filter">Lastname</td>
                                    <td className="provider-phone filter">0721456789</td>
                                    <td className="provider-email filter"><span className={"blue-underline"}>provider@email.com</span></td>
                                    <td className="provider-company">{provider.company}</td>
                                    <td className="provider-site">{provider.website}</td>
                                    <td className="provider-department">{provider.department}</td>
                                    <td>{provider.town}</td>
                                    <td>{provider.country}</td>
                                    {provider.reviews.length > 0 ?
                                        <td className="provider-rating">
                                            {Math.round(number / provider.reviews.length * 10) / 10}
                                            {/*{AverageStarRating(Math.round(number / provider.reviews.length * 10) / 10)}*/}
                                        </td>
                                        :
                                        <td>No reviews received</td>
                                    }
                                </tr>
                            })}
                            </tbody>
                        </table>

                    </div>
                </div>
            }
        </>
    );
}

export default ListOfServiceProviders;