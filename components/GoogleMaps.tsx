import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const defaultOptions = { scrollwheel: false };

const loadingElementStyle = { height: "100%" };
const containerElementStyle = { height: "280px" };
const mapElementStyle = { height: "100%" };

const GoogleMaps = ({ location }) => {
  const defaultCenter = { lat: location.lat, lng: location.lng };

  const RegularMap = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={defaultCenter}
        defaultOptions={defaultOptions}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    ))
  );
  return (
    <div
      style={{
        width: "100rem",
      }}
    >
      <RegularMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBugmuemdXwaoIsifa2YypfEK7H0g9QpSE"
        loadingElement={<div style={loadingElementStyle} />}
        containerElement={<div style={containerElementStyle} />}
        mapElement={<div style={mapElementStyle} />}
      />
    </div>
  );
};

export default GoogleMaps;
