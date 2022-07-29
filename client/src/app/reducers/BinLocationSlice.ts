import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Define a type for the slice state
interface BinLocationState {
  cameraposition: [x: number, y: number, z: number];
}

// Define the initial state using that type
const initialState: BinLocationState = {
  cameraposition: [0, 40, 150],
};

export const BinLocationSlice = createSlice({
  name: "binlocation",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    ChangeLocation: (
      state,
      action: PayloadAction<{
        cameraposition: [x: number, y: number, z: number];
      }>
    ) => {
      state.cameraposition = action.payload.cameraposition;
    },
  },
});

export const { ChangeLocation } = BinLocationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCameraPosition = (state: RootState) =>
  state.binlocation.cameraposition;

export default BinLocationSlice.reducer;
