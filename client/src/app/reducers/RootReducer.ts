import { combineReducers } from "redux";
import CurrentUserReducer from '../reducers/CurrentUserSlice';
import SidebarReducer from '../reducers/SidebarSlice';
import RmaReducer from "./RmaReducer";

const RootReducer = combineReducers({
    currentUser: CurrentUserReducer,
    sidebar: SidebarReducer,
    rma: RmaReducer,
})

export default RootReducer;