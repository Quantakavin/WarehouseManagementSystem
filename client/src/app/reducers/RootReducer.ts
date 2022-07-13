import { combineReducers } from "redux";
import CurrentUserReducer from '../reducers/CurrentUserSlice';
import SidebarReducer from '../reducers/SidebarSlice';
import RmaReducer from "./RmaReducer";
import UserTableFilterSlice from "./UserTableFilterSlice";
import UserGroupTableFilterSlice from "./UserGroupTableFilterSlice";
import NotiGroupTableFilterSlice from "./NotiGroupTableFilterSlice";

const RootReducer = combineReducers({
    currentUser: CurrentUserReducer,
    sidebar: SidebarReducer,
    rma: RmaReducer,
    userTableFilter: UserTableFilterSlice,
    userGroupTableFilter: UserGroupTableFilterSlice,
    notiGroupTableFilter: NotiGroupTableFilterSlice
})

export default RootReducer;