import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';

function ReviewDetails(props) {

    let providerId = props.location.providerId;
    let averageStarRating = props.location.averageStarRating;
    let rating = props.location.rating;
    const [serviceProvider, setServiceProvider] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [serviceProviderReviewList, setServiceProviderReviewList] = useState([]);
    const [totalStars, setTotalStars] = useState([]);
    const [resultsWithPercentage, setResultsWithPercentage] = useState({});

    console.log("Provider id : " + providerId)
    console.log("Average star rating : " + averageStarRating)
    console.log("Rating : " + rating)

    //TODO to continue doing the rating system
    // useEffect(() => {
    //     axios.get(`/user/provider-with-reviews/${providerId}`, {
    //         headers: {
    //             Authorization: 'Bearer ' + localStorage.getItem('token')
    //         }
    //     })
    //         .then(response => {
    //             setServiceProvider(response.data);
    //             setIsLoading(true);
    //         })
    // }, [isLoading])

    return (
        <div>
            <div className="container">
                <div className={"margin-top-25"}>
                    <h2>Reviews <small style={{"color" : "grey", "fontSize" : "20px"}}>({serviceProvider.totalReviews} reviews)</small></h2>
                </div>

                <div className="container">
                    <div style={{"fontSize" : "50px", "lineHeight" : "58px", "marginBottom" : "15px"}}>
                        {rating}
                    </div>
                    {averageStarRating}
                    <p style={{"color" : "grey"}}>{serviceProvider.totalReviews} reviews</p>
                </div>


                {/*<div className={"margin-top-25"}>*/}
                {/*    <div className={"margin-bottom-25"}>*/}
                {/*        <span className={"blue-underline"}>5 stars ({resultsWithPercentage[5]})</span><ProgressBar variant="success" now={resultsWithPercentage[5] * 100 / totalStars.length + 1} />*/}
                {/*    </div>*/}
                {/*    <div className={"margin-bottom-25"}>*/}
                {/*        <span className={"blue-underline"} >4 stars ({resultsWithPercentage[4]})</span><ProgressBar variant="warning" now={resultsWithPercentage[4] * 100 / totalStars.length + 1}/>*/}
                {/*    </div>*/}

                {/*    <div className={"margin-bottom-25"}>*/}
                {/*        <span className={"blue-underline"} >3 stars ({resultsWithPercentage[3]})</span><ProgressBar variant="danger" now={resultsWithPercentage[3] * 100 / totalStars.length + 1} />*/}
                {/*    </div>*/}

                {/*    <div className={"margin-bottom-25"}>*/}
                {/*        <span className={"blue-underline"} >2 stars ({resultsWithPercentage[2]})</span><ProgressBar variant="danger" now={resultsWithPercentage[2] * 100 / totalStars.length + 1} />*/}
                {/*    </div>*/}

                {/*    <div className={"margin-bottom-25"}>*/}
                {/*        <span className={"blue-underline"} >1 star ({resultsWithPercentage[1]})</span><ProgressBar variant="info" now={resultsWithPercentage[1] * 100 / totalStars.length + 1} />*/}
                {/*    </div>*/}
                {/*</div>*/}


            {/*    <div style={{"marginTop" : "80px", "marginLeft" : "50px"}}>*/}
            {/*        {serviceProviderReviewList && serviceProviderReviewList.map((review, index) => {*/}
            {/*            return  <div key={index} className={"margin-top-25 "}>*/}
            {/*                <h4>{review.title}</h4>*/}

            {/*                <div>*/}
            {/*                    {review.user && <p className={"grey"}><b>{review.user.lastName + " " + review.user.firstName}</b></p>}*/}
            {/*                    <p className={"grey"} style={{"fontSize" : "15px"}}>{review.date}</p>*/}
            {/*                </div>*/}

            {/*                <div>*/}
            {/*                    {StarRating(review.starNumber)}*/}
            {/*                </div>*/}

            {/*                <div className={"margin-top-25 margin-bottom-25"} style={{"padding" : "40px"}}>{review.review}</div>*/}
            {/*                <div style={{"border" : "solid 0.5px", "borderColor" : "#DCDCDC"}}> </div>*/}
            {/*            </div>*/}

            {/*        })}*/}
            {/*    </div>*/}

            {/*</div>*/}
            {/*<div className="d-flex justify-content-center margin-top-25 margin-bottom-25">*/}
            {/*    <Link to={{*/}
            {/*        pathname : "/assigned-service-provider",*/}
            {/*        providerId : providerId*/}
            {/*    }}>*/}
            {/*        <button className="btn btn-outline-dark margin-right-5">Back</button>*/}
            {/*    </Link>*/}
            </div>

        </div>
    );
}

export default ReviewDetails;