import React, {useState} from 'react';
import {departments} from "../util/departments";
import {cities} from "../util/cities";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";

function ProviderRegister(props) {

    const [successfullyRegistered, setSuccessfullyRegistered] = useState(false);
    const [emailExist, setEmailExist] = useState(false);
    const [serviceProvider, setServiceProvider] = useState({
        firstName : "",
        lastName : "",
        phone : "",
        email : "",
        town : "",
        country : "",
        company : "",
        website : "",
        department : "",
        password : ""
    });

    const handleTownChange = (e) => {
        const s = {...serviceProvider};
        s.town = e.target.value;
        setServiceProvider(s);
    }

    const handleCountryChange = (e) => {
        const s = {...serviceProvider};
        s.country = e.target.value;
        setServiceProvider(s);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/user/add-service-provider`, serviceProvider)
            .then((response) => {
                if(response.status === 202){
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

            {successfullyRegistered && <Redirect to={{
                pathname : "/login"
            }} />}
            <div className="d-flex justify-content-center">
                <form onSubmit={handleSubmit}>
                    <h1>Service Provider</h1>
{/*PROVIDER DEPARTMENT*/}
                    <div className="input-group mb-3 margin-top-25">
                        <select className="custom-select" id="inputGroupSelect01" required value={serviceProvider.department} onChange={e =>{
                            const s = {...serviceProvider};
                            s.department = e.target.value;
                            setServiceProvider(s);
                        }}>
                            <option value="" selected>Department</option>
                            {departments.map((department, index) => {
                                return <option key={index} value={department}>{department}</option>
                            })}
                        </select>
                    </div>
{/*PROVIDER COUNTRY*/}
                    <div>
                        <select className="custom-select" id="inputGroupSelect01"  onChange={handleCountryChange} required>
                            <option value="" selected>Choose country...</option>
                            <option  value={"Romania"}>Romania</option>
                        </select>
                    </div>
{/*PROVIDER TOWN*/}
                    <div>
                        <select className="custom-select margin-top-15" id="inputGroupSelect01" onChange={handleTownChange} required>
                            <option value="" selected>Choose town...</option>
                            {cities.sort().map((city, index) => {
                                return <option key={index} value={city}>{city}</option>
                            })}
                        </select>
                    </div>
{/*PROVIDER FIRST NAME*/}
                    <div style={{"marginLeft" : "26px"}}>
                        <div>
                            <input style={{"marginTop": "10px"}} type="text" name="firstName" value={serviceProvider.firstName} required placeholder="First Name"
                                   onChange={e => {
                                       const s = {...serviceProvider};
                                       s.firstName = e.target.value;
                                       setServiceProvider(s);
                                   }}/>
                        </div>
{/*PROVIDER LAST NAME*/}
                        <div>
                            <input style={{"marginTop": "10px"}} type="text" name="lastName" value={serviceProvider.lastName} required placeholder="Last Name"
                                   onChange={e => {
                                       const s = {...serviceProvider};
                                       s.lastName = e.target.value;
                                       setServiceProvider(s);
                                   }}/>
                        </div>
{/*PROVIDER PHONE*/}
                        <div>
                            <input style={{"marginTop": "10px"}} type="text" name="phone" value={serviceProvider.phone} required placeholder="Phone number"
                                   onChange={e => {
                                       const s = {...serviceProvider};
                                       s.phone = e.target.value;
                                       setServiceProvider(s);
                                   }}/>
                        </div>
{/*PROVIDER EMAIL*/}
                        <div>
                            <input style={{"marginTop": "10px"}} type="text" name="email" value={serviceProvider.email} required placeholder="Email"
                                   onChange={e => {
                                       const s = {...serviceProvider};
                                       s.email = e.target.value;
                                       setServiceProvider(s);
                                   }}/>
                        </div>
{/*PROVIDER COMPANY*/}
                        <div>
                            <input style={{"marginTop": "10px"}} type="text" name="company"  value={serviceProvider.company} placeholder="Company"
                                   onChange={e => {
                                       const s = {...serviceProvider};
                                       s.company = e.target.value;
                                       setServiceProvider(s);
                                   }}/>
                        </div>
{/*PROVIDER WEBSITE*/}
                        <div>
                            <input style={{"marginTop": "10px"}} type="text" name="website"  value={serviceProvider.website} placeholder="Website"
                                   onChange={e => {
                                       const s = {...serviceProvider};
                                       s.website = e.target.value;
                                       setServiceProvider(s);
                                   }}/>
                        </div>
{/*PROVIDER PASSWORD*/}
                        <div>
                            <input style={{"marginTop": "10px"}} type="password" name="email" value={serviceProvider.password} required  placeholder="Password"
                                   onChange={e => {
                                       const s = {...serviceProvider};
                                       s.password = e.target.value;
                                       setServiceProvider(s);
                                   }}/>
                        </div>

                    </div>
                    <Link to="/register"><button type="submit" className="btn btn-outline-secondary margin-top-25">Back</button></Link>
                    <button type="submit" className="btn btn-outline-secondary float-right margin-top-25">Submit</button>
                </form>
            </div>
        </div>

    );
}

export default ProviderRegister;