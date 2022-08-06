import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface CurrentUserState {
  id: number | null;
  mobileNo: string | null;
  token: string | null;
  name: string | null;
  role: string | null;
  isAuthenticated?: boolean;
  enabled2FA?: boolean;
  permissions: any[];
}

// Define the initial state using that type
const initialState: CurrentUserState = {
  id: null,
  name: null,
  token: null,
  role: null,
  isAuthenticated: false,
  enabled2FA: false,
  permissions: null,
  mobileNo: null
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<CurrentUserState>) => {
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.permissions = action.payload.permissions;
      state.enabled2FA = action.payload.enabled2FA;
      state.mobileNo = action.payload.mobileNo
    },
    removeUser: (state) => {
      state.id = null;
      state.token = null;
      state.name = null;
      state.role = null;
      state.isAuthenticated = false;
      state.enabled2FA = false;
      state.permissions = null;
      state.mobileNo = null
    },
    // authenticateUser: (state,  action: PayloadAction<{token: string | null}>) => {
    //   state.token = action.payload.token
    //   state.isAuthenticated = true
    // },
    authenticateUser: (state) => {
      state.isAuthenticated = true
    },
    enable2FA: (state) => {
      state.enabled2FA = true;
    },
    disable2FA: (state) => {
      state.enabled2FA = false;
    }
  },
});

export const { setUser, removeUser, enable2FA, disable2FA, authenticateUser } = currentUserSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectToken = (state: RootState) => state.currentUser.token;
export const selectName = (state: RootState) => state.currentUser.name;
export const selectRole = (state: RootState) => state.currentUser.role;
export const selectId = (state: RootState) => state.currentUser.id;
export const selectIsAuthenticated = (state: RootState) =>
  state.currentUser.isAuthenticated;
  export const selectEnabled2FA = (state: RootState) =>
  state.currentUser.enabled2FA;
export const selectPermissions = (state: RootState) =>
  state.currentUser.permissions;
export const selectMobileNo = (state: RootState) =>
  state.currentUser.mobileNo;

export default currentUserSlice.reducer;
