import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { commentFetch } from "../../API_Calls/RedditApiCalls";

export const getComments = createAsyncThunk(
  '"comment/getAllComments',
  async (param, thunkAPI) => {
    const response = await commentFetch(param);
    return response;
  }
);

const initialState = {
  status: "idle",
  isLoading: true,
  commentData: [],
  isError: "null",
  error: "",
};

export const commentSlice = createSlice({
  name: "comments",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getComments.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [getComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.status = "succeeded";
      state.commentData = action.payload;
    },
    [getComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export const commentReducer = commentSlice.reducer