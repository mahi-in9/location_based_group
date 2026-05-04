// src/redux/groupSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

// GET ALL GROUPS
export const fetchGroups = createAsyncThunk(
  "groups/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/groups");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

// CREATE GROUP
export const createGroup = createAsyncThunk(
  "groups/create",
  async (groupData, thunkAPI) => {
    try {
      const res = await API.post("/groups", groupData);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

// GET NEARBY GROUPS
export const fetchNearbyGroups = createAsyncThunk(
  "groups/nearby",
  async ({ latitude, longitude }, thunkAPI) => {
    try {
      const res = await API.get("/groups/nearby", {
        params: { latitude, longitude },
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

const groupSlice = createSlice({
  name: "groups",
  initialState: {
    groups: [],
    nearbyGroups: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createGroup.fulfilled, (state, action) => {
        state.groups.push(action.payload);
      })

      // NEARBY
      .addCase(fetchNearbyGroups.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNearbyGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.nearbyGroups = action.payload;
      })
      .addCase(fetchNearbyGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default groupSlice.reducer;
