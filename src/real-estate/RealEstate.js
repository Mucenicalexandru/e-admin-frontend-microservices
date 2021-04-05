import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../context/UserContext";
import {floors} from "../util/numbers";
import {rooms} from "../util/numbers";

function RealEstate(props) {

    const value = useContext(UserContext);
    const [activeUser, setActiveUser] = useState({});
    const [floorError, setFloorError] = useState(false);
    const [addAnOffer, setAddAnOffer] = useState(false);

    const [offer, setOffer] = useState({
        title : "",
        numberOfRooms : "",
        price : "",
        location : "",
        surface : "",
        floor : "",
        totalNumberOfFloors : "",
        constructionYear : "",
        parkingSpaces : "",
        bathroomsNumber : "",
        offerType : ""
    })

    const floor = () => {
        if(parseInt(offer.floor) > parseInt(offer.totalNumberOfFloors)){
            setFloorError(true);
        }
    }

    return (
        <div>
            <h1 className="d-flex justify-content-center" >Real Estate</h1>

            <div className="d-flex justify-content-center margin-top-25">
                <button className="btn btn-outline-primary" onClick={(e) => {
                    e.preventDefault();
                    setFloorError(false);
                }}>See available offers</button>
            </div>


            <div className="d-flex justify-content-center margin-top-25">
                <button className="btn btn-outline-success" onClick={(e) => {
                    e.preventDefault();
                    setAddAnOffer(!addAnOffer)
                    setFloorError(false);
                }}>Sell / Rent</button>
            </div>

            {floorError &&  <div  className={"d-flex justify-content-center"}>
                <div className={"floor-error"}>
                    <p style={{ margin: 'auto' }}>Your floor number cannot be higher than the building maximum floor number</p>
                </div>
            </div>}

            <form action="">

                <div className="d-flex justify-content-center margin-top-25">
                    <div hidden={!addAnOffer} className={"card shadow"}>
                        <p style={{"padding" : "10px"}}><i>*By default, location will be same like your registered address</i></p>
                        {/*SELL / RENT*/}
                        <div className="d-flex justify-content-center">

                            <label className={"margin-right-10"} htmlFor="rdo1" checked>
                                <input type="radio" id="rdo1" name="radio" onChange={(e) => {
                                    const s = {...offer};
                                    s.offerType = "sell";
                                    setOffer(s);
                                }}/>
                                <span> </span>
                                <span>Sell</span>
                            </label>

                            <label htmlFor="rdo2">
                                <input type="radio" id="rdo2" name="radio" onChange={(e) => {
                                    const s = {...offer};
                                    s.offerType = "rent";
                                    setOffer(s);
                                }} />
                                <span> </span>
                                <span>Rent</span>
                            </label>
                        </div>
                        {/*TITLE*/}
                        <div className="d-flex justify-content-center">
                            <div className={"margin-top-15 "}>
                                <input type="text" name="title"  style={{"width" : "262px"}} placeholder="Title" onChange={(e) => {
                                    const s = {...offer};
                                    s.title = e.target.value;
                                    setOffer(s);
                                }}/>
                            </div>
                        </div>
                        {/*NUMBER OF ROOMS*/}
                        <div className="d-flex justify-content-center">
                            <select className=" custom-select margin-top-25 " id="inputGroupSelect01"  style={{"width" : "262px"}} onChange={(e) => {
                                const s = {...offer};
                                s.numberOfRooms = e.target.value;
                                setOffer(s);
                            }}>
                                <option value="" selected>Number of rooms...</option>
                                {rooms.map((number, index) => {
                                    return <option value={number}>{number}</option>
                                })}
                            </select>
                        </div>
                        {/*SURFACE*/}
                        <div className="d-flex justify-content-center">
                            <div className={"margin-top-15 "}>
                                <input type="text" name="title"  style={{"width" : "262px"}} placeholder="Surface in sqm"onChange={(e) => {
                                    const s = {...offer};
                                    s.surface = e.target.value;
                                    setOffer(s);
                                }}/>
                            </div>
                        </div>
                        {/*FLOOR*/}
                        <div className="d-flex justify-content-center">
                            <select className=" custom-select margin-top-15 " id="inputGroupSelect01"  style={{"width" : "262px"}}onChange={(e) => {
                                const s = {...offer};
                                s.floor = e.target.value;
                                setOffer(s);
                            }}>
                                <option value="" selected>Floor number...</option>
                                {floors.map((number, index) => {
                                    return <option value={number}>{number}</option>
                                })}
                            </select>
                        </div>
                        {/*BUILDING TOTAL FLOOR NUMBER*/}
                        <div className="d-flex justify-content-center">
                            <select className=" custom-select margin-top-15 " id="inputGroupSelect01"  style={{"width" : "262px"}}onChange={(e) => {
                                const s = {...offer};
                                s.totalNumberOfFloors = e.target.value;
                                setOffer(s);
                            }}>
                                <option value="" selected>Building total floor number...</option>
                                {floors.map((number, index) => {
                                    return <option value={number}>{number}</option>
                                })}
                            </select>
                        </div>
                        {/*YEAR*/}
                        <div className="d-flex justify-content-center">
                            <div className={"margin-top-15 "}>
                                <input type="text" name="year"  style={{"width" : "262px"}} placeholder="Construction year"onChange={(e) => {
                                    const s = {...offer};
                                    s.constructionYear = e.target.value;
                                    setOffer(s);
                                }}/>
                            </div>
                        </div>
                        {/*PARKING*/}
                        <div className="d-flex justify-content-center">
                            <select className=" custom-select margin-top-15 " id="inputGroupSelect01"  style={{"width" : "262px"}}onChange={(e) => {
                                const s = {...offer};
                                s.parkingSpaces = e.target.value;
                                setOffer(s);
                            }}>
                                <option value="" selected>Parking spaces...</option>
                                <option value={"0"}>0</option>
                                <option value={"1"}>1</option>
                                <option value={"2"}>2</option>
                            </select>
                        </div>
                        {/*BATHROOMS*/}
                        <div className="d-flex justify-content-center">
                            <select className=" custom-select margin-top-15 " id="inputGroupSelect01"  style={{"width" : "262px"}}onChange={(e) => {
                                const s = {...offer};
                                s.bathroomsNumber = e.target.value;
                                setOffer(s);
                            }}>
                                <option value="" selected>Bathrooms...</option>
                                <option value={"1"}>1</option>
                                <option value={"2"}>2</option>
                                <option value={"3"}>3</option>
                            </select>
                        </div>
                        {/*PRICE*/}
                        <div className="d-flex justify-content-center">
                            <div className={"margin-top-15 margin-bottom-15"}>
                                <input type="text" name="year"  style={{"width" : "262px"}} placeholder="Price in EUR"onChange={(e) => {
                                    const s = {...offer};
                                    s.price = e.target.value;
                                    setOffer(s);
                                }}/>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center">
                            <button className="btn btn-outline-primary margin-top-15 margin-bottom-25" onClick={(e) => {
                                e.preventDefault();
                                const s = {...offer};
                                s.location = activeUser.buildingStreet + ", " + activeUser.buildingNumber + ", " + activeUser.town;
                                setOffer(s);
                                console.log(offer);
                                floor();
                            }}>Add</button>
                        </div>

                    </div>
                </div>
            </form>


        </div>
    );
}

export default RealEstate;