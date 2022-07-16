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
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { removeUser } from '../../app/reducers/CurrentUserSlice'
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";

const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showNavDropdown, setShowNavDropdown] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const profileopen = Boolean(anchorEl);
  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMouseLeave = () => {
    setAnchorEl(null);
  };


  const logout = () => {
    setAnchorEl(null);
    dispatch(removeUser())
    localStorage.clear();
    navigate("/");
  };

  const ProfileDropdown = (
    <>
      <Menu
        id="profilemenu"
        anchorEl={anchorEl}
        open={profileopen}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "headerprofile",
          onMouseLeave: handleMouseLeave
        }}
      >
        <MenuItem
          sx={{ color: "#0A2540" }}
          onClick={() => {
            navigate("/profile");
          }}
        >
          <ListItemIcon sx={{ color: "#0A2540" }}>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ fontSize: "14px", marginLeft: "-7px" }}
          >
            Profile
          </ListItemText>
        </MenuItem>

        <MenuItem
          sx={{ color: "#0A2540" }}
          onClick={() => {
            navigate("/settings");
          }}
        >
          <ListItemIcon sx={{ color: "#0A2540" }}>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ fontSize: "14px", marginLeft: "-7px" }}
          >
            Settings
          </ListItemText>
        </MenuItem>

        <MenuItem
          sx={{ color: "#0A2540" }}
          onClick={() => {
            logout();
          }}
        >
          <ListItemIcon sx={{ color: "#0A2540" }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ fontSize: "14px", marginLeft: "-7px" }}
          >
            Logout
          </ListItemText>
        </MenuItem>
      </Menu>
      {/*
    <div className="navprofiledropdown">
      <a
        onClick={() => {
          if (localStorage.getItem("user_id") !== null) {
            navigate(`/profile`);
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
      </div>*/}
    </>
  );

  const ProfileContainer = (
    <div
      className="navprofile flexcontainer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      id="headerprofile"
      aria-controls={profileopen ? "profilemenu" : undefined}
      aria-haspopup="true"
      aria-expanded={profileopen ? "true" : undefined}
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
      {profileopen ? (
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
          className="mainbutton"
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
};
export default TopBar;
