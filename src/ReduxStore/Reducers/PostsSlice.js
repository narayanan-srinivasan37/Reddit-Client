import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPostData } from "../../API_Calls/RedditApiCalls";

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (param = "", thunkAPI) => {
    const response = await fetchPostData(param);
    return response;
  }
);

const initialState = {
  status: "idle",
  isLoading: true,
  postsData: [],
  isError: "null",
  error: "",
};
export const PostsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getAllPosts.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.status = "succeeded";
      state.postsData = action.payload;
    },
    [getAllPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error;
    },
  },
});

export const postsReducer = PostsSlice.reducer;
