import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import styles from "../styles/Home.module.css";

const ExplainResponseWidget = ({}: {}) => {
  const { distance, cityVerified, countryVerified, regionVerified } =
    useContext(AppContext);
  console.log(
    "checkme",
    distance,
    cityVerified,
    countryVerified,
    regionVerified
  );
  return (
    <div className={styles.card}>
      Distance {distance} <br />
      Verified City {cityVerified.toString()}
      <br />
      countryVerified {countryVerified.toString()}
      <br />
      regionVerified {regionVerified.toString()}
    </div>
  );
};

export default ExplainResponseWidget;
