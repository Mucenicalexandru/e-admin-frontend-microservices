import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {UserContext} from "../context/UserContext";
import {AverageStarRating} from "../util/AverageStarRating";

function SeeAssignedServiceOfferDetails(props) {

    let providerId = props.location.providerId;
    let type = props.location.type;
    let groupId = props.location.groupId;
    const value = useContext(UserContext);
    const [serviceProvider, setServiceProvider] = useState({});

    useEffect(() => {
        axios.get(`/user/provider-with-reviews/${providerId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setServiceProvider(response.data);
            })
    }, [providerId])


    return (
        <div>
            <div className="card mx-auto card margin-top-25 shadow">
                <div className="card-body">
                    <h5 className="card-title"><i style={{"fontSize" : "15px"}} className="fas fa-user"> </i> {serviceProvider.user && (serviceProvider.user.firstName + " " + serviceProvider.user.lastName)}</h5>

                    {serviceProvider.totalReviews > 0 ?
                        <div className="rating">
                            {serviceProvider.totalReviews && AverageStarRating(serviceProvider.averageStars) }
                            <span className={"margin-left-5"}>{serviceProvider.averageStars.toString().substring(0, 4) }</span> <p>
                            <Link to={{
                                pathname : '/review-details',
                                providerId : providerId,
                                averageStarRating : serviceProvider.averageStars,
                                rating : serviceProvider.averageStars,
                                type : type}}>
                                {serviceProvider.totalReviews} reviews
                            </Link>
                        </p>

                        </div>

                        :
                        <p>No reviews</p>
                    }
                    <br/>

                    <p><i className="fas fa-building"> </i> {serviceProvider.user && serviceProvider.user.department}</p>
                    <p><i className="fas fa-phone"> </i> {serviceProvider.user && serviceProvider.user.phone}</p>
                    <p><i className="fas fa-envelope"> </i><span className={"blue-underline"}>{serviceProvider.user && serviceProvider.user.email}</span></p>
                </div>

            </div>
            <div className="d-flex justify-content-center margin-top-25">

                <Link to={{
                    pathname: "/see-offers",
                    groupId: groupId,
                    buildingId: value.buildingId,
                    type : type
                }}>
                    <button className="btn btn-outline-dark margin-right-5">Back</button>
                </Link>
            </div>

        </div>
    );
}

export default SeeAssignedServiceOfferDetails;