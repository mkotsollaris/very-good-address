import React, { useContext, useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { AppContext } from "../context/AppContext";
import {
  getDistanceFromLatLonInKm,
  getGeoCodeFormattedAddresses,
  verifyAddress,
} from "../context/AppProvider";

const defaultOptions = { scrollwheel: false };
const loadingElementStyle = { height: "100%" };
const containerElementStyle = { height: "280px" };
const mapElementStyle = { height: "100%" };

const GoogleMaps = ({ location }) => {
  const { city, country, region } = useContext(AppContext);
  console.log("HEY", city, country, region);
  const defaultCenter = { lat: location.lat, lng: location.lng };
  const [claimedAddress, setClaimedAddress] = useState(null);
  const {
    setDistance,
    setCountryVerified,
    setCityVerified,
    setRegionVerified,
  } = useContext(AppContext);

  // TODO avoid re-render https://github.com/tomchentw/react-google-maps/issues/220
  const RegularMap = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap
        key="map"
        defaultZoom={8}
        defaultCenter={defaultCenter}
        defaultOptions={defaultOptions}
        onClick={async (e) => {
          console.log("EEE", e);
          // addMarker(e.latLng, this);
          setClaimedAddress(e.latLng);
          const d = getDistanceFromLatLonInKm(
            defaultCenter.lat,
            defaultCenter.lng,
            e.latLng.lat(),
            e.latLng.lng()
          );
          const { formattedAddresses, computedCountry } =
            await getGeoCodeFormattedAddresses(e.latLng.lat(), e.latLng.lng());
          const cityVerified = verifyAddress(formattedAddresses, city);
          const countryVerified = computedCountry === country;
          console.log("computedCountry", computedCountry, country);
          const regionVerified = verifyAddress(formattedAddresses, region);
          console.log(
            "cityVerified",
            cityVerified,
            "countryVerified",
            countryVerified,
            "regionVerified",
            regionVerified
          );
          setCityVerified(cityVerified);
          setCountryVerified(countryVerified);
          setRegionVerified(regionVerified);
          setDistance(d);
          console.log("DISTACNE", d);
        }}
      >
        <Marker position={defaultCenter} />
        {claimedAddress ? <Marker position={claimedAddress} /> : null}
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
