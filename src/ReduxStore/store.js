import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./Reducers/PostsSlice";
import { commentReducer } from "./Reducers/CommentSlice";
import { subredditReducer } from "./Reducers/SubRedditSlice";
import { getSubRedditPostsReducer } from "./Reducers/SubRedditPostsSlice";
import { subredditAboutReducer } from "./Reducers/SubRedditAboutSlice";
import { userAboutReducer } from "./Reducers/userAboutSlice";
import { getuserPostsReducer } from "./Reducers/userPostsSlice";
const reducer = {
  posts: postsReducer,
  comments: commentReducer,
  subReddit: subredditReducer,
  subRedditPosts: getSubRedditPostsReducer,
  subredditAbout: subredditAboutReducer,
  userAbout: userAboutReducer,
  userPosts: getuserPostsReducer,
};
export const store = configureStore({
  reducer,
});
