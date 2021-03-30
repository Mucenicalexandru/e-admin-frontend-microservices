import React from 'react';
import {Link} from "react-router-dom";

function Contact(props) {



    return (
        <div className="card mx-auto card shadow" style={{"width": "350px", "marginTop" : "100px"}}>
            <div>
                <img className="card-img-top" src={`/images/alex.jpg`} alt={"Mucenic Alexandru"} style={{"width" : "90%", "height" : "90%", "marginLeft" : "17px", "marginTop" : "10px"}}/>
            </div>
            <div className="card-body">
                <h1 className="card-title center-text margin-bottom-25">Mucenic Alexandru</h1>
                <p className="card-text"><i className="fas fa-envelope"> </i> mucenic.alexandru@yahoo.com</p>
                <p className="card-text"><i className="fas fa-phone"> </i> 0721 786 593</p>
            </div>
        </div>
    );
}

export default Contact;