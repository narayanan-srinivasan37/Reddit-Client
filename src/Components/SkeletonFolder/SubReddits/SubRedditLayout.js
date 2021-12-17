import React from "react";
import SkeletonElement from "../Layouts/Skeleton";

const SubRedditLayoutRow = () => {
  return (
    <div style={{ display: "flex", paddingLeft: '10px' }}>
      <SkeletonElement type="avatar" />
      <div style={{ width: "100%" ,paddingLeft:'10px',paddingRight:'10px'}}>
        <SkeletonElement type="skeleton-title" />
        
        <SkeletonElement type="text" />
        
      </div>
    </div>
  );
};

export const SubRedditLayout = () => {
  return <SubRedditLayoutRow />;
};
