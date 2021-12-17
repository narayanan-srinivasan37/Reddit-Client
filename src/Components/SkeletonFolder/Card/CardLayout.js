import React from "react";
import SkeletonElement from "../Layouts/Skeleton";
import "./CardLayout.css";

const CardLayout = (props) => {
  return (
    <div className="card-layout">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <SkeletonElement type="avatar" />

        <SkeletonElement type="spantext" />
        <SkeletonElement type="spantext" />
        <SkeletonElement type="spantext" />
      </div>

      <SkeletonElement type="skeleton-title" />
      <div style={{paddingRight:'10px'}}>
      <SkeletonElement type="text" />
      <SkeletonElement type="text" />
      <SkeletonElement type="text" />
      </div>
      <SkeletonElement type="skeleton-content" />
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <SkeletonElement type="button" />
        <SkeletonElement type="button" />
      </div>
    </div>
  );
};

export default CardLayout;
