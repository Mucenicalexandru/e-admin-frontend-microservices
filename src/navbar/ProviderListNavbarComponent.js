import React from 'react';
import {Link} from "react-router-dom";

function ProviderListNavbarComponent(props) {
    return (
        <div>
            <Link className="nav-link" to={"/service-providers"} style={{"color": "white"}}>
                <i className="fas fa-wrench"> </i> Service Providers</Link>
        </div>
    );
}

export default ProviderListNavbarComponent;