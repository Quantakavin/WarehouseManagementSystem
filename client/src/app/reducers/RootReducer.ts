import { combineReducers } from "redux";
import BinLocationReducer from "./BinLocationSlice";
import CurrentUserReducer from "./CurrentUserSlice";
import NotiGroupTableFilterReducer from "./NotiGroupTableFilterSlice";
import RmaReducer from "./RmaReducer";
import SidebarReducer from "./SidebarSlice";
import UserGroupTableFilterReducer from "./UserGroupTableFilterSlice";
import UserTableFilterReducer from "./UserTableFilterSlice";
import NotificationReducer from "./NotificationSlice";

const RootReducer = combineReducers({
  currentUser: CurrentUserReducer,
  sidebar: SidebarReducer,
  rma: RmaReducer,
  userTableFilter: UserTableFilterReducer,
  userGroupTableFilter: UserGroupTableFilterReducer,
  notification: NotificationReducer,
  notiGroupTableFilter: NotiGroupTableFilterReducer,
  binlocation: BinLocationReducer,
});

export default RootReducer;
