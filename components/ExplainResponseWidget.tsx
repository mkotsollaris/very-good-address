import React from "react";
import styles from "../styles/Home.module.css";

const ExplainResponseWidget = ({
  distance,
  cityVerified,
  countryVerified,
}: {
  distance: number;
  cityVerified: boolean;
  countryVerified: boolean;
}) => {
  return (
    <div className={styles.card}>
      Distance {distance} <br />
      Verified City {cityVerified}
      <br />
      countryVerified {countryVerified}
      <br />
    </div>
  );
};

export default ExplainResponseWidget;
