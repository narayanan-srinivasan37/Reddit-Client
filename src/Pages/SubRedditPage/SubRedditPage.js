import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ComponentLayout from "../../Components/ComponentLayout/ComponentLayout";
import { getSubRedditPosts } from "../../ReduxStore/Reducers/SubRedditPostsSlice";
import Post from "../../Components/Post/Post";
import CardLayout from "../../Components/SkeletonFolder/Card/CardLayout";
import ErrorCard from "../../Components/Card/ErrorCard/ErrorCard";
const SubRedditPage = () => {
  const pathname = useParams();
  const dispatch = useDispatch();
  const { isLoading, isError, error, subredditpostsData } = useSelector(
    (state) => {
      return state.subRedditPosts;
    }
  );
  useEffect(() => {
    dispatch(getSubRedditPosts(pathname.subreddittype));

    return () => {};
  }, [pathname.subreddittype]);
  if (isError) {
    return <ErrorCard error={error.message} />;
  }
  if (isLoading) {
    return (
      <ComponentLayout>
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <CardLayout key={index} />
        ))}
      </ComponentLayout>
    );
  }
  return (
    <div>
      <ComponentLayout
        sideBarProps={{ about: true, subreddittype: pathname.subreddittype }}
      >
        <Post postData={subredditpostsData.data.children} />
      </ComponentLayout>
    </div>
  );
};

export default SubRedditPage;
