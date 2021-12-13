import React from "react";
import { BsReddit } from "react-icons/bs";
import "./SubRowDisplay.css";
import { Link } from "react-router-dom";
import { numberFormat } from "../../Helper/NumberFormat.js";
export default function SubRowDisplay(props) {
  const DisplayImg = () => {
    if (props.displayImg === null || props.displayImg === "") {
      return <BsReddit className="display-icon" />;
    } else {
      return (
        <img
          className="display-icon"
          src={props.displayImg}
          alt={props.displayName}
        />
      );
    }
  };
  return (
    <div className="display-anchor">
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to={`/subreddit/${props.displayName}`}
      >
        <div className="sub-row-display">
          {DisplayImg()}
          <div className="display-text">
            <span>{props.displayName}</span>{" "}
            <p
              style={{ color: "grey", fontSize: "15px", textTransform: "none" }}
            >
              {numberFormat(props.subscribersCount)} subscribers
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
