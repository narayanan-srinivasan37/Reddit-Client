import React, { useEffect, lazy } from "react";
import { useParams } from "react-router";

import ComponentLayout from "../../Components/ComponentLayout/ComponentLayout";
import { getAllPosts } from "../../ReduxStore/Reducers/PostsSlice";
import { useDispatch, useSelector } from "react-redux";
import CardLayout from "../../Components/SkeletonFolder/Card/CardLayout";
import ErrorCard from "../../Components/Card/ErrorCard/ErrorCard";

const Post = lazy(() => import("../../Components/Post/Post"));
const HomePage = () => {
  const dispatch = useDispatch();
  const pathname = useParams();
  const { isLoading, isError, postsData, error } = useSelector(
    (state) => state.posts
  );
  useEffect(() => {
    dispatch(getAllPosts(pathname.filtertype));
    return () => {};
  }, [pathname.filtertype]);

  if (isError) {
    return <ErrorCard error={error.message} />;
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
    <React.Suspense fallback={<CardLayout/>}>
    <ComponentLayout sideBarProps={{ filter: true }}>
      {postsData && <Post postData={postsData} />}
    </ComponentLayout>
    </React.Suspense>
  );
};
export default HomePage;
