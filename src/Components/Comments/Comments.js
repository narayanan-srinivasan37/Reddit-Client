import React, { useEffect, useState } from "react";
import CommentsRow from "../CommentsRow/CommentsRow";

import "./Comments.css";

const Comment = (props) => {
  const [Commentdata, setCommentData] = useState([]);
  useEffect(() => {
      const allData = props.comments;
      const filterData = allData.filter(
        (data, index) => index !== allData.length - 1
      );
      const filteredData = filterData.map((data, index) => {
        const child = data.data;
        return {
          text: child.body,
          ups: child.ups,
          author: child.author,
          created: child.created,
        };
      });
      setCommentData(filteredData);
  }, [props]);

  return (
    <div className="comment-div">
      <p className="discussion">Discussions</p>
      {Commentdata && Commentdata.map((data, index) => {
            return (
              <div key={index} className="comment-row">
                <CommentsRow data={data} />
              </div>
            );
          })
       }
    </div>
  );
};

export default Comment;
