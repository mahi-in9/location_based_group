import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import groupSlice from "./slice/groupSlice";
import memberSlice from "./slice/memberSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    groups: groupSlice,
    member: memberSlice,
  },
});
