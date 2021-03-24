import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import {properties} from "../util/properties";

export class MapContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            mapCenter: {
                lat: 0,
                lng: 0
            }
        };
    }


    componentDidMount() {
        console.log(this.props.location.address)
        geocodeByAddress(this.props.location.address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                this.setState({ mapCenter: latLng });
            })
            .catch(error => console.error('Error', error));
    }

    render() {
        return (
            <>
                <div>
                    <h1 style={{"marginLeft" : "100px","fontFamily" : "'Source Serif Pro', serif", "fontSize" : "30px", "marginTop" : "25px"}}>{this.props.location.address}</h1>
                    <Map google={this.props.google}
                         initialCenter={{
                             lat: this.state.mapCenter.lat,
                             lng: this.state.mapCenter.lng
                         }}
                         center={{
                             lat: this.state.mapCenter.lat,
                             lng: this.state.mapCenter.lng
                         }}
                         style={{"marginLeft" : "100px", "width" : "600px", "height" : "400px"}}
                    >
                        <Marker position={{lat: this.state.mapCenter.lat, lng: this.state.mapCenter.lng}} />
                    </Map>
                </div>
            </>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: (properties.googleKey)
})(MapContainer)