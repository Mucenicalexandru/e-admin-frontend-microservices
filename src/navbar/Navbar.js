import React, {useContext, useState} from 'react';
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
    const [language, setLanguage] = useState("English")


    return (
        <div>
            <NavStyle>
                <div className="nav justify-content">
                    <Link to={"/"} className="nav-link" style={{"color": "white"}}>
                        <i className="fas fa-home"> </i> Home
                    </Link>
{/*NAVBAR BY ROLE*/}
                    <UserNavbar/>
                    <PresidentNavbar/>
                    <AdministratorNavbar/>
                    <ServiceProviderNavbar/>
                    <AdminNavbar language={language}/>

{/*GENERAL NAVBAR*/}
                    <ProviderListNavbarComponent/>
{/*                    <Profile/>*/}

                    {value ? null : <RegisterLink/>}
                    <Link to={"/contact"} className="nav-link" style={{"color": "white"}}>
                        <i className="far fa-address-card"> </i> Contact</Link>
                    <AuthenticationButton/>


                    <div>
                        <img className="card " src={`/images/romania.png`} alt={"Smart City Picture"} style={{"width" : "38px", "height" : "28px","borderRadius": "10px", "marginRight" : "5px", "marginLeft" : "130px", "marginTop" : "7px", "cursor" : "pointer"}} onClick={(e) => {
                            e.preventDefault();
                            setLanguage("Romanian");
                        }}/>
                    </div>
                    <div>
                        <img className="card " src={`/images/english.jpeg`} alt={"Smart City Picture"} style={{"width" : "38px", "height" : "28px","borderRadius": "10px", "marginTop" : "7px", "cursor" : "pointer"}} onClick={(e) => {
                            e.preventDefault();
                            setLanguage("English");
                        }}/>
                    </div>


                </div>
            </NavStyle>
        </div>
    );
}

export default Navbar;