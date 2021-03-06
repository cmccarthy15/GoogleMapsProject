import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle
} from 'react-google-maps'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAddrThunk, getSelectedThunk } from '../store'


export class MyMapComponent extends Component {

  componentDidMount(){
    console.log('map mounted with user: ', this.props.user);
    this.props.getMapInfo(this.props.user.id);
  }

  render(){
    const { onMapLoaded } = this.props;
    console.log('map features: ', this.props.features)
    console.log('this component has addresses... ', this.props.addresses)
    return (
      <GoogleMap
        ref={onMapLoaded}
        defaultZoom={12}
        center={{
          lat: 40.764,
          lng: -74.005
        }} >
        {this.props.addresses.map( address => {
          return (
            <div key={address.id}>
              <Marker position={{ lat: Number(address.lat), lng: Number(address.lng) }} />
              <Circle
                options={{ strokeColor: '#FF0000', fillColor: `#ff0000` }}
                center={{
                  lat: Number(address.lat),
                  lng: Number(address.lng)
                }}
                radius={this.props.user.radius}
              />
            </div>
          )
        })}
        {this.props.features.map(feature => {
          return (
            <div key={feature.id}>
              <Marker
                position={{ lat: Number(feature.lat), lng: Number(feature.lng) }}
                icon={{ scaledSize: {width: 20, height: 20}, url: `${feature.feature.icon}`}} />
            </div>
          )
        })}
      </GoogleMap>
    )
  }
}


// const MyMapComponent = withScriptjs(withGoogleMap(({
//   isMarkerShown=true,
//   onMapLoaded=_ => _,
// }) =>
//   ))
const mapState = (state) => {
  return {
    addresses: state.addresses,
    user: state.user,
    features: state.features
  }
}

const mapDispatch = (dispatch) => {
  return {
    getMapInfo(userId) {
      dispatch(getAddrThunk(userId))
      dispatch(getSelectedThunk(userId))
    }
  }
}


export default connect(mapState, mapDispatch)(withScriptjs(withGoogleMap(MyMapComponent)));
