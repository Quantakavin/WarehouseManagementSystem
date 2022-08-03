import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface UserTableFilterState {
  sortColumn: string;
  sortOrder: string;
}

// Define the initial state using that type
const initialState: UserTableFilterState = {
  sortColumn: "ID",
  sortOrder: "ASC",
};

export const UserTableFilterSlice = createSlice({
  name: "userTableFilter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    ChangeSortColumn: (state, action: PayloadAction<{ column: string }>) => {
      state.sortColumn = action.payload.column;
    },
    SortDesc: (state) => {
      state.sortOrder = "DESC";
    },
    SortAsc: (state) => {
      state.sortOrder = "ASC";
    },
  },
});

export const { ChangeSortColumn, SortDesc, SortAsc } =
  UserTableFilterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSortColumn = (state: RootState) =>
  state.userTableFilter.sortColumn;
export const selectSortOrder = (state: RootState) =>
  state.userTableFilter.sortOrder;

export default UserTableFilterSlice.reducer;
