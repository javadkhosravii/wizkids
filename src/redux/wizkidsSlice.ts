// src/redux/wizkidsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Wizkid } from "@/types/wizkids.type";
import { wizkids as initialWizkids } from "../data/wizkids";
import { toast } from "sonner";
import { hashEmail, hashPassword } from "@/lib/utils";

interface WizkidsState {
  list: Wizkid[];
  currentUser: Wizkid | null;
}

const initialState: WizkidsState = {
  list: initialWizkids,
  currentUser: null,
};

const wizkidsSlice = createSlice({
  name: "wizkids",
  initialState,
  reducers: {
    fire: (state, action: PayloadAction<string>) => {
      if (!state.currentUser || state.currentUser.fired) {
        toast("Not authenticated");
        return;
      }
      if (state.currentUser.id === action.payload) {
        toast("You cannot fire yourself");
        return;
      }
      const index = state.list.findIndex((w) => w.id === action.payload);
      if (index !== -1) {
        state.list[index].fired = true;
      }
    },
    addWizkid: (state, action: PayloadAction<Wizkid>) => {
      // is user authenticated and not fired
      if (!state.currentUser || state.currentUser.fired) {
        toast("Not authenticated");
        return;
      }
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
      // hash password before saving
      action.payload.password = hashPassword(action.payload.password);
      state.list.push(action.payload);
    },
    updateWizkid: (
      state,
      action: PayloadAction<{ email: string; data: Partial<Wizkid> }>
    ) => {
      // is user authenticated and not fired
      if (!state.currentUser || state.currentUser.fired) {
        toast("Not authenticated");
        return;
      }
      const { email, data } = action.payload;
      const index = state.list.findIndex((w) => w.email === email);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...data };
      }
    },
    deleteWizkid: (state, action: PayloadAction<string>) => {
      // Filter using the id property
      // return if not authenticated
      if (!state.currentUser || state.currentUser.fired) {
        toast("Not authenticated");
        return;
      }
      const isUserIdCurrentlyLoggedIn = state.currentUser!.id === action.payload;
      // if the user is deleting their own account, log them out after deletion
      if (isUserIdCurrentlyLoggedIn) {
        state.currentUser = null;
      }
      state.list = state.list.filter((wizkid) => wizkid.id !== action.payload);
    },
    // New login reducer: Checks for a wizkid with matching email and password.
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      const { email, password } = action.payload;
      const user = state.list.find(
        (wizkid) =>
          wizkid.email.toLowerCase() === email.toLowerCase() &&
          wizkid.password === hashPassword(password)
      );
      if (user) {
        if (user.fired) {
          toast("You are fired");
          return;
        }
        state.currentUser = user;
        window.open("/", "_self");
      } else {
        toast("Invalid credentials");
        return;
      }
    },
    // New logout reducer: Clears the currentUser.
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { addWizkid, updateWizkid, deleteWizkid, login, logout, fire } =
  wizkidsSlice.actions;
export default wizkidsSlice.reducer;