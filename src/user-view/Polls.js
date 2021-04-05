import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {UserContext} from "../context/UserContext";

function Polls(props) {

    const value = useContext(UserContext);
    let buildingId = props.location.buildingId;
    const [responseList, setResponseList] = useState([]);

    useEffect(() => {
        axios.get(`/poll/all-by-building-with-total-votes/${buildingId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setResponseList(response.data);
            })
    }, [buildingId]);

    return (
        <>
            <h1 className="d-flex justify-content-center">Polls</h1>

            <div className="d-flex justify-content-center">
                {responseList && responseList.length > 0 ?
                    <table>
                        <thead style={{"backgroundColor" : "#8db9e2"}}>
                        <tr>
                            <th>#</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Total votes</th>
                            <th>End date</th>
                            <th>Vote</th>
                        </tr>
                        </thead>
                        <tbody>
                        {responseList.map((response, index) => {
                            return  <tr key={index}>
                                <td className="index">{index + 1}</td>
                                <td className="poll-description">{response.poll && response.poll.description}</td>
                                {response.poll && response.poll.status === "active" ?
                                    <td className="poll-status"><span className={"green"}>{response.poll.status}</span></td>
                                    :
                                    <td className="poll-status"><span className={"red"}>{response.poll.status}</span></td>
                                }

                                <td className="poll-vote-number">{response.totalVotes}</td>
                                <td className="poll-end-date">{response.poll && response.poll.endDate}</td>


                                {response.poll.status === "active" ?
                                    response.usersWhoAlreadyVoted.includes(value.userId) ?
                                        <td>
                                            <i>Already voted</i>
                                        </td>
                                        :
                                        <td>
                                            <Link to={{
                                                pathname : '/vote',
                                                buildingId : buildingId,
                                                pollId : response.poll.pollId}}>
                                                <button className="btn btn-outline-success btn-sm">Vote</button>
                                            </Link>
                                        </td>
                                    :
                                    <td>
                                        <Link to={{
                                            pathname : '/see-poll-result',
                                            buildingId : buildingId,
                                            pollId : response.poll.pollId,
                                            pollDescription : response.poll.description}}>
                                            <button className="btn btn-outline-dark btn-sm">Results</button>
                                        </Link>
                                    </td>
                                }
                            </tr>}
                        )}
                        </tbody>
                    </table>
                    :
                    <div>No polls in progress</div>
                }
            </div>
            <div className="d-flex justify-content-center" style={{"marginTop" : "50px"}}>
                <Link to={"/my-building"}><button className="btn btn-outline-dark" style={{"marginRight":"5px", "marginBottom" : "20px"}}>Back</button></Link>
            </div>
        </>
    );
}

export default Polls;