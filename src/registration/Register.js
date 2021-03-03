import UserRegister from "./UserRegister";
import ProviderRegister from "./ProviderRegister";
import React, {useState} from 'react';

function Register(props) {

    const [userVisible, setUserVisible] = useState(true);
    const [providerVisible, setProviderVisible] = useState(true);

    const handleChange = (e) => {
        if(e.target.value === "user"){
            setUserVisible(false);
            setProviderVisible(true);
        }
        if(e.target.value === "service-provider"){
            setUserVisible(true);
            setProviderVisible(false);
        }
    }

    return (
        <div>
            <div>
                <div className="d-flex justify-content-center">
                    <form>
                        <div style={{"marginTop" : "15px"}}><i>Please choose your role to continue</i></div>

                        <div className="input-group mb-3 margin-top-25">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="inputGroupSelect01">Role</label>
                            </div>
                            <select className="custom-select" id="inputGroupSelect01" onChange={handleChange} required>
                                <option value="" selected>Choose...</option>
                                <option value="user">User</option>
                                <option value="service-provider">Service Provider</option>
                                <option value="supplier">Supplier</option>
                            </select>
                        </div>
                    </form>
                </div>

                <div hidden={userVisible}><UserRegister/></div>
                <div hidden={providerVisible}><ProviderRegister/></div>

            </div>
        </div>
    );
}

export default Register;