import React, {useContext} from 'react';
import styled from 'styled-components';
import AuthenticationButton from "../login/AuthenticationButton";
import {Link} from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import UserNavbar from "./UserNavbar";
import AdministratorNavbar from "./AdministratorNavbar";
import RegisterLink from "../registration/RegisterLink";
import {UserContext} from "../context/UserContext";
import PresidentNavbar from "./PresidentNavbar";
import ProviderListNavbarComponent from "./ProviderListNavbarComponent";
import ServiceProviderNavbar from "./ServiceProviderNavbar";

const NavStyle = styled.div`
  background-color: #1f4253;
`

function Navbar(props) {

    const value = useContext(UserContext);

    return (
        <div>
            <NavStyle>
                <div className="nav justify-content">
                    <Link to={"/"} className="nav-link" style={{"color": "white"}}>
                        <i className="fas fa-home"> </i> Home</Link>
{/*NAVBAR BY ROLE*/}

                    <UserNavbar/>
                    <PresidentNavbar/>
                    <AdministratorNavbar/>
                    <ServiceProviderNavbar/>
                    <AdminNavbar/>

{/*GENERAL NAVBAR*/}
                    <ProviderListNavbarComponent/>
{/*                    <Profile/>*/}
                    {value ? null : <RegisterLink/>}
                    <AuthenticationButton/>
                </div>
            </NavStyle>
        </div>
    );
}

export default Navbar;