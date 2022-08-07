import { Box } from "@mui/material";
import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { CartProvider } from "react-use-cart";
import { useAppSelector } from "./app/hooks";
import { selectIsAuthenticated } from "./app/reducers/CurrentUserSlice";
import IsEditableProvider from "./Components/context/IsEditableContext";
import RmaDisplay from "./Components/display/RmaDisplay";
import TLoanDisplay2 from "./Components/display/TloanDisplay2";
import TLoanManagerExtensionDisplay from "./Components/display/TloanManagerExtensionDisplay";
import TopNav from "./Components/header/TopNav";
import Sidebar from "./Components/sidebar/SideBar";
import Login from "./Pages/auth/Login";
import MultiFactorAuthentication from "./Pages/auth/MultiFactorAuthentication";
import BinLocations from "./Pages/binlocations/BinLocations";
import Dashboard from "./Pages/dashboards/Dashboards";
import Error401 from "./Pages/error/Error401";
import Error403 from "./Pages/error/Error403";
import Error404 from "./Pages/error/Error404";
import AddNotificationGroup from "./Pages/notificationgroups/AddNotificationGroup";
import EditNotificationGroup from "./Pages/notificationgroups/EditNotificationGroup";
import NotificationGroups2 from "./Pages/notificationgroups/NotificationGroups2";
import ViewNotificationGroup from "./Pages/notificationgroups/ViewNotificationGroup";
import Products from "./Pages/products/Products";
import ViewProduct from "./Pages/products/ViewProduct";
import ForgetPassword from "./Pages/resetpassword/ForgetPassword";
import ResetPassword from "./Pages/resetpassword/ResetPassword";
import CreateRMA from "./Pages/rma/NewRma";
import RMA from "./Pages/rma/Rma";
import Settings from "./Pages/settings/Settings";
import NewTLoan from "./Pages/tloans/Newtloan";
import TLoan from "./Pages/tloans/Tloan";
import AddUserGroup from "./Pages/usergroups/AddUserGroup";
import EditUserGroup from "./Pages/usergroups/EditUserGroup";
import UserGroups2 from "./Pages/usergroups/UserGroups2";
import ViewUserGroup from "./Pages/usergroups/ViewUserGroup";
import AddUser from "./Pages/users/AddUser";
import EditUser from "./Pages/users/EditUser";
import Profile from "./Pages/users/Profile";
import Users2 from "./Pages/users/Users2";
import ViewUser from "./Pages/users/ViewUser";

// const context = useContext(EditableContext)
// const {isEditable, TLoanIDGlobal} = context

interface ProtectedRouteProps {
  loginpage: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ loginpage }) => {
  //const token = localStorage.getItem("token");
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  if (loginpage) {
    if (isAuthenticated) {
      return <Navigate replace to="/dashboard" />;
    }
    return <Outlet />;
  }
  if (!isAuthenticated) {
    return <Navigate replace to="/login" />;
    //return <Navigate replace to="/401" />;
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
                  element={<TLoanManagerExtensionDisplay/>}
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
