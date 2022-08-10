import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface NotificationState {
  // inappnotifications: any[]
  notificationCount: number;
}

// Define the initial state using that type
const initialState: NotificationState = {
  // inappnotifications: []
  notificationCount: 0,
};

export const notificationSlice = createSlice({
  name: "notifications",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setNotificationCount: (state, action: PayloadAction<NotificationState>) => {
      state.notificationCount = action.payload.notificationCount;
    },
    resetNotificationCount: (state) => {
      state.notificationCount = 0;
    },
    /*
    setNotifications: (state, action: PayloadAction<NotificationState>) => {
      state.inappnotifications = action.payload.inappnotifications;
    },
    removeNotifications: (state) => {
        state.inappnotifications = [];
    }
    */
  },
});

// export const { setNotifications, removeNotifications } =
// notificationSlice.actions;
export const { setNotificationCount, resetNotificationCount } =
  notificationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectNotifications = (state: RootState) => state.notification.inappnotifications;
export const selectNotificationCount = (state: RootState) =>
  state.notification.notificationCount;

export default notificationSlice.reducer;
