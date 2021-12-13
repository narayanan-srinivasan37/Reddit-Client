import React from "react";
import SkeletonElement from "../Layouts/Skeleton";

const SubRedditLayoutRow = () => {
  return (
    <div style={{ display: "flex" }}>
      <SkeletonElement type="avatar" />
      <div style={{ width: "100%" }}>
        <SkeletonElement type="title" />
        <SkeletonElement type="spantext" />
      </div>
    </div>
  );
};

export const SubRedditLayout = () => {
  return <SubRedditLayoutRow />;
};
