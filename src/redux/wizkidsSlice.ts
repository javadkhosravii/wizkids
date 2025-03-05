// src/redux/wizkidsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Wizkid } from "@/types/wizkids.type";
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
      // id is hash of email
      action.payload.id = hashEmail(action.payload.email);
      state.list.push(action.payload);
    },
    updateWizkid: (
      state,
      action: PayloadAction<{ email: string; data: Partial<Wizkid> }>
    ) => {
      const { email, data } = action.payload;
      const index = state.list.findIndex((w) => w.email === email);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...data };
      }
    },
  },
});

export const { addWizkid, updateWizkid } = wizkidsSlice.actions;
export default wizkidsSlice.reducer;

function hashEmail(email: string) {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash.toString(16);
}
