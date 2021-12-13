import React, { useEffect } from "react";
import SubRowDisplay from "../SubRowDisplay/SubRowDisplay";
import "./SubReddit.css";
import { getAllSubReddit } from "../../ReduxStore/Reducers/SubRedditSlice";
import { useDispatch, useSelector } from "react-redux";
import { SubRedditLayout } from "../SkeletonFolder/SubReddits/SubRedditLayout";
import FloatingBar from "../FloatingBar/FloatingBar";
export default function SubReddit() {
  const { isLoading, subredditData } = useSelector((state) => {
    return state.subReddit;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSubReddit());
    return () => {};
  }, []);
  if (isLoading) {
    return (
      <div className="sub-reddit" id="sub-reddit-display">
        <div className="sub-reddit-title">
          <p>Sub Reddit</p>
          <hr />
        </div>
        <div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => {
            return <SubRedditLayout key={index} />;
          })}
        </div>
      </div>
    );
  }

  let filteredData = subredditData.map((data) => {
    return {
      displayName: data.data.display_name,
      url: data.data.url,
      displayImg: data.data.icon_img,
      key: data.data.id,
      subscribersCount: data.data.subscribers,
    };
  });

  return (
    <>
      <div className="sub-reddit" id="sub-reddit-display">
        <div className="sub-reddit-title">
          <p>Sub Reddit</p>
          <hr />
        </div>
        <div>
          {filteredData.map((data) => {
            return <SubRowDisplay {...data} />;
          })}
        </div>
      </div>
      <div className="floating-bar">
        {filteredData.map((data) => {
         
          return <FloatingBar {...data} />;
        })}
      </div>
    </>
  );
}
