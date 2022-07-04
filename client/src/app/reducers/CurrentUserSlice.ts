import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

// Define a type for the slice state
interface CurrentUserState {
  id: number | null;
  // token: string | null;
  name: string | null;
  role: string | null;
  isAuthenticated?: boolean;
}

// Define the initial state using that type
const initialState: CurrentUserState = {
  id: null,
  name: null,
  // token: null,
  role: null,
  isAuthenticated: false
}

export const currentUserSlice = createSlice({
  name: 'currentUser',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<CurrentUserState>) => {
        state.id = action.payload.id;
        // state.token = action.payload.token;
        state.name = action.payload.name;
        state.role = action.payload.role;
        state.isAuthenticated = true;
    },
    removeUser: state => {
        state = initialState;
    },
  }
})

export const { setUser, removeUser } = currentUserSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectName = (state: RootState) => state.currentUser.name

export default currentUserSlice.reducer