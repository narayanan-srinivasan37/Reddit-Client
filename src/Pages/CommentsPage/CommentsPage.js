import React, { useEffect } from "react";
import Comments from "../../Components/Comments/Comments";
import SinglePost from "../../Components/SinglePost/SinglePost";
import "./CommentsPage.css";
import { getComments } from "../../ReduxStore/Reducers/CommentSlice";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import CommentsLayout from "../../Components/SkeletonFolder/CommentsLayout/CommentsLayout";
import CardLayout from "../../Components/SkeletonFolder/Card/CardLayout";
import ErrorCard from "../../Components/Card/ErrorCard/ErrorCard";
import ComponentLayout from "../../Components/ComponentLayout/ComponentLayout";
const CommentsPage = () => {
  const pathname = useParams();
  const dispatch = useDispatch();
  const { isLoading, isError, error, commentData } = useSelector((state) => {
    return state.comments;
  });
  useEffect(() => {
    dispatch(getComments(pathname));

    return () => {};
  }, []);

  if (isError) {
    console.log(error)
    return <ErrorCard error={error.message}/>;
  }
  if (isLoading) {
    return (
      <ComponentLayout sideBarProps={{ filter: false }}>
        <div
          style={{ display: "flex", flexDirection: "column" }}
        >
          <CardLayout />
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <CommentsLayout key={index} />
          ))}
        </div>
      </ComponentLayout>
    );
  }
  return (
    <ComponentLayout sideBarProps={{ filter: false }}>
      {commentData && (
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <SinglePost postData={commentData[0].data.children} />
          <Comments comments={commentData[1].data.children} />
        </div>
      )}
    </ComponentLayout>
  );
};

export default CommentsPage;
