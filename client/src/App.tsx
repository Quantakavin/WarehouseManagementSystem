import { Box } from "@mui/material";
import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { CartProvider } from "react-use-cart";
import { useAppSelector } from "./app/hooks";
import { selectIsAuthenticated } from "./app/reducers/CurrentUserSlice";
import IsEditableProvider from "./components/context/IsEditableContext";
import RmaDisplay from "./components/display/RmaDisplay";
import TLoanDisplay2 from "./components/display/TloanDisplay";
import TLoanManagerExtensionDisplay from "./components/display/TloanManagerExtensionDisplay";
import TopNav from "./components/header/TopNav";
import Sidebar from "./components/sidebar/SideBar";
import Login from "./pages/auth/Login";
import MultiFactorAuthentication from "./pages/auth/MultiFactorAuthentication";
import EmptyBins from "./pages/binlocations/EmptyBins";
import BinLocations from "./pages/binlocations/BinLocations";
import Dashboard from "./pages/dashboards/Dashboards";
import Error401 from "./pages/error/Error401";
import Error403 from "./pages/error/Error403";
import Error404 from "./pages/error/Error404";
import AddNotificationGroup from "./pages/notificationgroups/AddNotificationGroup";
import EditNotificationGroup from "./pages/notificationgroups/EditNotificationGroup";
import NotificationGroups2 from "./pages/notificationgroups/NotificationGroups2";
import ViewNotificationGroup from "./pages/notificationgroups/ViewNotificationGroup";
import Products from "./pages/products/Products";
import ViewProduct from "./pages/products/ViewProduct";
import ForgetPassword from "./pages/resetpassword/ForgetPassword";
import ResetPassword from "./pages/resetpassword/ResetPassword";
import CreateRMA from "./pages/rma/NewRma";
import RMA from "./pages/rma/Rma";
import Settings from "./pages/settings/Settings";
import NewTLoan from "./pages/tloans/NewtToan";
import TLoan from "./pages/tloans/Tloan";
import AddUserGroup from "./pages/usergroups/AddUserGroup";
import EditUserGroup from "./pages/usergroups/EditUserGroup";
import UserGroups2 from "./pages/usergroups/UserGroups2";
import ViewUserGroup from "./pages/usergroups/ViewUserGroup";
import AddUser from "./pages/users/AddUser";
import EditUser from "./pages/users/EditUser";
import Profile from "./pages/users/Profile";
import Users2 from "./pages/users/Users2";
import ViewUser from "./pages/users/ViewUser";
import Notifications from "./pages/notifications/Notifcations";

// const context = useContext(EditableContext)
// const {isEditable, TLoanIDGlobal} = context

interface ProtectedRouteProps {
  loginpage: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ loginpage }) => {
  // const token = localStorage.getItem("token");
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  if (loginpage) {
    if (isAuthenticated) {
      return <Navigate replace to="/dashboard" />;
    }
    return <Outlet />;
  }
  if (!isAuthenticated) {
    return <Navigate replace to="/login" />;
    // return <Navigate replace to="/401" />;
  }
  return <Outlet />;
};

const App: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <IsEditableProvider>
      <CartProvider>
        <header style={{ zIndex: 1500 }}>
          <TopNav />
          {/* {isAuthenticated? isEditable?  <Toast2/> :null  : null} */}
        </header>
        <Box className="flexcontainer">
          {isAuthenticated ? <Sidebar /> : null}
          <Box className="bluebackground" style={{ flex: 5 }}>
            <Routes>
              <Route element={<ProtectedRoute loginpage />}>
                <Route path="/401" element={<Error401 />} />
                <Route path="/login" element={<Navigate replace to="/" />} />
                <Route path="/2FA" element={<MultiFactorAuthentication />} />
                <Route path="/" element={<Login />} />
                <Route path="/forgetpassword" element={<ForgetPassword />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
              </Route>
              <Route element={<ProtectedRoute loginpage={false} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/products"
                  element={
                    <CartProvider>
                      <Products />
                    </CartProvider>
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <CartProvider>
                      <ViewProduct />
                    </CartProvider>
                  }
                />
                <Route path="/emptybins" element={<EmptyBins />} />
                <Route path="/binlocations" element={<BinLocations />} />
                <Route path="/rma" element={<RMA />} />
                <Route path="/createRma" element={<CreateRMA />} />
                <Route path="/rmaDetails/:RmaID" element={<RmaDisplay />} />
                <Route
                  path="/tloan"
                  element={
                    <CartProvider>
                      <TLoan />
                    </CartProvider>
                  }
                />

                <Route
                  path="/newtloan"
                  element={
                    <CartProvider>
                      <NewTLoan />
                    </CartProvider>
                  }
                />
                <Route
                  path="/tloandetails/:TLoanID"
                  element={
                    <CartProvider>
                      <TLoanDisplay2 />
                    </CartProvider>
                  }
                />
                <Route
                  path="/tloanManagerExtension/:TLoanID"
                  element={<TLoanManagerExtensionDisplay />}
                />
                <Route path="/profile" element={<Profile />} />
                <Route path="/user/:id" element={<ViewUser />} />
                <Route path="/users" element={<Users2 />} />
                <Route path="/adduser" element={<AddUser />} />
                <Route path="/edituser/:id" element={<EditUser />} />
                <Route path="/usergroups" element={<UserGroups2 />} />
                <Route path="/usergroup/:id" element={<ViewUserGroup />} />
                <Route path="/addusergroup" element={<AddUserGroup />} />
                <Route path="/editusergroup/:id" element={<EditUserGroup />} />
                <Route
                  path="/notificationgroups"
                  element={<NotificationGroups2 />}
                />
                <Route
                  path="/notificationgroup/:id"
                  element={<ViewNotificationGroup />}
                />
                <Route
                  path="/addnotificationgroup"
                  element={<AddNotificationGroup />}
                />
                <Route
                  path="/editnotificationgroup/:id"
                  element={<EditNotificationGroup />}
                />
                <Route path="/settings" element={<Settings />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/403" element={<Error403 />} />
                <Route path="*" element={<Error404 />} />
              </Route>
            </Routes>
          </Box>
        </Box>
      </CartProvider>
    </IsEditableProvider>
  );
};

export default App;
