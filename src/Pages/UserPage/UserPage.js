import React, { useEffect } from "react";
import { getuserPosts } from "../../ReduxStore/Reducers/userPostsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ComponentLayout from "../../Components/ComponentLayout/ComponentLayout";
import Post from "../../Components/Post/Post";
import CardLayout from "../../Components/SkeletonFolder/Card/CardLayout";
import ErrorCard from "../../Components/Card/ErrorCard/ErrorCard";
const UserPage = () => {
  const dispatch = useDispatch();
  const pathname = useParams();
  const { isLoading, isError, userpostsData, error } = useSelector(
    (state) => state.userPosts
  );
  useEffect(() => {
    dispatch(getuserPosts(pathname.username));
    return () => {};
  }, [pathname.username]);
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
    <ComponentLayout sideBarProps={{ user: true, username: pathname.username }}>
      <Post postData={userpostsData.data.children} />
    </ComponentLayout>
  );
};

export default UserPage;
