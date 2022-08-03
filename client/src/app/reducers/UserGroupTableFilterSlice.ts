import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface UserGroupTableFilterState {
  sortColumn: string;
  sortOrder: string;
}

// Define the initial state using that type
const initialState: UserGroupTableFilterState = {
  sortColumn: "ID",
  sortOrder: "ASC",
};

export const UserGroupTableFilterSlice = createSlice({
  name: "userGroupTableFilter",
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
  UserGroupTableFilterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSortColumn = (state: RootState) =>
  state.userGroupTableFilter.sortColumn;
export const selectSortOrder = (state: RootState) =>
  state.userGroupTableFilter.sortOrder;

export default UserGroupTableFilterSlice.reducer;
