import React from "react";
import Style from "../styles/spinner.module.css";

const Spinner = ({ color }: { color: String }) => {
  return (
    <div className={Style.ldsRing}>
      <div
        style={{
          border: `3px solid ${color}`,
          borderColor: `${color} transparent transparent transparent`,
        }}
      ></div>
      <div
        style={{
          border: `3px solid ${color}`,
          borderColor: `${color} transparent transparent transparent`,
        }}
      ></div>
      <div
        style={{
          border: `3px solid ${color}`,
          borderColor: `${color} transparent transparent transparent`,
        }}
      ></div>
      <div
        style={{
          border: `3px solid ${color}`,
          borderColor: `${color} transparent transparent transparent`,
        }}
      ></div>
    </div>
  );
};

export default Spinner;
