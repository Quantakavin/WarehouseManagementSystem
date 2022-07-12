import { combineReducers } from "redux";
import CurrentUserReducer from "./CurrentUserSlice";
import SidebarReducer from "./SidebarSlice";
import RmaReducer from "./RmaReducer";

const RootReducer = combineReducers({
  currentUser: CurrentUserReducer,
  sidebar: SidebarReducer,
  rma: RmaReducer,
});

export default RootReducer;
