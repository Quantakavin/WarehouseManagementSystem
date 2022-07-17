import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface RmaState {
  RmaID: number | null;
  Company: string | null;
  Email: string | null;
  ContactNo: number | null;
  RmaStatusID: number | null;
  ItemCode: number | null;
  InvoiceNo: string | null;
  DoNo: string | null;
  DateOfPurchase: string | null;
  ReasonForReturn: string | null;
  isAuthenticated?: boolean;
}

// Define the initial state using that type
const initialState: RmaState = {
  RmaID: null,
  Company: null,
  Email: null,
  ContactNo: null,
  RmaStatusID: null,
  ItemCode: null,
  InvoiceNo: null,
  DoNo: null,
  DateOfPurchase: null,
  ReasonForReturn: null,
  isAuthenticated: false,
};

export const RmaSlice = createSlice({
  name: "rma",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    createRMA: (state, action: PayloadAction<RmaState>) => {
      state.RmaID = action.payload.RmaID;
      state.Company = action.payload.Company;
      state.Email = action.payload.Email;
      state.ContactNo = action.payload.ContactNo;
      state.ItemCode = action.payload.ItemCode;
      state.InvoiceNo = action.payload.InvoiceNo;
      state.DoNo = action.payload.DoNo;
      state.DateOfPurchase = action.payload.DateOfPurchase;
      state.ReasonForReturn = action.payload.ReasonForReturn;
      state.isAuthenticated = true;
    },
    acceptRMA: (state) => {
      state = initialState;
      state.RmaStatusID;
    },
    rejectRMA: (state) => {
      state = initialState;
    },
    receiveRMA: (state) => {
      state = initialState;
    },
    verifyRMA: (state) => {
      state = initialState;
    },
    COARMA: (state) => {
      state = initialState;
    },
  },
});

export const {
  createRMA,
  acceptRMA,
  rejectRMA,
  receiveRMA,
  verifyRMA,
  COARMA,
} = RmaSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectRma = (state: RootState) => state.rma.RmaID;

export default RmaSlice.reducer;
