import React from "react";
import SkeletonElement from "../Layouts/Skeleton";
import './CommentsLayout.css'
const CommentsLayout = () => {
  return (
    <div className="comments-row">
      <div>
        <SkeletonElement className="comment-author" type="title" />
        &nbsp;
        <SkeletonElement type="spantext" />
        <SkeletonElement type="text" />
      </div>
      <div className="comment-upvote">
        <SkeletonElement type="spantext" />
      </div>
    </div>
  );
};

export default CommentsLayout;
