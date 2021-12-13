import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { subredditPosts } from "../../API_Calls/RedditApiCalls";

export const getSubRedditPosts = createAsyncThunk(
  "subreddit/allPosts",
  async (param, thunkAPI) => {
    const response = await subredditPosts(param);
    return response;
  }
);
const initialState = {
  status: "idle",
  isLoading: true,
  subredditpostsData: [],
  isError: "null",
  error: "",
};

const getSubRedditPostsSlice = createSlice({
  name: "subredditPosts",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getSubRedditPosts.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [getSubRedditPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.status = "succeeded";
      state.subredditpostsData = action.payload;
    },
    [getSubRedditPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export const getSubRedditPostsReducer = getSubRedditPostsSlice.reducer;
