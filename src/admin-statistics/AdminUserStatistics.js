import React, {useState} from 'react';
import SeeUsers from "./SeeUsers";
import SeeAdministrators from "./SeeAdministrators";
import SeePresidents from "./SeePresidents";
import SeeCensors from "./SeeCensors";
import ListOfServiceProviders from "../service.providers/ListOfServiceProviders";

function AdminUserStatistics(props) {

    const [userType, setUserType] = useState("");

    return (
        <div>
            <div className="d-flex justify-content-center margin-top-25 margin-bottom-25">
                <button type="button" className="btn btn-outline-info margin-right-10" onClick={(e) => {
                    e.preventDefault();
                    setUserType("users");
                }}>Users</button>
                <button type="button" className="btn btn-outline-info margin-right-10" onClick={(e) => {
                    e.preventDefault();
                    setUserType("administrators");
                }}>Administrators</button>
                <button type="button" className="btn btn-outline-info margin-right-10" onClick={(e) => {
                    e.preventDefault();
                    setUserType("presidents");
                }}>Presidents</button>
                <button type="button" className="btn btn-outline-info margin-right-10" onClick={(e) => {
                    e.preventDefault();
                    setUserType("censors");
                }}>Censors</button>
                <button type="button" className="btn btn-outline-info" onClick={(e) => {
                    e.preventDefault();
                    setUserType("service providers");
                }}>Service Providers</button>
            </div>


            {userType === "users" && <SeeUsers/>}
            {userType === "administrators" && <SeeAdministrators/>}
            {userType === "presidents" && <SeePresidents/>}
            {userType === "censors" && <SeeCensors/>}
            {userType === "service providers" && <ListOfServiceProviders/>}

        </div>
    );
}

export default AdminUserStatistics;