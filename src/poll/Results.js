import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {CanvasJSChart} from 'canvasjs-react-charts';
import {Link} from "react-router-dom";
import {UserContext} from "../context/UserContext";

function Results(props) {

    const value = useContext(UserContext);
    let pollDescription = props.location.pollDescription;
    let pollId = props.location.pollId;
    let buildingId = props.location.buildingId;
    const [poll, setPoll] = useState({});
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        axios.get(`/poll/results/${pollId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then((response) => {
                console.log(response.data);
                setAnswers(response.data);
            })
        axios.get(`/poll/${pollId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then((response) => {
                setPoll(response.data);
            })
    }, [pollId])

    return (
        <>
            <div>
                <h1 className="d-flex justify-content-center">
                    <div>{pollDescription}</div>
                </h1>
                <CanvasJSChart options = {{

                    animationEnabled: true,
                    theme: "light2",
                    axisX: {
                        reversed: true,
                    },
                    axisY: {
                        includeZero: true,
                    },
                    data: [{
                        type: "bar",
                        cursor : "pointer",
                        dataPoints : [
                            { y:  answers.option1, color: "#ef476f",  label: poll.option1 },
                            { y:  answers.option2, color: "#154d61",  label: poll.option2 },
                            { y:  answers.option3, color: "#06d6a0",  label: poll.option3 },
                            { y:  answers.option4, color: "#118ab2",  label: poll.option4 },
                            { y:  answers.option5, color: "#ffd166",  label: poll.option5 }
                        ]
                    }]
                }}/>
            </div>

            {value.roles.includes("USER") ?
                <div className="d-flex justify-content-center margin-top-25">
                    <Link to={{
                        pathname : `/polls`,
                        buildingId : buildingId
                    }}>
                        <button className="btn btn-outline-dark margin-bottom-25 margin-right-5">Back</button>
                    </Link>
                </div>
                :
                <div className="d-flex justify-content-center margin-top-25">
                    <Link to={{
                        pathname : `/see-polls`,
                        buildingId : buildingId
                    }}>
                        <button className="btn btn-outline-dark margin-bottom-25 margin-right-5">Back</button>
                    </Link>
                </div>
            }


        </>
    );
}

export default Results;