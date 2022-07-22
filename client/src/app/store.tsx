import {
  configureStore,
  createStore,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import CurrentUserReducer from "./reducers/CurrentUserSlice";
import SidebarReducer from "./reducers/SidebarSlice";
import RootReducer from "./reducers/RootReducer";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["currentUser", "sidebar"],
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

// export const store = configureStore({
//   // reducer: {
//   //  // persistedReducer
//   //   currentUser: CurrentUserReducer,
//   //   sidebar: SidebarReducer
//   // },
//   reducer: {
//     RootReducer
//   },
// });

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof RootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
