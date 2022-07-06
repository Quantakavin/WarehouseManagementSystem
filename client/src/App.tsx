import TopBar from "./components/header/TopBar";
import Sidebar from "./components/sidebar/SideBar";
import React from "react";
import Login from "./pages/users/Login";
import AddUser from "./pages/users/AddUser";
import EditUser from "./pages/users/EditUser";
import Users from "./pages/users/Users";
import ViewUser from "./pages/users/ViewUser";
import AddUserGroup from "./pages/usergroups/AddUserGroup";
import EditUserGroup from "./pages/usergroups/EditUserGroup";
import UserGroups from "./pages/usergroups/UserGroups";
import ViewUserGroup from "./pages/usergroups/ViewUserGroup";
import AddNotificationGroup from "./pages/notificationgroups/AddNotificationGroup";
import EditNotificationGroup from "./pages/notificationgroups/EditNotificationGroup";
import NotificationGroups from "./pages/notificationgroups/NotificationGroups";
import ViewNotificationGroup from "./pages/notificationgroups/ViewNotificationGroup";
import Dashboard from "./pages/dashboards/Dashboards";
import Products from "./pages/products/Products";
import TestProducts from "./pages/products/TestProducts";
import BinLocations from "./pages/binlocations/BinLocations";
import TLoan from "./pages/tloans/tloan";
import RMA from "./pages/rma/rma";
import CreateRMA from "./pages/rma/createRma";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import {
  selectIsAuthenticated,
  selectName,
} from "./app/reducers/CurrentUserSlice";

interface ProtectedRouteProps {
  loginpage: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ loginpage }) => {
  const token = localStorage.getItem("token");
  if (loginpage) {
    if (token) {
      return <Navigate replace to="/dashboard" />;
    } else {
      return <Outlet />;
    }
  } else {
    if (!token) {
      return <Navigate replace to="/" />;
    } else {
      return <Outlet />;
    }
  }
};

const App: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  console.log(isAuthenticated);

  return (
    <>
      <header>
        <TopBar />
      </header>
      <div className="flexcontainer" style={{ flexDirection: "row" }}>
        {isAuthenticated ? <Sidebar /> : null}
        <div className="bluebackground" style={{ flex: 5 }}>
          <Routes>
            <Route element={<ProtectedRoute loginpage={true} />}>
              <Route path="/login" element={<Navigate replace to="/" />} />
              <Route path="/" element={<Login />} />
            </Route>
            <Route element={<ProtectedRoute loginpage={false} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/testproducts" element={<TestProducts />} />
              <Route path="/binlocations" element={<BinLocations />} />
              <Route path="/adduser" element={<AddUser />} />
              <Route path="/user/:id" element={<ViewUser />} />
              <Route path="/users" element={<Users />} />
              <Route path="/edituser/:id" element={<EditUser />} />
              <Route path="/addusergroup" element={<AddUserGroup />} />
              <Route
                path="/addnotificationgroup"
                element={<AddNotificationGroup />}
              />
              <Route path="/tloan" element={<TLoan />} />
              <Route path="/tloan" element={<TLoan />} />
              <Route path="/rma" element={<RMA />} />
              <Route path="/createRma" element={<CreateRMA />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
