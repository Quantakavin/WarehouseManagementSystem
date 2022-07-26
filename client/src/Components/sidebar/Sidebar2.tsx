import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CSSObject, styled, Theme, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectName, selectRole, selectPermissions } from "../../app/reducers/CurrentUserSlice";
import { Close, Open, selectOpen } from "../../app/reducers/SidebarSlice";
import defaultprofile from "../../assets/defaultprofile.png";
import SidebarLink from "./SidebarLink";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ArticleIcon from "@mui/icons-material/Article";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import { useState } from "react";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#0a2540"
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#0a2540",
  width: `calc(${theme.spacing(9)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isopen = useAppSelector(selectOpen);
  const username = useAppSelector(selectName);
  const userrole = useAppSelector(selectRole);
  // const userpermissions = useAppSelector(selectPermissions);

  // console.log("the permissions are: ", userpermissions)
  // console.log("has user group access:", userpermissions.some(p => p.FeatureName==="User Group Management" && p.FeatureRight ==="Full Access"))
  const toggleDrawer = () => {
    if (isopen) {
      dispatch(Close());
    } else {
      dispatch(Open());
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={isopen}>
        <Toolbar />
        <DrawerHeader sx={{ backgroundColor: "#0a2540"}} onClick={() => navigate("/profile")}>
          <Box className="flexcontainer sidebarprofile" sx={{ marginRight: "auto", marginTop: "15px", marginBottom: "5px" }}>
            <Box sx={{ flex: 1, margin: isopen? "0px": "10px -6px 10px 6px"}}>
              <img
                alt="ISDN Logo"
                src={defaultprofile}
                width="40"
                height="40"
                className="d-inline-block align-top"
                style={{ marginRight: 15}}
              />
            </Box>
            {isopen ? (
              <Box style={{ flex: 3, marginTop: 8, marginBottom: -8 }}>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    textTransform: "capitalize",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    width: "100px"
                  }}
                >
                  {username}
                </p>
                <p style={{ fontSize: 12, fontWeight: 400, marginTop: -15 }}>
                  {userrole}
                </p>
              </Box>
            ) : null}
          </Box>
          {/* <IconButton onClick={toggleDrawer}>
            {!isopen ? (
              <ChevronRightIcon sx={{ color: "#bfc3cb", marginLeft: "-15px", marginTop: "15px", marginbottom: "-5px" }} />
            ) : (
              <ChevronLeftIcon sx={{ color: "#bfc3cb"}} />
            )}
          </IconButton> */}
        </DrawerHeader>
        <hr className="solid" style={{ height: 2, color: "#A4AAB6" }} />
        <p
          style={{
            color: "#BFC3CB",
            fontSize: 12,
            fontWeight: 500,
            marginTop: 10,
            marginBottom: 10,
            marginLeft: "10%",
          }}
        >
          {isopen ? "MENU" : null}
        </p>

        {/* <Divider className="solid" sx={{ height: 2, color: "#A4AAB6" }} /> */}
        <List sx={{ flexDirection: "column", paddingRight: "10px", paddingLeft: "10px" }} className="flexcontainer">
          <SidebarLink url="/dashboard" name="Dashboard" icon={<DashboardIcon />} />
          <SidebarLink url="/products" name="Products" icon={<InventoryIcon />} />
          <SidebarLink
            url="/binlocations"
            name="Bin Locations"
            icon={<WarehouseIcon />}
          />
          <SidebarLink url="/users" name="Users" icon={<PersonIcon />} />
          <SidebarLink
            url="/usergroups"
            name="User Groups"
            icon={<PeopleAltIcon />}
          />
          <SidebarLink
            url="/notificationgroups"
            name="Notification Groups"
            icon={<NotificationAddIcon />}
          />
          <SidebarLink url="/Tloan" name="T-Loan" icon={<ArticleIcon />} />
          <SidebarLink url="/RMA" name="RMA" icon={<AssignmentReturnIcon />} />
        </List>
      </Drawer>
    </Box>
  );
}

export default Sidebar;


// export default function MiniDrawer() {

// return(
// <Drawer
// variant="permanent"
// sx={{
//   width: drawerWidth,
//   flexShrink: 0,
//   [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
// }}
// >
// <Toolbar />
// <Box sx={{ overflow: 'auto' }}>
//   <List>
//     {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//       <ListItem key={text} disablePadding>
//         <ListItemButton>
//           <ListItemIcon>
//             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//           </ListItemIcon>
//           <ListItemText primary={text} />
//         </ListItemButton>
//       </ListItem>
//     ))}
//   </List>
//   <Divider />
//   <List>
//     {['All mail', 'Trash', 'Spam'].map((text, index) => (
//       <ListItem key={text} disablePadding>
//         <ListItemButton>
//           <ListItemIcon>
//             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//           </ListItemIcon>
//           <ListItemText primary={text} />
//         </ListItemButton>
//       </ListItem>
//     ))}
//   </List>
// </Box>
// </Drawer>)
// }