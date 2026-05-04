// src/redux/memberSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

// JOIN GROUP
export const joinGroup = createAsyncThunk(
  "member/join",
  async (groupId, thunkAPI) => {
    try {
      const res = await API.post("/members/join", { groupId });
      return { groupId, data: res.data.data };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// LEAVE GROUP
export const leaveGroup = createAsyncThunk(
  "member/leave",
  async (groupId, thunkAPI) => {
    try {
      await API.post("/members/leave", { groupId });
      return groupId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// GET USER GROUPS
export const fetchUserGroups = createAsyncThunk(
  "member/userGroups",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/members/user/me"); // or /user/:id
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

const memberSlice = createSlice({
  name: "member",
  initialState: {
    myGroups: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH USER GROUPS
      .addCase(fetchUserGroups.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.myGroups = action.payload;
      })
      .addCase(fetchUserGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // JOIN
      .addCase(joinGroup.fulfilled, (state, action) => {
        state.myGroups.push(action.payload.data);
      })

      // LEAVE
      .addCase(leaveGroup.fulfilled, (state, action) => {
        state.myGroups = state.myGroups.filter(
          (g) => g.groupId._id !== action.payload
        );
      });
  },
});

export default memberSlice.reducer;