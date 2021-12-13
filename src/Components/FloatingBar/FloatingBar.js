import React from "react";
import "./FloatingBar.css";
import { BsReddit } from "react-icons/bs";
import { Link } from "react-router-dom";
const FloatingBar = (props) => {
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
    <div className="scroll-bar-view">
      <Link className="scroll-bar-view" to={`/subreddit/${props.displayName}`}>
        {DisplayImg()}
        <p>{props.displayName}</p>
      </Link>
    </div>
  );
};

export default FloatingBar;
