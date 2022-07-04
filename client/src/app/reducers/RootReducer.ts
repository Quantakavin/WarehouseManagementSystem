import { combineReducers } from "redux";
import CurrentUserReducer from '../reducers/CurrentUserSlice';
import SidebarReducer from '../reducers/SidebarSlice';

const RootReducer = combineReducers({
    currentUser: CurrentUserReducer,
    sidebar: SidebarReducer
})

export default RootReducer;