import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import SaveButton from "../buttons/SaveButton";

function AddBuilding(props) {
    let groupId = props.location.groupId;

    const [group, setGroup] = useState({});
    const [redirect, setRedirect] = useState(false);
    const [building, setBuilding] = useState({
        street : "",
        number : "",
        town : "",
        country : "",
        buildingName : "",
        entrance : "",
        groupId : ""
    })

    useEffect(() =>{
        axios.get(`/group/get-by-id/${groupId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                const s = {...building};
                s.town = response.data.town;
                s.country = response.data.country;
                s.groupId = groupId;
                setBuilding(s);
                setGroup(response.data);
            })
    }, [groupId])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/building/add`, building, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(() => {
                setRedirect(true);
            })
    }

    return (
        <>
            <h1 className="d-flex justify-content-center" >Add Building</h1>
            <div className="d-flex justify-content-center margin-top-25">
                {redirect && <Redirect to={{
                    pathname : "/see-buildings",
                    groupId : groupId
                }} />}
                <form onSubmit={handleSubmit}>

                    <div>
                        <input type="text" name="street" value={building.street} onChange={e => {
                            const s = {...building};
                            s.street = e.target.value;
                            setBuilding(s);
                        }} required placeholder="Street"/>
                    </div>
                    <div>

                        <input className={"margin-top-25"} type="text" name="number" value={building.number} onChange={e => {
                            const s = {...building};
                            s.number = e.target.value;
                            setBuilding(s);
                        }} required placeholder="Number"/>
                    </div>
                    <div>
                        <input  className={"margin-top-25"} type="text" name="buildingName" value={building.buildingName} onChange={e => {
                            const s = {...building};
                            s.buildingName = e.target.value;
                            setBuilding(s);
                        }} placeholder="Building Name"/>
                    </div>
                    <div>
                        <input className={"margin-top-25"} type="text" name="buildingEntrance" value={building.entrance} onChange={e => {
                            const s = {...building};
                            s.entrance = e.target.value;
                            setBuilding(s);
                        }} placeholder="Building Entrance"
                        />
                    </div>

                    <Link to={{
                        pathname : '/group',
                        groupId : groupId}}>
                        <button className="btn btn-outline-danger margin-top-25">Cancel</button>
                    </Link>
                    <SaveButton name={"Add"}/>
                </form>
            </div>
        </>
    );
}

export default AddBuilding;