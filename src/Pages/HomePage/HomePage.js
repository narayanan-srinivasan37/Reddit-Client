import React, { useEffect } from "react";
import { useParams } from "react-router";
import Post from "../../Components/Post/Post";
import ComponentLayout from "../../Components/ComponentLayout/ComponentLayout";
import { getAllPosts } from "../../ReduxStore/Reducers/PostsSlice";
import { useDispatch, useSelector } from "react-redux";
import CardLayout from "../../Components/SkeletonFolder/Card/CardLayout";
import ErrorCard from "../../Components/Card/ErrorCard/ErrorCard";
const HomePage = (props) => {
  const dispatch = useDispatch();
  const pathname = useParams();
  const { isLoading, isError, postsData, error } = useSelector(
    (state) => state.posts
  );
  useEffect(() => {
    dispatch(getAllPosts(pathname.filtertype));
    return () => {};
  },[] );

  if (isError) {
   
    return <ErrorCard error={error.message}/>;
  }
  if (isLoading) {
    return (
      <ComponentLayout sideBarProps={{ filter: true }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
          <CardLayout key={index} />
        ))}
      </ComponentLayout>
    );
  }
  return (
    <ComponentLayout sideBarProps={{ filter: true }}>
      {postsData && <Post postData={postsData} />}
    </ComponentLayout>
  );
};
export default HomePage;
