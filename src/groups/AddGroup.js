import React, {useState} from 'react';
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import SaveButton from "../buttons/SaveButton";
import CancelButton from "../buttons/CancelButton";
import {cities} from "../util/cities";

function AddGroup(props) {

    const [redirect, setRedirect] = useState(false);
    const [group, setGroup] = useState({
        officialName : "",
        shortName : "",
        email : "",
        street : "",
        number : "",
        town : "",
        country : "",
        picture : "",
        iban : ""
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/group/add`, group, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(() => {
                setRedirect(true);
            });
    }

    const handleTownChange = (e) => {
        const s = {...group};
        s.town = e.target.value;
        setGroup(s);
    }

    const handleCountryChange = (e) => {
        const s = {...group};
        s.country = e.target.value;
        setGroup(s);
    }

    return (
        <>
            <h1 className="d-flex justify-content-center" >Add Group</h1>
            <div className="d-flex justify-content-center margin-top-25">
                {redirect && <Redirect to="/groups" />}
                <form action="" onSubmit={handleSubmit}>
{/*GROUP COUNTRY*/}
                    <div>
                        <select className="custom-select margin-top-25" id="inputGroupSelect01" onChange={handleCountryChange} required>
                            <option value="" selected>Choose country...</option>
                            <option  value={"Romania"}>Romania</option>
                        </select>
                    </div>
{/*GROUP TOWN*/}
                    <div>
                        <select className="custom-select margin-top-25" id="inputGroupSelect01" onChange={handleTownChange} required>
                            <option value="" selected>Choose town...</option>
                            {cities.sort().map((city, index) => {
                                return <option key={index} value={city}>{city}</option>
                            })}
                        </select>
                    </div>
{/*OFFICIAL NAME*/}
                    <div>
                        <input className={"margin-top-25"} type="text" name="officialName" value={group.officialName} onChange={e => setGroup({...group, officialName: e.target.value})} required placeholder="Official Name"/>
                    </div>
{/*SHORT NAME*/}
                    <div>
                        <input className={"margin-top-25"} type="text" name="shortName" value={group.shortName}  onChange={e => setGroup({...group, shortName: e.target.value})} required placeholder="Short Name"/>
                    </div>
{/*EMAIL*/}
                    <div>
                        <input className={"margin-top-25"} type="text" name="email" value={group.email}  onChange={e => {
                            const s = {...group};
                            s.email = e.target.value;
                            setGroup(s)
                        }} required placeholder="Email"/>
                    </div>
{/*STREET*/}
                    <div>
                        <input className={"margin-top-25"} type="text" name="street" value={group.street}  onChange={e => {
                            const s = {...group};
                            s.street = e.target.value;
                            setGroup(s);
                        }} required placeholder="Street" />
                    </div>
{/*NUMBER*/}
                    <div>
                        <input className={"margin-top-25"} type="text" name="number" value={group.number}  onChange={e => {
                            const s = {...group};
                            s.number = e.target.value;
                            setGroup(s);
                        }} required placeholder="Number"/>
                    </div>
{/*PICTURE*/}
                    <div>
                        <input className={"margin-top-25"} type="text" name="picture" value={group.picture}  onChange={e => setGroup({...group, picture: e.target.value})}  placeholder="Picture"/>
                    </div>
{/*IBAN*/}
                    <div>
                        <input className={"margin-top-25"} type="text" name="iban" value={group.iban}  onChange={e => setGroup({...group, iban: e.target.value})} placeholder="IBAN"/>
                    </div>

                    <Link to={"/groups"}><CancelButton name={"Cancel"}/></Link>
                    <SaveButton name={"Add"}/>
                </form>
            </div>
        </>
    );
}

export default AddGroup;