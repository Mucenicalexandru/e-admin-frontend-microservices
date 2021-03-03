import React, { createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = props => {

    let token = localStorage.getItem('token');

    function parseJwt(token) {
        if(token){
            let base64Url = token.split('.')[1];
            let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            let jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(function (c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join('')
            );

            return JSON.parse(jsonPayload);
        }

    }


    return(
        <UserContext.Provider value={parseJwt(token)}>
            {props.children}
        </UserContext.Provider>)
}