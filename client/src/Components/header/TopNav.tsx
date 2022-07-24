import React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import defaultprofile from "../../assets/defaultprofile.png";
import navbarbrand from "../../assets/navbarbrand.png";


export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: "white", color: "#0a2540"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <img
            alt="ISDN Logo"
            src={navbarbrand}
            width="130"
            height="40"
            style={{ marginRight: 10 }}
          />
          {/* <Typography variant="h6" noWrap component="div">
            Leaptron
          </Typography> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onMouseOver={handleProfileMenuOpen}
              color="inherit"
            >
                          <img
        alt="Profile Photo"
        src={defaultprofile}
        width="30"
        height="30"
      />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}



// import * as React from 'react';
// import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import MuiDrawer from '@mui/material/Drawer';
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import CssBaseline from '@mui/material/CssBaseline';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import { useAppSelector, useAppDispatch} from '../../app/hooks';
// import { selectCurrentTab, selectOpen, Open, Close } from '../../app/reducers/SidebarSlice';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Menu, MenuItem} from '@mui/material';
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import SettingsIcon from "@mui/icons-material/Settings";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { motion } from "framer-motion";
// import CloseIcon from "@mui/icons-material/Close";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import { removeUser } from '../../app/reducers/CurrentUserSlice'
// import { Reset } from '../../app/reducers/SidebarSlice'

// const drawerWidth = 240;

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })<AppBarProps>(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const TopNav = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const [showNavDropdown, setShowNavDropdown] = useState<boolean>(false);
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const profileopen = Boolean(anchorEl);
//   const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleMouseLeave = () => {
//     setAnchorEl(null);
//   };

//   const sidebaropen = useAppSelector(selectOpen)

//   console.log("drawer is ", sidebaropen)

//   //const [open, setOpen] = React.useState(false);

//   const handleDrawerOpen = () => {
//     dispatch(Open())
//     //setOpen(true);
//   };

//   // const handleDrawerClose = () => {
//   //   dispatch(Close())
//   // };

//   const logout = () => {
//     setAnchorEl(null);
//     dispatch(removeUser())
//     dispatch(Reset())
//     localStorage.clear();
//     navigate("/");
//   };

//   const ProfileDropdown = (
//     <>
//       <Menu
//         id="profilemenu"
//         anchorEl={anchorEl}
//         open={profileopen}
//         onClose={() => setAnchorEl(null)}
//         MenuListProps={{
//           "aria-labelledby": "headerprofile",
//           onMouseLeave: handleMouseLeave
//         }}
//       >
//         <MenuItem
//           sx={{ color: "#0A2540" }}
//           onClick={() => {
//             navigate("/profile");
//           }}
//         >
//           <ListItemIcon sx={{ color: "#0A2540" }}>
//             <AccountCircleIcon fontSize="small" />
//           </ListItemIcon>
//           <ListItemText
//             primaryTypographyProps={{ fontSize: "14px", marginLeft: "-7px" }}
//           >
//             Profile
//           </ListItemText>
//         </MenuItem>

//         <MenuItem
//           sx={{ color: "#0A2540" }}
//           onClick={() => {
//             navigate("/settings");
//           }}
//         >
//           <ListItemIcon sx={{ color: "#0A2540" }}>
//             <SettingsIcon fontSize="small" />
//           </ListItemIcon>
//           <ListItemText
//             primaryTypographyProps={{ fontSize: "14px", marginLeft: "-7px" }}
//           >
//             Settings
//           </ListItemText>
//         </MenuItem>

//         <MenuItem
//           sx={{ color: "#0A2540" }}
//           onClick={() => {
//             logout();
//           }}
//         >
//           <ListItemIcon sx={{ color: "#0A2540" }}>
//             <LogoutIcon fontSize="small" />
//           </ListItemIcon>
//           <ListItemText
//             primaryTypographyProps={{ fontSize: "14px", marginLeft: "-7px" }}
//           >
//             Logout
//           </ListItemText>
//         </MenuItem>
//       </Menu>
//     </>
//   );

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: "black", backgroundColor: "white"}} open={sidebaropen}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{
//               marginRight: 5,
//               ...(sidebaropen && { display: 'none' }),
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             ISDN Holdings
//           </Typography>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }

// export default TopNav;