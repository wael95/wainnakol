import React from "react";
import MapStyle from './Mapstyle';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from "react-google-maps";

//the map page renders the google map dependency based on th coordenates that it will reciev from App 
//if the is no data like initial state the map render Alriyadh location
class MapWrap extends React.Component {
  render() {
    return (
      <GoogleMap
        defaultZoom={14}
        defaultOptions={{
          fullscreenControl: false,
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          placesController:false,
          draggable: false,
          //map style to change the style of the map
          styles:MapStyle
        }}
        
        center={{
          lat: this.props.lat ? parseFloat(this.props.lat) : 24.734519,
          lng: this.props.long ? parseFloat(this.props.long) : 46.684216
        }}
      >
        {/* the marker is hedden in the initail state and be shown when restaurant is fetched */}
        {this.props.isMarkerShown &&
        <Marker
          options={{ icon: require("./maps_marker.png") }}
          position={{
            lat: this.props.lat ? parseFloat(this.props.lat) : 24.734519,
            lng: this.props.long ? parseFloat(this.props.long) : 46.684216
          }}
        />}
      </GoogleMap>
    );
  }
}
//helps wrap google map with google map dependency 
const WrappedMap = withScriptjs(withGoogleMap(MapWrap));
export default WrappedMap;
