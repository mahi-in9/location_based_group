import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createGroupAPI,
  getGroupsAPI,
  getSingleGroupAPI,
} from "../../services/group.service";

export const fetchGroups = createAsyncThunk(
  "groups/fetchGroups",
  async (params, thunkAPI) => {
    try {
      return await getGroupsAPI(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch groups",
      );
    }
  },
);

export const fetchSingleGroup = createAsyncThunk(
  "groups/fetchSingleGroup",
  async (id, thunkAPI) => {
    try {
      return await getSingleGroupAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch group",
      );
    }
  },
);

export const createGroup = createAsyncThunk(
  "groups/createGroup",
  async (payload, thunkAPI) => {
    try {
      return await createGroupAPI(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create group",
      );
    }
  },
);

const initialState = {
  groups: [],
  group: null,
  loading: false,
  error: null,
};

const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(fetchSingleGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.group = action.payload;
      })
      .addCase(fetchSingleGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGroup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default groupSlice.reducer;
