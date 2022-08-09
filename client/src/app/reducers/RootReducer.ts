import { combineReducers } from "redux";
import BinLocationSlice from "./BinLocationSlice";
import CurrentUserReducer from "./CurrentUserSlice";
import NotiGroupTableFilterSlice from "./NotiGroupTableFilterSlice";
import RmaReducer from "./RmaReducer";
import SidebarReducer from "./SidebarSlice";
import UserGroupTableFilterSlice from "./UserGroupTableFilterSlice";
import UserTableFilterSlice from "./UserTableFilterSlice";
import NotificationSlice from "./NotificationSlice";

const RootReducer = combineReducers({
  currentUser: CurrentUserReducer,
  sidebar: SidebarReducer,
  rma: RmaReducer,
  userTableFilter: UserTableFilterSlice,
  userGroupTableFilter: UserGroupTableFilterSlice,
  notification: NotificationSlice,
  notiGroupTableFilter: NotiGroupTableFilterSlice,
  binlocation: BinLocationSlice,
});

export default RootReducer;
