import { combineReducers } from "redux";
import CurrentUserReducer from "../reducers/CurrentUserSlice";
import SidebarReducer from "../reducers/SidebarSlice";
import NotiGroupTableFilterSlice from "./NotiGroupTableFilterSlice";
import RmaReducer from "./RmaReducer";
import UserGroupTableFilterSlice from "./UserGroupTableFilterSlice";
import UserTableFilterSlice from "./UserTableFilterSlice";

const RootReducer = combineReducers({
  currentUser: CurrentUserReducer,
  sidebar: SidebarReducer,
  rma: RmaReducer,
  userTableFilter: UserTableFilterSlice,
  userGroupTableFilter: UserGroupTableFilterSlice,
  notiGroupTableFilter: NotiGroupTableFilterSlice,
});

export default RootReducer;
