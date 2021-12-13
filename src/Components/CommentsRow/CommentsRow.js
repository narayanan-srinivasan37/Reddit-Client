import React from "react";
import "./CommentsRow.css";

import PublishIcon from "@material-ui/icons/Publish";
import { numberFormat } from "../../Helper/NumberFormat";
import { getTimeDate, postCreation } from "../../Helper/time";
const CommentsRow = (props) => {
  const comment = props.data;
  function get_date(date) {
    const get_data = getTimeDate(date * 1000);
    return postCreation(get_data);
  }
  return (
    <div className="comments-row">
      <div>
        <p className="comment-author">
          {comment.author} &nbsp;<span> {get_date(comment.created)}</span>
        </p>

        <p className="comment-text">{comment.text}</p>
      </div>
      <div className="comment-upvote">
        <PublishIcon />
        <p style={{ fontWeight: "bold", fontSize: "1rem" }}>
          {numberFormat(comment.ups)}
        </p>
      </div>
    </div>
  );
};

export default CommentsRow;
