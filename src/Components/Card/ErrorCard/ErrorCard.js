import React from "react";

const ErrorCard = (props) => {
  return (
    <div
      style={{
        textAlign: "center",
        fontSize: "3rem",
        backgroundColor: " #FFCCCC",
        margin: "20px",
      }}
    >
      {
        props.error&&<div>
          <p>Your connection is currently offline!</p>
          <p>{props.error}</p>
        </div>
      }
    </div>
  );
};
export default ErrorCard;
