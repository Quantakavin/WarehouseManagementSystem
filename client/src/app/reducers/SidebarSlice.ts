import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface SidebarState {
  open: boolean;
  currenttab: string;
}

// Define the initial state using that type
const initialState: SidebarState = {
  open: true,
  currenttab: "Dashboard",
};

export const SidebarSlice = createSlice({
  name: "sidebar",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    ChangeTab: (state, action: PayloadAction<{ currenttab: string }>) => {
      state.currenttab = action.payload.currenttab;
    },
    Open: (state) => {
      state.open = true;
    },
    Close: (state) => {
      state.open = false;
    },
  },
});

export const { ChangeTab, Open, Close } = SidebarSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentTab = (state: RootState) => state.sidebar.currenttab;
export const selectOpen = (state: RootState) => state.sidebar.open;

export default SidebarSlice.reducer;
