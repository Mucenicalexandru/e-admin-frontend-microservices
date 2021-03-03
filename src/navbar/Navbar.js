import React from 'react';
import styled from 'styled-components';
import AuthenticationButton from "../login/AuthenticationButton";
import {Link} from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import UserNavbar from "./UserNavbar";

const NavStyle = styled.div`
  background-color: #1f4253;
`

function Navbar(props) {
    return (
        <div>
            <NavStyle>
                <div className="nav justify-content">
                    <Link to={"/"} className="nav-link" style={{"color": "white"}}>
                        Home</Link>
{/*NAVBAR BY ROLE*/}

                    <UserNavbar/>
                    {/*<PresidentNavbar/>*/}
                    {/*<AdministratorNavbar/>*/}
                    {/*<ServiceProviderNavbar/>*/}
                    <AdminNavbar/>

{/*GENERAL NAVBAR*/}
{/*                    <ProvidersListNavbarComponent/>*/}
{/*                    <Profile/>*/}
{/*                    <NavbarOptionsForRegister/>*/}
                    <AuthenticationButton/>
                </div>
            </NavStyle>
        </div>
    );
}

export default Navbar;