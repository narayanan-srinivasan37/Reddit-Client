
import { userAbout } from "../../API_Calls/RedditApiCalls";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getuserAbout = createAsyncThunk(
  "user/userAbout",
  async (param, thunkAPI) => {
    const response = await userAbout(param);
    return response;
  }
);

const initialState = {
  status: "idle",
  isLoading: true,
  useraboutData: [],
  isError: "null",
  error: "",
};

export const getuserAboutSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getuserAbout.pending]: (state) => {
      state.isError = false;
      state.isLoading = true;
    },
    [getuserAbout.fulfilled]: (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.useraboutData = action.payload;
      state.status = "succeeded";
    },
    [getuserAbout.rejected]: (state, action) => {
      state.isError = true;
      state.error = action.error;
      state.isLoading = false;
      state.status = "failed";
    },
  },
});

export const userAboutReducer = getuserAboutSlice.reducer;
