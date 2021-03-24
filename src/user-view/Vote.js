import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {UserContext} from "../context/UserContext";
import {Link, Redirect} from "react-router-dom";

function Vote(props) {

    let pollId = props.location.pollId;
    let buildingId = props.location.buildingId;
    const value = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [poll, setPoll] = useState({});
    const [redirect, setRedirect] = useState(false);

    const [userVote, setUserVote] = useState({
        pollId : "",
        answerOption : "",
        userId : "",
        date : Date.now()
    })

    useEffect(() => {
        axios.get(`/poll/${pollId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => {
                setPoll(response.data);
                setIsLoading(false);
            })
    }, [isLoading]);

    return (
        <>
            {redirect && <Redirect to={{
                pathname : "/polls",
                buildingId : buildingId
            }} />}

            <div className="d-flex justify-content-center" >
                <form action="">
                    <div style={{"marginTop" : "30px", "backgroundColor" : "#ccd7e0", "paddingLeft" : "75px", "paddingRight" : "75px", "paddingTop" : "25px", "paddingBottom" : "25px", "borderRadius" : "10px"}}>
                        <h4 className="d-flex justify-content-center margin-bottom-25" style={{"fontFamily" : "'Source Serif Pro', serif"}}>{poll.description}</h4>

                        {poll.option1 &&
                        <div>
                            <input type="radio" id={poll.option1} name="drone" value={poll.option1}
                                   onChange={(e) => {
                                       const s = {...userVote}
                                       s.answerOption = "option1";
                                       s.pollId = pollId;
                                       s.userId = value.userId;
                                       setUserVote(s);
                                   }}/>
                            <label htmlFor="huey">{poll.option1}</label>
                        </div>}

                        {poll.option2 &&
                        <div>
                            <input type="radio" id={poll.option2} name="drone" value={poll.option2}
                                   onChange={(e) => {
                                       const s = {...userVote}
                                       s.answerOption = "option2";
                                       s.pollId = pollId;
                                       s.userId = value.userId;
                                       setUserVote(s);
                                   }}
                            />
                            <label htmlFor="huey">{poll.option2}</label>
                        </div>}

                        {poll.option3 &&
                        <div>
                            <input type="radio" id={poll.option3} name="drone" value={poll.option3}
                                   onChange={(e) => {
                                       const s = {...userVote}
                                       s.answerOption = "option3";
                                       s.pollId = pollId;
                                       s.userId = value.userId;
                                       setUserVote(s);
                                   }}
                            />
                            <label htmlFor="huey">{poll.option3}</label>
                        </div>}

                        {poll.option4 &&
                        <div>
                            <input type="radio" id={poll.option4} name="drone" value={poll.option4}
                                   onChange={(e) => {
                                       const s = {...userVote}
                                       s.answerOption = "option4";
                                       s.pollId = pollId;
                                       s.userId = value.userId;
                                       setUserVote(s);
                                   }}
                            />
                            <label htmlFor="huey">{poll.option4}</label>
                        </div>}

                        {poll.option5 &&
                        <div>
                            <input type="radio" id={poll.option5} name="drone" value={poll.option5}
                                   onChange={(e) => {
                                       const s = {...userVote}
                                       s.answerOption = "option5";
                                       s.pollId = pollId;
                                       s.userId = value.userId;
                                       setUserVote(s);
                                   }}
                            />
                            <label htmlFor="huey">{poll.option5}</label>
                        </div>}
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-outline-success btn-sm margin-top-25" onClick={(e) => {
                                e.preventDefault();
                                axios.post(`/vote/`, userVote, {
                                    headers: {
                                        Authorization: 'Bearer ' + localStorage.getItem('token')
                                    }
                                })
                                    .then(() => {
                                        setRedirect(true);
                                    })
                            }}>Vote
                            </button>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center margin-top-25">
                        <Link to={{
                            pathname : '/polls',
                            buildingId : buildingId}}>
                            <button className="btn btn-outline-dark margin-bottom-25">Back</button>
                        </Link>
                    </div>

                </form>

            </div>

        </>
    );
}

export default Vote;