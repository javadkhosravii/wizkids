import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accountType: "notAuthenticated" | "user" | "guest";
}

const initialState: AuthState = {
  accountType: "notAuthenticated",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // The login action now expects a payload of type "wizkid" or "user".
    login: (
      state,
      action: PayloadAction<"user" | "guest" | "notAuthenticated">
    ) => {
      state.accountType = action.payload;
    },
    logout: (state) => {
      state.accountType = "notAuthenticated";
    },
    setAccountType: (state, action: PayloadAction<"user" | "guest">) => {
      state.accountType = action.payload;
    },
  },
});

export const { login, logout, setAccountType } = authSlice.actions;
export default authSlice.reducer;
