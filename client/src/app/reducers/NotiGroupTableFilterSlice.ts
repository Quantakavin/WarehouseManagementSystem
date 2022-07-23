import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Define a type for the slice state
interface NotiGroupTableFilterState {
  sortColumn: string;
  sortOrder: string;
}

// Define the initial state using that type
const initialState: NotiGroupTableFilterState = {
  sortColumn: "ID",
  sortOrder: "ASC",
};

export const NotiGroupTableFilterSlice = createSlice({
  name: "notiGroupTableFilter",
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
  NotiGroupTableFilterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSortColumn = (state: RootState) =>
  state.notiGroupTableFilter.sortColumn;
export const selectSortOrder = (state: RootState) =>
  state.notiGroupTableFilter.sortOrder;

export default NotiGroupTableFilterSlice.reducer;
