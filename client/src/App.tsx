import TopBar from "./components/header/TopBar";
import Sidebar from "./components/SideBar";
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
import BinLocations from "./pages/binlocations/BinLocations";
import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
    <header>
      <TopBar />
    </header>
    <div className="bluebackground">
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/binlocations" element={<BinLocations />} />
      <Route path="/adduser" element={<AddUser />} />
      <Route path="/edituser/:id" element={<EditUser />} />
      <Route path="/addusergroup" element={<AddUserGroup />} />
      <Route path="/addnotificationgroup" element={<AddNotificationGroup />} />
    </Routes>
    </div>
    </>
  );
};

export default App;
