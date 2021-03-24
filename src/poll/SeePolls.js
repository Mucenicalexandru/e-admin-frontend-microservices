import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import {UserContext} from "../context/UserContext";

function SeePolls(props) {

    const value = useContext(UserContext);

    const [refresh, setRefresh] = useState(true);
    const [responseList, setResponseList] = useState([]);
    const [buttonVisibility, setButtonVisibility] = useState(true);
    const [redirect, setRedirect] = useState(false);
    const [reset, setReset] = useState(true);
    const [pollToUpdate, setPollToUpdate] = useState({
        status : "inactive"
    })

    useEffect(() => {
        axios.get(`/poll/all-by-building-with-total-votes/${value.buildingId}`)
            .then((response) => {
                setResponseList(response.data);
            })
    }, [value, reset, refresh]);

    return (
        <div className="d-flex justify-content-center">
            {redirect && <Redirect to={{
                pathname : "/add-poll"
            }} />}
            <div>
                <h1  className="d-flex justify-content-center">Polls in progress</h1>

                <div className="d-flex justify-content-center margin-top-25 margin-bottom-25">
                    <button type="button" className="btn btn-outline-info" onClick={(e) => {
                        e.preventDefault();
                        setButtonVisibility(!buttonVisibility);
                    }}>Advanced Search</button>
                    <button type="button" className="btn btn-outline-info margin-left-10" onClick={(e) => {
                        e.preventDefault();
                        setRedirect(true);
                    }}>Add Poll</button>
                </div>

                <div hidden={buttonVisibility}>
                    <div className="d-flex justify-content-center margin-top-25 margin-bottom-25">
                        {/*<button type="button" className="btn btn-success margin-right-10" onClick={(e) => {*/}
                        {/*    e.preventDefault();*/}
                        {/*    setPollList([]);*/}
                        {/*    axios.get(`/poll/get-all-filter/${value.buildingId}/active`, {*/}
                        {/*        headers: {*/}
                        {/*            Authorization: 'Bearer ' + localStorage.getItem('token'),*/}
                        {/*        }*/}
                        {/*    })*/}
                        {/*        .then(response => {*/}
                        {/*            setPollList(response.data)*/}
                        {/*        })*/}
                        {/*}}>Active</button>*/}
                        {/*<button type="button" className="btn btn-danger" onClick={(e) => {*/}
                        {/*    e.preventDefault();*/}
                        {/*    setPollList([]);*/}
                        {/*    axios.get(`/poll/get-all-filter/${value.buildingId}/inactive`, {*/}
                        {/*        headers: {*/}
                        {/*            Authorization: 'Bearer ' + localStorage.getItem('token'),*/}
                        {/*        }*/}
                        {/*    })*/}
                        {/*        .then(response => {*/}
                        {/*            setPollList(response.data);*/}
                        {/*        })*/}
                        {/*}}>Inactive</button>*/}
                    </div>
                </div>

                <div className="d-flex justify-content-center margin-top-25 margin-bottom-25">
                    <button type="button" className="btn btn-outline-info btn-sm" hidden={buttonVisibility} onClick={(e) => {
                        e.preventDefault();
                        setButtonVisibility(!buttonVisibility);
                        setReset(!reset);
                    }}>Reset search</button>
                </div>

                <table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Poll description</th>
                        <th>Poll status</th>
                        <th>Total votes</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Close poll</th>
                        <th>See results</th>
                    </tr>
                    </thead>
                    <tbody>
                    {responseList.map((response, index) => {
                        return <tr key={index}>
                            <td className="poll-index">{index+1}</td>
                            <td className="poll-description">{response.poll && response.poll.description}</td>
                            {response.poll && response.poll.status === "active" ?
                                <td className="poll-status green">{response.poll && response.poll.status}</td>
                                :
                                <td className="poll-status red">{response.poll && response.poll.status}</td>
                            }
                            <td className="poll-vote-number">{response.totalVotes}</td>
                            <td>{response.poll && response.poll.startDate}</td>
                            <td className="poll-end-date">{response.poll && response.poll.endDate}</td>
                            <td className="poll-close-button">
                                {response.poll &&
                                response.poll.status === "inactive" ?
                                    <p>Closed</p>
                                    :
                                    <button id={response.poll.pollId}  className="btn btn-outline-danger btn-sm" onClick={(e) => {
                                        e.preventDefault();
                                        axios.put(`/poll/close/${response.poll.pollId}`, {
                                            headers: {
                                                Authorization: 'Bearer ' + localStorage.getItem('token'),
                                            }
                                        })
                                            .then((response) => {
                                                if(response.status === 200){
                                                    setRefresh(!refresh)
                                                }
                                            })
                                            .catch((err) => {
                                                console.log(err)
                                            })
                                    }}>Close poll
                                    </button>
                                }
                            </td>
                            <td className="poll-result-button">
                                <Link to={{
                                    pathname : '/see-poll-result',
                                    pollId : response.poll.pollId,
                                    buildingId : value.buildingId}}>
                                    <button className="btn btn-outline-dark btn-sm">See result</button>
                                </Link>
                            </td>

                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SeePolls;