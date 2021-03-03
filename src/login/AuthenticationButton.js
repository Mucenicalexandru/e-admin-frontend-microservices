import React, {useContext} from 'react';
import Logout from "./Logout";
import Login from "./Login";
import {UserContext} from "../context/UserContext";
import LoginButton from "./LoginButton";


const AuthenticationButton = () => {

    const value = useContext(UserContext);

    return value ? <Logout /> : <LoginButton />;
};

export default AuthenticationButton;