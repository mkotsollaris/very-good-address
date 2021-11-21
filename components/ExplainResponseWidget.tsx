import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import styles from "../styles/Home.module.css";

const ExplainResponseWidget = ({
  cityVerified,
  countryVerified,
}: {
  cityVerified: boolean;
  countryVerified: boolean;
}) => {
  const { distance } = useContext(AppContext);

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
