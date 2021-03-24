import React, { useState, useContext } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Link, Redirect} from "react-router-dom";
import {UserContext} from "../context/UserContext";

function AddPoll(props) {

    const value = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [poll, setPoll] = useState({
        description : "",
        option1 : "",
        option2 : "",
        option3 : "",
        option4 : "",
        option5 : "",
        endDate : "",
        buildingId : ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/poll/add`, poll, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then(() => {
                setRedirect(true);
            })
    }

    return (
        <div className="d-flex justify-content-center">
            {redirect && <Redirect to={{
                pathname : "/see-polls"
            }} />}
            <form action="" onSubmit={handleSubmit}>
                <h1>Poll</h1>

                <div>
                <textarea className={"poll-input"} name="description" value={poll.description} required placeholder="Question and short description" onChange={(e) => {
                    const s = {...poll};
                    s.description = e.target.value;
                    s.buildingId = value.buildingId;
                    setPoll(s);
                }}/>
                </div>
{/*OPTION 1*/}
                <div>
                    <input className={"poll-input"} type="text" value={poll.option1} required placeholder={`Option 1 (mandatory)`} onChange={(e) =>{
                        const s = {...poll};
                        s.option1 = e.target.value;
                        setPoll(s);
                    }} />
                </div>
{/*OPTION 2*/}
                <div>
                    <input className={"poll-input"} type="text" value={poll.option2} required placeholder={`Option 2 (mandatory)`} onChange={(e) =>{
                        const s = {...poll};
                        s.option2 = e.target.value;
                        setPoll(s);
                    }}/>
                </div>
{/*OPTION 3*/}
                <div>
                    <input className={"poll-input"} type="text"  value={poll.option3} placeholder={`Option 3 (optional)`} onChange={(e) =>{
                        const s = {...poll};
                        s.option3 = e.target.value;
                        setPoll(s);
                    }}/>
                </div>
{/*OPTION 4*/}
                <div>
                    <input className={"poll-input"} type="text"  value={poll.option4} placeholder={`Option 4 (optional)`} onChange={(e) =>{
                        const s = {...poll};
                        s.option4 = e.target.value;
                        setPoll(s);
                    }}/>
                </div>
{/*OPTION 5*/}
                <div>
                    <input className={"poll-input"} type="text"  value={poll.option5} placeholder={`Option 5 (optional)`} onChange={(e) =>{
                        const s = {...poll};
                        s.option5 = e.target.value;
                        setPoll(s);
                    }}/>
                </div>
{/*END DATE*/}
                <div className={"poll-input"}>
                    <div>Select poll end date</div>
                    <DatePicker selected={startDate} onChange={date => {
                        const s = {...poll};
                        s.endDate = date;
                        setStartDate(date);
                        setPoll(s);
                    }} />

                </div>

                <div>
                    <Link to={{
                        pathname : "/see-polls"
                    }}>
                        <button type="submit" className="btn btn-outline-secondary margin-top-25 float-left">Back</button>
                    </Link>
                    <button className="btn btn-outline-success margin-top-25 float-right">Submit</button>
                </div>



            </form>
        </div>
    );
}

export default AddPoll;