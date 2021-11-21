import React, { useState } from "react";
import { AppContext } from "./AppContext";

interface AppProviderProps {
  city: string;
  country: string;
  region: string;
  children: React.ReactNode;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

// Harvesine formula https://stackoverflow.com/a/27943/1373465
const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d.toFixed(2);
};

const verifyAddress = (formattedAddresses: string[], input: string) => {
  return formattedAddresses?.includes(input);
};

// COUNTRY 'US' needs more parsing https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&sensor=true&key=AIzaSyBugmuemdXwaoIsifa2YypfEK7H0g9QpSE
const getCountryFromGeo = (fetchGeoRes) => {
  const countryTypesResponse = fetchGeoRes.results.find((r) => {
    if (r.types.includes("country")) {
      return r;
    }
  });
  return countryTypesResponse?.address_components[0]?.short_name;
};

const getGeoCodeFormattedAddresses: string[] = async (lat, lng) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=AIzaSyBugmuemdXwaoIsifa2YypfEK7H0g9QpSE`;
  const fetcherRes = await fetch(url).then((r) => r.json());
  // need to return city, state/province, country, address
  // return fetcherRes?.results[0]?.geometry?.location;
  const country = getCountryFromGeo(fetcherRes);
  const formattedAddresses = fetcherRes.results
    .map((e) => e.formatted_address.split(",").map((i) => i.trim()))
    .flat();

  return { formattedAddresses, computedCountry: country };
};

const AppProvider = ({ city, country, region, children }: AppProviderProps) => {
  const [distance, setDistance] = useState(null);
  const [cityVerified, setCityVerified] = useState(false);
  const [countryVerified, setCountryVerified] = useState(false);
  const [regionVerified, setRegionVerified] = useState(false);

  return (
    <AppContext.Provider
      value={{
        countryVerified,
        setCountryVerified,
        cityVerified,
        setCityVerified,
        city,
        country,
        region,
        distance,
        setDistance,
        regionVerified,
        setRegionVerified,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export {
  getDistanceFromLatLonInKm,
  getGeoCodeFormattedAddresses,
  verifyAddress,
};
