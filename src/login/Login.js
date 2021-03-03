import React, {useState} from 'react';
import axios from "axios";

function Login(props) {

    const [wrongCredentials, setWrongCredentials] = useState(false);
    const [userIsPending, setUserIsPending] = useState(false);
    const [user, setUser] = useState({
        email : "",
        password : ""
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/user/login`, user)
            .then((response) => {
                if (response.status === 200){
                    localStorage.setItem('token', response.data.token);
                    window.location.href = 'http://localhost:3000/';
                }
            })
            .catch((err) => {
                if(err.response.status === 403){
                    setWrongCredentials(true);
                }else if(err.response.status === 503){
                    setUserIsPending(true);
                } else{
                    console.log(err)
                }
            })
    }

    return (
        <div>
            {wrongCredentials && (
                <div  className={"d-flex justify-content-center"}>
                    <div className={"wrong-credentials"}>
                        <p style={{ margin: 'auto' }}>Incorrect email or password</p>
                    </div>
                </div>
            )}
            {userIsPending && (
                <div  className={"d-flex justify-content-center"}>
                    <div className={"wrong-credentials"}>
                        <p style={{ margin: 'auto' }}>You cannot login yet. Wait for the Administrator to accept your joining request</p>
                    </div>
                </div>
            )}
            <div className="d-flex justify-content-center" style={{"marginTop": "15px"}}>
                <form onSubmit={handleSubmit} >
                    <h1 style={{"marginTop" : "15px", "fontFamily" : "'Source Serif Pro', serif", "fontSize" : "30px"}}>User Login</h1>

                    <div>
                        <label htmlFor="street" style={{"marginBottom": "0", "marginTop": "5px"}}>Email</label>
                        <div>
                            <input type="text" name="email" value={user.email} onChange={e => {
                                const s = {...user};
                                s.email = e.target.value;
                                setUser(s);
                            }} required placeholder="Mandatory"/></div>
                    </div>
                    <div>
                        <label htmlFor="street" style={{"marginBottom": "0", "marginTop": "5px"}}>Password</label>
                        <div>
                            <input type="password" name="password" value={user.password} onChange={e => {
                                const s = {...user};
                                s.password = e.target.value;
                                setUser(s);
                            }} required placeholder="Mandatory"/></div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn  btn-outline-dark" style={{"marginTop" : "15px"}} onClick={handleSubmit}>Login</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Login;