import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface CurrentUserState {
  id: number | null;
  // token: string | null;
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
  // token: null,
  role: null,
  isAuthenticated: false,
  enabled2FA: false,
  permissions: null,
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<CurrentUserState>) => {
      state.id = action.payload.id;
      // state.token = action.payload.token;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      state.permissions = action.payload.permissions;
      state.enabled2FA = action.payload.enabled2FA;
    },
    removeUser: (state) => {
      state.id = null;
      // state.token = action.payload.token;
      state.name = null;
      state.role = null;
      state.isAuthenticated = false;
      state.enabled2FA = false;
      state.permissions = null;
    },
    enable2FA: (state) => {
      state.enabled2FA = true;
    },
    disable2FA: (state) => {
      state.enabled2FA = false;
    }
  },
});

export const { setUser, removeUser, enable2FA, disable2FA} = currentUserSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectName = (state: RootState) => state.currentUser.name;
export const selectRole = (state: RootState) => state.currentUser.role;
export const selectId = (state: RootState) => state.currentUser.id;
export const selectIsAuthenticated = (state: RootState) =>
  state.currentUser.isAuthenticated;
  export const selectEnabled2FA = (state: RootState) =>
  state.currentUser.enabled2FA;
export const selectPermissions = (state: RootState) =>
  state.currentUser.permissions;

export default currentUserSlice.reducer;
