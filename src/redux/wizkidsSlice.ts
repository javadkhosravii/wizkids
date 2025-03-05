// src/redux/wizkidsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Wizkid } from "@/@types/wizkids.type";
import { wizkids as initialWizkids } from "../data/wizkids";
import { toast } from "sonner";

interface WizkidsState {
  list: Wizkid[];
}

const initialState: WizkidsState = {
  list: initialWizkids,
};

const wizkidsSlice = createSlice({
  name: "wizkids",
  initialState,
  reducers: {
    addWizkid: (state, action: PayloadAction<Wizkid>) => {
      action.payload.profilePicture = `https://i.pravatar.cc/100?img=${Math.floor(
        Math.random() * 70 + 1
      )}`;
      // if email exists, don't add
      if (state.list.find((wizkid) => wizkid.email === action.payload.email)) {
        toast("Email already exists");
        return;
      }
      state.list.push(action.payload);
    },
  },
});

export const { addWizkid } = wizkidsSlice.actions;
export default wizkidsSlice.reducer;

