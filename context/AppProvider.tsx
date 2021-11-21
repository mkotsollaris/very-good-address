import React, { useState } from "react";
import { AppContext } from "./AppContext";

interface AppProviderProps {
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

const AppProvider = ({ children }: AppProviderProps) => {
  const [distance, setDistance] = useState(null);

  return (
    <AppContext.Provider value={{ distance, setDistance }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
export { getDistanceFromLatLonInKm };
