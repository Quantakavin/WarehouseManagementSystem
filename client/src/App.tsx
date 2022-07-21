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
import Profile from "./pages/users/Profile";
import UserGroups from "./pages/usergroups/UserGroups";
import ViewUserGroup from "./pages/usergroups/ViewUserGroup";
import AddNotificationGroup from "./pages/notificationgroups/AddNotificationGroup";
import EditNotificationGroup from "./pages/notificationgroups/EditNotificationGroup";
import NotificationGroups from "./pages/notificationgroups/NotificationGroups";
import ViewNotificationGroup from "./pages/notificationgroups/ViewNotificationGroup";
import Dashboard from "./pages/dashboards/Dashboards";
import Products from "./pages/products/Products";
import ProductsPag from "./pages/products/TestProducts";
import ViewProduct from "./pages/products/ViewProduct";
import BinLocations from "./pages/binlocations/BinLocations";
import TLoan from "./pages/tloans/tloan";
import RMA from "./pages/rma/rma";
import CreateRMA from "./pages/rma/createRma";
import Sidebar2 from "./components/sidebar/Sidebar2";
import TopNav from "./components/header/TopNav";
import TLoanDisplay from "./components/display/tloanDisplay";
import RmaDisplay from "./components/display/rmaDisplay";
import NewTLoan from "./pages/tloans/newtloan";
import Products2 from "./pages/products/Products2";
import TLoanDisplay2 from "./components/display/tloanDisplay2";
import TLoanManagerDisplay from "./components/display/tloanManagerDisplay"
import Users2 from "./pages/users/Users2";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { selectIsAuthenticated, selectName } from "./app/reducers/CurrentUserSlice";
import UserGroups2 from "./pages/usergroups/UserGroups2";
import NotificationGroups2 from "./pages/notificationgroups/NotificationGroups2";
import ViewUser2 from "./pages/users/ViewUser2";
import ViewUserGroup2 from "./pages/usergroups/ViewUserGroup2";
import { Box } from "@mui/material";
import Modals12 from './components/display/TloanModal/modal'
import Error404 from './pages/Error404'

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

  return (
    <>
      <header>
        <TopBar />
      </header>
      <Box className="flexcontainer">
        {isAuthenticated ? <Sidebar /> : null}
        <Box className="bluebackground" style={{ flex: 5 }}>
          <Routes>
            <Route element={<ProtectedRoute loginpage={true} />}>
              <Route path="/login" element={<Navigate replace to="/" />} />
              <Route path="/" element={<Login />} />
            </Route>
            <Route element={<ProtectedRoute loginpage={false} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products2 />} />
              <Route path="/productspag" element={<ProductsPag />} />
              <Route path="/product/:id" element={<ViewProduct />} />
              <Route path="/binlocations" element={<BinLocations />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/user/:id" element={<ViewUser2 />} />
              <Route path="/users" element={<Users2 />} />
              <Route path="/adduser" element={<AddUser />} />
              <Route path="/edituser/:id" element={<EditUser />} />
              <Route path="/usergroups" element={<UserGroups2 />} />
              <Route path="/usergroup/:id" element={<ViewUserGroup2 />} />
              <Route path="/addusergroup" element={<AddUserGroup />} />
              <Route path="/editusergroup/:id" element={<EditUserGroup />} />
              <Route path="/notificationgroups" element={<NotificationGroups2 />} />
              <Route path="/notificationgroup/:id" element={<ViewNotificationGroup />} />
              <Route path="/addnotificationgroup" element={<AddNotificationGroup />} />
              <Route path="/editnotificationgroup/:id" element={<EditNotificationGroup />} />
              <Route path="/tloan" element={<TLoan />} />
              <Route path="/rma" element={<RMA />} />
              <Route path="/createRma" element={<CreateRMA />} />
              <Route path="/rmaDetails/:RmaID" element={<RmaDisplay />} />
              <Route path="/tloandetails/:TLoanNumber" element={<TLoanDisplay2 />} />
              <Route path="/newtloan" element={<NewTLoan />} />
              <Route path="/modal" element={<Modals12 />} />
              <Route path="/error404" element={<Error404 />} />
              <Route path="/tloanManagerDisplay/:TLoanNumber" element={<TLoanManagerDisplay/>} />
              
            </Route>
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default App;
