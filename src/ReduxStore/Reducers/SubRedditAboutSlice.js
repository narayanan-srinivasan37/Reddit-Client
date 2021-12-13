
import { subredditAbout } from "../../API_Calls/RedditApiCalls";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getsubredditAbout = createAsyncThunk(
  "subreddit/subredditAbout",
  async (param, thunkAPI) => {
    const response = await subredditAbout(param);
    return response;
  }
);

const initialState = {
  status: "idle",
  isLoading: true,
  subredditaboutData: [],
  isError: "null",
  error: "",
};

export const getSubRedditAboutSlice = createSlice({
  name: "subreddits",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getsubredditAbout.pending]: (state) => {
      state.isError = false;
      state.isLoading = true;
    },
    [getsubredditAbout.fulfilled]: (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.subredditaboutData = action.payload;
      state.status = "succeeded";
    },
    [getsubredditAbout.rejected]: (state, action) => {
      state.isError = true;
      state.error = action.error;
      state.isLoading = false;
      state.status = "failed";
    },
  },
});

export const subredditAboutReducer = getSubRedditAboutSlice.reducer;
