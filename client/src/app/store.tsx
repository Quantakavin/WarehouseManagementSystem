import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import CurrentUserReducer from './reducers/CurrentUserSlice';
import SidebarReducer from './reducers/SidebarSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    currentUser: CurrentUserReducer,
    sidebar: SidebarReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
