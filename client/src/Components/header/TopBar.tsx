import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import defaultprofile from "../../assets/defaultprofile.png";
import navbarbrand from "../../assets/navbarbrand.png";

function TopBar() {
  const navigate = useNavigate();
  const [showNavDropdown, setShowNavDropdown] = useState<boolean>(false);
  const [showProfileDropdown, setShowProfileDropdown] =
    useState<boolean>(false);

  const logout = () => {
    setShowProfileDropdown(false);
    localStorage.clear();
    navigate("/");
  };

  const ProfileDropdown = (
    <div className="navprofiledropdown">
      <a
        onClick={() => {
          if (localStorage.getItem("user_id") !== null) {
            navigate(`/profile/${localStorage.getItem("user_id")}`);
          }
        }}
      >
        <AccountCircleIcon style={{ marginRight: 5 }} /> Profile
      </a>
      <hr className="navprofiledivider" />
      <a onClick={() => navigate("/settings")}>
        <SettingsIcon style={{ marginRight: 5 }} /> Settings
      </a>
      <hr className="navprofiledivider" />
      <a onClick={() => logout()}>
        <LogoutIcon style={{ marginRight: 5 }} /> Logout
      </a>
    </div>
  );

  const ProfileContainer = (
    <div
      className="navprofile flexcontainer"
      onMouseEnter={() => setShowProfileDropdown(true)}
      onMouseLeave={() => setShowProfileDropdown(false)}
    >
      <img
        alt="ISDN Logo"
        src={defaultprofile}
        width="30"
        height="30"
        className="d-inline-block align-top"
        style={{ marginRight: 10 }}
      />
      <p className="navprofilename">{localStorage.getItem("username")}</p>
      {showProfileDropdown ? (
        <>
          <KeyboardArrowUpIcon />
          {ProfileDropdown}
        </>
      ) : (
        <KeyboardArrowDownIcon />
      )}
    </div>
  );

  const LoggedInLinks = (
    <div className="flexcontainer hideinmobile">
      <a href="/">
        <NotificationsIcon />
      </a>
      {ProfileContainer}
    </div>
  );

  const LoggedOutLinks = (
    <div className="hideinmobile">
      <a href="/login">
        <motion.button
          className="navbutton"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      </a>
    </div>
  );

  const MobileNavLinks = (
    <div className="navcollapseddropdown flexcontainer hideindesktop">
      {localStorage.getItem("user_id") !== null ? (
        <>
          <a href="/">Notifications</a>
          <a href="/">Profile</a>
          <a href="/">Settings</a>
          <a href="#" onClick={() => logout()}>
            Logout
          </a>
        </>
      ) : (
        <a href="/login">Login</a>
      )}
    </div>
  );

  return (
    <Navbar className="shadow-sm" variant="light" expand="lg">
      <Container fluid>
        <a className="brand" href="/">
          <img
            alt="ISDN Logo"
            src={navbarbrand}
            width="130"
            height="40"
            className="d-inline-block align-top"
            style={{ marginRight: 10 }}
          />
        </a>
        <Nav className="navlinks">
          {localStorage.getItem("token") === null
            ? LoggedOutLinks
            : LoggedInLinks}
          <div className="hideindesktop">
            {showNavDropdown ? (
              <CloseIcon
                type="button"
                onClick={() => setShowNavDropdown(false)}
              />
            ) : (
              <MenuIcon
                type="button"
                onClick={() => setShowNavDropdown(true)}
              />
            )}
          </div>
        </Nav>
      </Container>
      {showNavDropdown ? MobileNavLinks : null}
    </Navbar>
  );
}
export default TopBar;
