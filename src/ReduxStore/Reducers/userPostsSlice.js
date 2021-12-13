import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userPosts } from "../../API_Calls/RedditApiCalls";


export const getuserPosts = createAsyncThunk(
  "user/allPosts",
  async (param, thunkAPI) => {
    const response = await userPosts(param);
    return response;
  }
);
const initialState = {
  status: "idle",
  isLoading: true,
  userpostsData: [],
  isError: "null",
  error: "",
};

const getuserPostsSlice = createSlice({
  name: "userPosts",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getuserPosts.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [getuserPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.status = "succeeded";
      state.userpostsData = action.payload;
    },
    [getuserPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export const getuserPostsReducer = getuserPostsSlice.reducer;
