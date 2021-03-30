import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import {StarRating} from "../util/StarRating";
import {AverageStarRating} from "../util/AverageStarRating";

function ReviewDetails(props) {

    let providerId = props.location.providerId;
    let type = props.location.type;
    let rating = props.location.rating;
    let providersList = props.location.providersList;
    const [serviceProvider, setServiceProvider] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [serviceProviderReviewList, setServiceProviderReviewList] = useState([]);



    useEffect(() => {
        axios.get(`/user/provider-with-reviews/${providerId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setServiceProvider(response.data);
                setIsLoading(true);
            })
        axios.get(`/review/by-provider/${providerId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => {
                setServiceProviderReviewList(response.data);
            })


    }, [isLoading])

    return (
        <div>
            <div className="container">
                <div className={"margin-top-25"}>
                    <h2>Reviews <small style={{"color" : "grey", "fontSize" : "20px"}}>({serviceProvider.totalReviews} reviews)</small></h2>
                </div>

                <div className="container">
                    <div style={{"fontSize" : "50px", "lineHeight" : "58px", "marginBottom" : "15px"}}>
                        {rating.toString().substring(0, 4)} {AverageStarRating(rating)}
                    </div>
                </div>


                { serviceProvider.starStatistics &&
                <div className={"margin-top-25"}>
                    <div className={"margin-bottom-25"}>
                        <span className={"blue-underline"}>5 stars ({serviceProvider.starStatistics[5]})</span><ProgressBar variant="success" now={serviceProvider.starStatistics[5] * 100 / serviceProvider.totalReviews} />
                    </div>

                    <div className={"margin-bottom-25"}>
                        <span className={"blue-underline"} >4 stars ({serviceProvider.starStatistics[4]})</span><ProgressBar variant="warning" now={serviceProvider.starStatistics[4] * 100 / serviceProvider.totalReviews}/>
                    </div>

                    <div className={"margin-bottom-25"}>
                        <span className={"blue-underline"} >3 stars ({serviceProvider.starStatistics[3]})</span><ProgressBar variant="danger" now={serviceProvider.starStatistics[3] * 100 / serviceProvider.totalReviews} />
                    </div>

                    <div className={"margin-bottom-25"}>
                        <span className={"blue-underline"} >2 stars ({serviceProvider.starStatistics[2]})</span><ProgressBar variant="danger" now={serviceProvider.starStatistics[2] * 100 / serviceProvider.totalReviews} />
                    </div>

                    <div className={"margin-bottom-25"}>
                        <span className={"blue-underline"} >1 star ({serviceProvider.starStatistics[1]})</span><ProgressBar variant="info" now={serviceProvider.starStatistics[1] * 100 / serviceProvider.totalReviews} />
                    </div>
                </div>}


                <div style={{"marginTop" : "80px", "marginLeft" : "50px"}}>
                    {serviceProviderReviewList && serviceProviderReviewList.map((review, index) => {
                        return  <div key={index} className={"margin-top-25 "}>
                            <h4>{review.title}</h4>

                            <div>
                                <p className={"grey"}><b>{review.givingUserFirstName + " " + review.givingUserLastName}</b></p>
                                <p className={"grey"} style={{"fontSize" : "15px"}}>{review.date}</p>
                            </div>

                            <div>
                                {StarRating(review.starNumber)}
                            </div>

                            <div className={"margin-top-25 margin-bottom-25"} style={{"padding" : "40px"}}>{review.review}</div>
                            <div style={{"border" : "solid 0.5px", "borderColor" : "#DCDCDC"}}> </div>
                        </div>

                    })}
                </div>

            </div>
            {providersList === "providersList" ?
                <div className="d-flex justify-content-center margin-top-25 margin-bottom-25">
                    <Link to={{
                        pathname : "/service-providers"
                    }}>
                        <button className="btn btn-outline-dark margin-right-5">Back</button>
                    </Link>
                </div>
            :
                <div className="d-flex justify-content-center margin-top-25 margin-bottom-25">
                    <Link to={{
                        pathname : "/assigned-service-provider",
                        providerId : providerId,
                        type : type
                    }}>
                        <button className="btn btn-outline-dark margin-right-5">Back</button>
                    </Link>
                </div>
            }


        </div>
    );
}

export default ReviewDetails;