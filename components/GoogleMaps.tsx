import React, { useState } from "react";
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

// Adds a marker to the map.
function addMarker(location: any, map: any) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  new Marker({
    position: location,
    label: "Claimed Location",
    map,
  });
}

const GoogleMaps = ({ location }) => {
  const defaultCenter = { lat: location.lat, lng: location.lng };
  const [claimedAddress, setClaimedAddress] = useState(null);

  const RegularMap = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap
        key="map"
        defaultZoom={8}
        defaultCenter={defaultCenter}
        defaultOptions={defaultOptions}
        onClick={(e) => {
          console.log("EEE", e);
          // addMarker(e.latLng, this);
          setClaimedAddress(e.latLng);
        }}
      >
        <Marker position={defaultCenter} />
        {/* {claimedAddress ? <Marker position={claimedAddress} /> : null} */}
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
