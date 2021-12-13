import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { subreddit } from "../../API_Calls/RedditApiCalls";

export const getAllSubReddit = createAsyncThunk(
  "subreddit/getAllSubReddit",
  async (param = "", thunkAPI) => {
    const response = await subreddit();
    return response;
  }
);
const initialState = {
  status: "idle",
  isLoading: true,
  subredditData: [],
  isError: "null",
  error: "",
};

export const getSubRedditSlice = createSlice({
  name: "subreddits",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getAllSubReddit.pending]: (state) => {
      state.isError = false;
      state.isLoading = true;
    },
    [getAllSubReddit.fulfilled]: (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.subredditData = action.payload;
      state.status = "succeeded";
    },
    [getAllSubReddit.rejected]: (state, action) => {
      state.isError = true;
      state.error = action.error;
      state.isLoading = false;
      state.status = "failed";
    },
  },
});

export const subredditReducer = getSubRedditSlice.reducer;
