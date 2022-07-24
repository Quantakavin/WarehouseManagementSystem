import { Action, createStore, ThunkAction } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import RootReducer from "./reducers/RootReducer";

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
